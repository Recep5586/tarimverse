/*
  # Ekim Takvimi & Planlama Sistemi

  1. Yeni Tablolar
    - `crops` - Ürün bilgileri ve özellikleri
    - `planting_calendar` - Bölgesel ekim takvimleri
    - `user_gardens` - Kullanıcı bahçe planları
    - `planting_schedules` - Kişisel ekim programları
    - `harvest_reminders` - Hasat hatırlatıcıları

  2. Güvenlik
    - RLS tüm tablolarda etkin
    - Kullanıcı bazlı erişim kontrolü

  3. Özellikler
    - Bölgesel iklim uyumlu ekim önerileri
    - Kişisel bahçe planlama
    - Otomatik hatırlatıcılar
*/

-- Crops table (ürün bilgileri)
CREATE TABLE IF NOT EXISTS crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  scientific_name text,
  category text NOT NULL, -- sebze, meyve, tahıl, etc.
  planting_season text[] NOT NULL, -- ['spring', 'summer', 'autumn', 'winter']
  growing_days integer NOT NULL, -- kaç günde hasat
  soil_type text[], -- toprak türleri
  water_needs text NOT NULL, -- az, orta, çok
  sun_requirements text NOT NULL, -- gölge, yarı-gölge, güneş
  companion_plants text[], -- arkadaş bitkiler
  avoid_plants text[], -- kaçınılacak bitkiler
  planting_depth_cm integer,
  spacing_cm integer,
  temperature_min integer, -- minimum sıcaklık
  temperature_max integer, -- maksimum sıcaklık
  description text,
  tips text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Planting calendar (bölgesel ekim takvimi)
CREATE TABLE IF NOT EXISTS planting_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id uuid REFERENCES crops(id) ON DELETE CASCADE NOT NULL,
  region text NOT NULL, -- Akdeniz, Karadeniz, İç Anadolu, etc.
  planting_month integer NOT NULL, -- 1-12
  harvest_month integer NOT NULL, -- 1-12
  is_indoor boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- User gardens (kullanıcı bahçeleri)
CREATE TABLE IF NOT EXISTS user_gardens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  location text NOT NULL,
  region text NOT NULL,
  size_sqm decimal(10,2), -- metrekare
  soil_type text,
  sun_exposure text, -- tam güneş, yarı gölge, gölge
  water_source text, -- musluk, kuyu, yağmur
  garden_type text NOT NULL, -- açık alan, sera, balkon, etc.
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Planting schedules (ekim programları)
CREATE TABLE IF NOT EXISTS planting_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  garden_id uuid REFERENCES user_gardens(id) ON DELETE CASCADE NOT NULL,
  crop_id uuid REFERENCES crops(id) ON DELETE CASCADE NOT NULL,
  planned_planting_date date NOT NULL,
  actual_planting_date date,
  expected_harvest_date date NOT NULL,
  actual_harvest_date date,
  quantity text, -- kaç adet/kg
  area_used_sqm decimal(10,2),
  status text DEFAULT 'planned' CHECK (status IN ('planned', 'planted', 'growing', 'harvested', 'failed')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Harvest reminders (hasat hatırlatıcıları)
CREATE TABLE IF NOT EXISTS harvest_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  schedule_id uuid REFERENCES planting_schedules(id) ON DELETE CASCADE NOT NULL,
  reminder_type text NOT NULL CHECK (reminder_type IN ('planting', 'watering', 'fertilizing', 'harvest', 'pruning')),
  reminder_date date NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  is_sent boolean DEFAULT false,
  is_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE planting_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_gardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE planting_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE harvest_reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Crops policies (herkes okuyabilir)
CREATE POLICY "Anyone can read crops"
  ON crops
  FOR SELECT
  TO authenticated
  USING (true);

-- Planting calendar policies (herkes okuyabilir)
CREATE POLICY "Anyone can read planting calendar"
  ON planting_calendar
  FOR SELECT
  TO authenticated
  USING (true);

-- User gardens policies
CREATE POLICY "Users can read own gardens"
  ON user_gardens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own gardens"
  ON user_gardens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gardens"
  ON user_gardens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gardens"
  ON user_gardens
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Planting schedules policies
CREATE POLICY "Users can read own schedules"
  ON planting_schedules
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own schedules"
  ON planting_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schedules"
  ON planting_schedules
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own schedules"
  ON planting_schedules
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Harvest reminders policies
CREATE POLICY "Users can read own reminders"
  ON harvest_reminders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reminders"
  ON harvest_reminders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reminders"
  ON harvest_reminders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders"
  ON harvest_reminders
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_user_gardens_updated_at
  BEFORE UPDATE ON user_gardens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_planting_schedules_updated_at
  BEFORE UPDATE ON planting_schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX IF NOT EXISTS crops_category_idx ON crops(category);
CREATE INDEX IF NOT EXISTS crops_planting_season_idx ON crops USING GIN(planting_season);
CREATE INDEX IF NOT EXISTS planting_calendar_region_idx ON planting_calendar(region);
CREATE INDEX IF NOT EXISTS planting_calendar_month_idx ON planting_calendar(planting_month);
CREATE INDEX IF NOT EXISTS user_gardens_user_id_idx ON user_gardens(user_id);
CREATE INDEX IF NOT EXISTS planting_schedules_user_id_idx ON planting_schedules(user_id);
CREATE INDEX IF NOT EXISTS planting_schedules_status_idx ON planting_schedules(status);
CREATE INDEX IF NOT EXISTS harvest_reminders_user_id_idx ON harvest_reminders(user_id);
CREATE INDEX IF NOT EXISTS harvest_reminders_date_idx ON harvest_reminders(reminder_date);

-- Sample data
INSERT INTO crops (name, scientific_name, category, planting_season, growing_days, soil_type, water_needs, sun_requirements, planting_depth_cm, spacing_cm, temperature_min, temperature_max, description, tips, image_url) VALUES
('Domates', 'Solanum lycopersicum', 'Sebze', ARRAY['spring', 'summer'], 80, ARRAY['humuslu', 'killi'], 'orta', 'güneş', 1, 50, 15, 30, 'En popüler sebzelerden biri. Vitamin C açısından zengin.', 'Düzenli sulama yapın, destek çubukları kullanın.', 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'),
('Salatalık', 'Cucumis sativus', 'Sebze', ARRAY['spring', 'summer'], 60, ARRAY['humuslu', 'kumlu'], 'çok', 'güneş', 2, 30, 18, 35, 'Serinletici ve sulu sebze. Salatalarda vazgeçilmez.', 'Bol su isteyen bir bitki. Tırmanma desteği verin.', 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg'),
('Marul', 'Lactuca sativa', 'Sebze', ARRAY['spring', 'autumn'], 45, ARRAY['humuslu'], 'orta', 'yarı-gölge', 1, 25, 10, 25, 'Vitamin ve mineral açısından zengin yapraklı sebze.', 'Serin havayı sever. Sık sık hasat edebilirsiniz.', 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg'),
('Biber', 'Capsicum annuum', 'Sebze', ARRAY['spring', 'summer'], 90, ARRAY['humuslu'], 'orta', 'güneş', 1, 40, 20, 35, 'Acılı ve tatlı çeşitleri bulunan lezzetli sebze.', 'Sıcak iklimi sever. Düzenli gübreleme yapın.', 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'),
('Patlıcan', 'Solanum melongena', 'Sebze', ARRAY['spring', 'summer'], 85, ARRAY['humuslu'], 'orta', 'güneş', 1, 60, 18, 32, 'Mor renkli, lezzetli ve besleyici sebze.', 'Sıcak iklim sever. Toprak nemini koruyun.', 'https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg'),
('Havuç', 'Daucus carota', 'Sebze', ARRAY['spring', 'autumn'], 75, ARRAY['kumlu', 'humuslu'], 'az', 'güneş', 2, 5, 5, 25, 'Beta karoten açısından zengin kök sebze.', 'Derin ve gevşek toprak ister. Taş parçalarını temizleyin.', 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'),
('Soğan', 'Allium cepa', 'Sebze', ARRAY['autumn', 'winter'], 120, ARRAY['humuslu', 'killi'], 'az', 'güneş', 2, 10, 0, 30, 'Mutfakta vazgeçilmez aromatic sebze.', 'Uzun büyüme süresi. Sabırlı olun ve düzenli bakım yapın.', 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg'),
('Fasulye', 'Phaseolus vulgaris', 'Baklagil', ARRAY['spring', 'summer'], 65, ARRAY['humuslu'], 'orta', 'güneş', 3, 15, 15, 30, 'Protein açısından zengin baklagil.', 'Toprakta azot fiksasyonu yapar. Destek çubukları kullanın.', 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg');

-- Sample planting calendar data
INSERT INTO planting_calendar (crop_id, region, planting_month, harvest_month, notes) VALUES
((SELECT id FROM crops WHERE name = 'Domates'), 'Akdeniz', 3, 6, 'Sera koşullarında daha erken ekilebilir'),
((SELECT id FROM crops WHERE name = 'Domates'), 'Akdeniz', 4, 7, 'Açık alan ekimi'),
((SELECT id FROM crops WHERE name = 'Domates'), 'Karadeniz', 4, 7, 'Nem oranı yüksek bölgeler için'),
((SELECT id FROM crops WHERE name = 'Domates'), 'İç Anadolu', 5, 8, 'Geç don riski nedeniyle geç ekim'),
((SELECT id FROM crops WHERE name = 'Salatalık'), 'Akdeniz', 3, 5, 'Sera ekimi'),
((SELECT id FROM crops WHERE name = 'Salatalık'), 'Akdeniz', 4, 6, 'Açık alan ekimi'),
((SELECT id FROM crops WHERE name = 'Marul'), 'Akdeniz', 3, 4, 'İlkbahar ekimi'),
((SELECT id FROM crops WHERE name = 'Marul'), 'Akdeniz', 9, 11, 'Sonbahar ekimi'),
((SELECT id FROM crops WHERE name = 'Biber'), 'Akdeniz', 3, 7, 'Uzun hasat dönemi'),
((SELECT id FROM crops WHERE name = 'Patlıcan'), 'Akdeniz', 4, 8, 'Sıcak mevsim sebzesi'),
((SELECT id FROM crops WHERE name = 'Havuç'), 'Akdeniz', 3, 6, 'İlkbahar ekimi'),
((SELECT id FROM crops WHERE name = 'Havuç'), 'Akdeniz', 8, 11, 'Sonbahar ekimi'),
((SELECT id FROM crops WHERE name = 'Soğan'), 'Akdeniz', 10, 6, 'Kış ekimi, yaz hasadı'),
((SELECT id FROM crops WHERE name = 'Fasulye'), 'Akdeniz', 4, 6, 'Sıcak mevsim baklagili');