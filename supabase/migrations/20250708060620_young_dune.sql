/*
  # Create crops and planting calendar tables

  1. New Tables
    - `crops` - Information about different crops/plants
    - `planting_calendar` - Planting schedules by region and month

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data

  3. Sample Data
    - Insert common Turkish crops
    - Add planting calendar for different regions
*/

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  scientific_name text,
  category text NOT NULL,
  planting_season text[] NOT NULL,
  growing_days integer NOT NULL,
  soil_type text[],
  water_needs text NOT NULL,
  sun_requirements text NOT NULL,
  companion_plants text[],
  avoid_plants text[],
  planting_depth_cm integer,
  spacing_cm integer,
  temperature_min integer,
  temperature_max integer,
  description text,
  tips text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create planting_calendar table
CREATE TABLE IF NOT EXISTS planting_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id uuid NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
  region text NOT NULL,
  planting_month integer NOT NULL,
  harvest_month integer NOT NULL,
  is_indoor boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE planting_calendar ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read crops" ON crops;
DROP POLICY IF EXISTS "Anyone can read planting calendar" ON planting_calendar;

-- Create policies for crops
CREATE POLICY "Anyone can read crops"
  ON crops
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for planting_calendar
CREATE POLICY "Anyone can read planting calendar"
  ON planting_calendar
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS crops_category_idx ON crops USING btree (category);
CREATE INDEX IF NOT EXISTS crops_planting_season_idx ON crops USING gin (planting_season);

CREATE INDEX IF NOT EXISTS planting_calendar_month_idx ON planting_calendar USING btree (planting_month);
CREATE INDEX IF NOT EXISTS planting_calendar_region_idx ON planting_calendar USING btree (region);

-- Insert sample crop data only if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM crops LIMIT 1) THEN
    INSERT INTO crops (name, scientific_name, category, planting_season, growing_days, soil_type, water_needs, sun_requirements, planting_depth_cm, spacing_cm, temperature_min, temperature_max, description, tips, image_url) VALUES
    ('Domates', 'Solanum lycopersicum', 'Sebze', ARRAY['spring', 'summer'], 80, ARRAY['humuslu', 'killi'], 'orta', 'güneş', 1, 50, 15, 30, 'En popüler sebzelerden biri. Vitamin C açısından zengin.', 'Düzenli sulama yapın, destek çubukları kullanın.', 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'),
    ('Salatalık', 'Cucumis sativus', 'Sebze', ARRAY['spring', 'summer'], 60, ARRAY['humuslu', 'kumlu'], 'çok', 'güneş', 2, 30, 18, 35, 'Serinletici ve sulu sebze. Salatalarda vazgeçilmez.', 'Bol su isteyen bir bitki. Tırmanma desteği verin.', 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg'),
    ('Biber', 'Capsicum annuum', 'Sebze', ARRAY['spring', 'summer'], 75, ARRAY['humuslu', 'killi'], 'orta', 'güneş', 1, 40, 20, 35, 'Acılı ve tatlı çeşitleri bulunan lezzetli sebze.', 'Sıcak iklim sever, düzenli gübreleme yapın.', 'https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg'),
    ('Patlıcan', 'Solanum melongena', 'Sebze', ARRAY['spring', 'summer'], 85, ARRAY['humuslu', 'killi'], 'orta', 'güneş', 1, 60, 22, 35, 'Mor renkli, lezzetli ve besleyici sebze.', 'Sıcak iklim sever, toprak nemini koruyun.', 'https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg'),
    ('Marul', 'Lactuca sativa', 'Sebze', ARRAY['spring', 'autumn'], 45, ARRAY['humuslu', 'kumlu'], 'orta', 'yarı gölge', 1, 25, 10, 25, 'Taze salataların vazgeçilmez yeşilliği.', 'Serin havayı sever, düzenli sulama yapın.', 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg'),
    ('Havuç', 'Daucus carota', 'Sebze', ARRAY['spring', 'autumn'], 70, ARRAY['kumlu', 'tınlı'], 'az', 'güneş', 2, 5, 15, 25, 'Vitamin A açısından zengin kök sebze.', 'Derin toprak ister, taş ve sert parçacıklardan temizleyin.', 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'),
    ('Soğan', 'Allium cepa', 'Sebze', ARRAY['autumn', 'winter'], 120, ARRAY['tınlı', 'killi'], 'az', 'güneş', 2, 10, 5, 25, 'Mutfağın vazgeçilmez aroması.', 'Uzun büyüme süresi, sabırlı olun.', 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg'),
    ('Fasulye', 'Phaseolus vulgaris', 'Baklagil', ARRAY['spring', 'summer'], 55, ARRAY['humuslu', 'tınlı'], 'orta', 'güneş', 3, 15, 18, 30, 'Protein açısından zengin baklagil.', 'Toprakta azot fiksasyonu yapar, gübreleme az gerekir.', 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg');
  END IF;
END $$;

-- Insert sample planting calendar data only if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM planting_calendar LIMIT 1) THEN
    INSERT INTO planting_calendar (crop_id, region, planting_month, harvest_month, is_indoor, notes) VALUES
    ((SELECT id FROM crops WHERE name = 'Domates'), 'Akdeniz', 3, 6, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Domates'), 'Akdeniz', 4, 7, false, 'Geç ekim'),
    ((SELECT id FROM crops WHERE name = 'Salatalık'), 'Akdeniz', 4, 6, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Salatalık'), 'Akdeniz', 5, 7, false, 'Geç ekim'),
    ((SELECT id FROM crops WHERE name = 'Biber'), 'Akdeniz', 3, 6, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Patlıcan'), 'Akdeniz', 4, 7, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Marul'), 'Akdeniz', 3, 5, false, 'İlkbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Marul'), 'Akdeniz', 9, 11, false, 'Sonbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Havuç'), 'Akdeniz', 3, 6, false, 'İlkbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Havuç'), 'Akdeniz', 9, 12, false, 'Sonbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Soğan'), 'Akdeniz', 10, 6, false, 'Kış ekimi'),
    ((SELECT id FROM crops WHERE name = 'Fasulye'), 'Akdeniz', 4, 6, false, 'Açık alan ekimi'),

    -- Marmara region
    ((SELECT id FROM crops WHERE name = 'Domates'), 'Marmara', 4, 7, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Salatalık'), 'Marmara', 5, 7, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Biber'), 'Marmara', 4, 7, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Marul'), 'Marmara', 4, 6, false, 'İlkbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Marul'), 'Marmara', 8, 10, false, 'Sonbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Havuç'), 'Marmara', 4, 7, false, 'İlkbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Soğan'), 'Marmara', 10, 7, false, 'Kış ekimi'),
    ((SELECT id FROM crops WHERE name = 'Fasulye'), 'Marmara', 5, 7, false, 'Açık alan ekimi'),

    -- Karadeniz region
    ((SELECT id FROM crops WHERE name = 'Domates'), 'Karadeniz', 5, 8, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Salatalık'), 'Karadeniz', 5, 7, false, 'Açık alan ekimi'),
    ((SELECT id FROM crops WHERE name = 'Marul'), 'Karadeniz', 4, 6, false, 'İlkbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Havuç'), 'Karadeniz', 4, 7, false, 'İlkbahar ekimi'),
    ((SELECT id FROM crops WHERE name = 'Fasulye'), 'Karadeniz', 5, 7, false, 'Açık alan ekimi');
  END IF;
END $$;