/*
  # Otomasyon ve Yenilikçi Özellikler

  1. Yeni Tablolar
    - `automation_rules` - Otomasyon kuralları
    - `iot_devices` - IoT cihazları
    - `sensor_data` - Sensör verileri
    - `ai_recommendations` - AI önerileri
    - `disease_detection` - Hastalık tespiti
    - `yield_predictions` - Verim tahminleri
    - `smart_irrigation` - Akıllı sulama
    - `pest_alerts` - Zararlı uyarıları
    - `market_predictions` - Pazar tahminleri
    - `carbon_tracking` - Karbon ayak izi
    - `community_challenges` - Topluluk meydan okumaları
    - `achievement_system` - Başarı sistemi
    - `virtual_consultations` - Sanal danışmanlık
    - `blockchain_certificates` - Blockchain sertifikaları

  2. Güvenlik
    - RLS politikaları
    - Kullanıcı bazlı erişim kontrolü

  3. Performans
    - İndeksler ve optimizasyonlar
*/

-- Automation Rules Table
CREATE TABLE IF NOT EXISTS automation_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  trigger_type text NOT NULL CHECK (trigger_type IN ('weather', 'sensor', 'time', 'growth_stage', 'market_price')),
  trigger_conditions jsonb NOT NULL DEFAULT '{}',
  action_type text NOT NULL CHECK (action_type IN ('irrigation', 'notification', 'fertilization', 'pest_control', 'harvest_alert')),
  action_parameters jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  last_triggered timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- IoT Devices Table
CREATE TABLE IF NOT EXISTS iot_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  garden_id uuid REFERENCES user_gardens(id) ON DELETE CASCADE,
  device_name text NOT NULL,
  device_type text NOT NULL CHECK (device_type IN ('soil_sensor', 'weather_station', 'camera', 'irrigation_controller', 'ph_sensor', 'moisture_sensor')),
  device_id text UNIQUE NOT NULL,
  location_coordinates point,
  battery_level integer CHECK (battery_level >= 0 AND battery_level <= 100),
  signal_strength integer CHECK (signal_strength >= 0 AND signal_strength <= 100),
  firmware_version text,
  last_seen timestamptz,
  is_online boolean DEFAULT false,
  configuration jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sensor Data Table
CREATE TABLE IF NOT EXISTS sensor_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id uuid NOT NULL REFERENCES iot_devices(id) ON DELETE CASCADE,
  sensor_type text NOT NULL,
  value numeric NOT NULL,
  unit text NOT NULL,
  quality_score integer CHECK (quality_score >= 0 AND quality_score <= 100),
  metadata jsonb DEFAULT '{}',
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- AI Recommendations Table
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  garden_id uuid REFERENCES user_gardens(id) ON DELETE CASCADE,
  recommendation_type text NOT NULL CHECK (recommendation_type IN ('planting', 'watering', 'fertilizing', 'pest_control', 'harvesting', 'soil_improvement')),
  title text NOT NULL,
  description text NOT NULL,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 1),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  data_sources jsonb DEFAULT '{}',
  action_steps jsonb DEFAULT '[]',
  expected_outcome text,
  is_implemented boolean DEFAULT false,
  feedback_rating integer CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Disease Detection Table
CREATE TABLE IF NOT EXISTS disease_detection (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  garden_id uuid REFERENCES user_gardens(id) ON DELETE CASCADE,
  crop_id uuid REFERENCES crops(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  detected_diseases jsonb DEFAULT '[]',
  confidence_scores jsonb DEFAULT '{}',
  severity_level text CHECK (severity_level IN ('low', 'medium', 'high', 'critical')),
  treatment_recommendations jsonb DEFAULT '[]',
  prevention_tips jsonb DEFAULT '[]',
  is_verified boolean DEFAULT false,
  verified_by uuid REFERENCES users(id),
  detection_method text DEFAULT 'ai' CHECK (detection_method IN ('ai', 'expert', 'community')),
  created_at timestamptz DEFAULT now()
);

-- Yield Predictions Table
CREATE TABLE IF NOT EXISTS yield_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  schedule_id uuid NOT NULL REFERENCES planting_schedules(id) ON DELETE CASCADE,
  predicted_yield_kg numeric NOT NULL,
  predicted_quality_grade text CHECK (predicted_quality_grade IN ('A', 'B', 'C', 'D')),
  confidence_interval jsonb DEFAULT '{}',
  factors_considered jsonb DEFAULT '[]',
  prediction_model text NOT NULL,
  model_version text,
  actual_yield_kg numeric,
  actual_quality_grade text,
  accuracy_score numeric,
  created_at timestamptz DEFAULT now(),
  harvest_date date
);

-- Smart Irrigation Table
CREATE TABLE IF NOT EXISTS smart_irrigation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  garden_id uuid NOT NULL REFERENCES user_gardens(id) ON DELETE CASCADE,
  device_id uuid REFERENCES iot_devices(id),
  zone_name text NOT NULL,
  zone_coordinates polygon,
  crop_types text[] DEFAULT '{}',
  soil_type text,
  irrigation_method text CHECK (irrigation_method IN ('drip', 'sprinkler', 'flood', 'micro_spray')),
  schedule_type text DEFAULT 'smart' CHECK (schedule_type IN ('manual', 'timer', 'smart', 'sensor_based')),
  watering_schedule jsonb DEFAULT '{}',
  water_flow_rate numeric,
  total_water_used numeric DEFAULT 0,
  efficiency_score numeric,
  last_irrigation timestamptz,
  next_irrigation timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pest Alerts Table
CREATE TABLE IF NOT EXISTS pest_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  garden_id uuid REFERENCES user_gardens(id) ON DELETE CASCADE,
  pest_name text NOT NULL,
  pest_type text CHECK (pest_type IN ('insect', 'disease', 'weed', 'rodent', 'bird')),
  severity_level text CHECK (severity_level IN ('low', 'medium', 'high', 'critical')),
  affected_area numeric,
  detection_method text CHECK (detection_method IN ('visual', 'trap', 'sensor', 'ai_camera')),
  image_urls text[] DEFAULT '{}',
  symptoms_description text,
  treatment_applied text,
  treatment_effectiveness integer CHECK (treatment_effectiveness >= 0 AND treatment_effectiveness <= 100),
  weather_conditions jsonb DEFAULT '{}',
  is_resolved boolean DEFAULT false,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Market Predictions Table
CREATE TABLE IF NOT EXISTS market_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name text NOT NULL,
  region text NOT NULL,
  predicted_price numeric NOT NULL,
  current_price numeric,
  price_trend text CHECK (price_trend IN ('rising', 'falling', 'stable')),
  confidence_level numeric CHECK (confidence_level >= 0 AND confidence_level <= 1),
  prediction_period text CHECK (prediction_period IN ('1_week', '1_month', '3_months', '6_months')),
  factors jsonb DEFAULT '[]',
  data_sources jsonb DEFAULT '[]',
  demand_forecast text,
  supply_forecast text,
  seasonal_factors jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  valid_until timestamptz NOT NULL
);

-- Carbon Tracking Table
CREATE TABLE IF NOT EXISTS carbon_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  garden_id uuid REFERENCES user_gardens(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('planting', 'fertilizing', 'irrigation', 'harvesting', 'transportation', 'composting')),
  carbon_impact numeric NOT NULL, -- positive for sequestration, negative for emissions
  calculation_method text NOT NULL,
  activity_details jsonb DEFAULT '{}',
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'disputed')),
  verified_by uuid REFERENCES users(id),
  certificates jsonb DEFAULT '[]',
  activity_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Community Challenges Table
CREATE TABLE IF NOT EXISTS community_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  challenge_type text CHECK (challenge_type IN ('yield', 'sustainability', 'innovation', 'education', 'conservation')),
  difficulty_level text CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  max_participants integer,
  current_participants integer DEFAULT 0,
  prize_description text,
  rules jsonb DEFAULT '[]',
  judging_criteria jsonb DEFAULT '[]',
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
  winner_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Challenge Participants Table
CREATE TABLE IF NOT EXISTS challenge_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid NOT NULL REFERENCES community_challenges(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submission_data jsonb DEFAULT '{}',
  submission_images text[] DEFAULT '{}',
  score numeric,
  rank integer,
  is_winner boolean DEFAULT false,
  joined_at timestamptz DEFAULT now(),
  submitted_at timestamptz,
  UNIQUE(challenge_id, user_id)
);

-- Achievement System Table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  category text CHECK (category IN ('planting', 'harvesting', 'sustainability', 'community', 'innovation', 'learning')),
  difficulty text CHECK (difficulty IN ('bronze', 'silver', 'gold', 'platinum')),
  icon_url text,
  criteria jsonb NOT NULL DEFAULT '{}',
  points_reward integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  progress_data jsonb DEFAULT '{}',
  UNIQUE(user_id, achievement_id)
);

-- Virtual Consultations Table
CREATE TABLE IF NOT EXISTS virtual_consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expert_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  consultation_type text CHECK (consultation_type IN ('general', 'disease_diagnosis', 'soil_analysis', 'pest_control', 'crop_planning')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 30,
  meeting_url text,
  consultation_notes text,
  recommendations jsonb DEFAULT '[]',
  follow_up_required boolean DEFAULT false,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback text,
  price numeric,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at timestamptz DEFAULT now()
);

-- Blockchain Certificates Table
CREATE TABLE IF NOT EXISTS blockchain_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  certificate_type text CHECK (certificate_type IN ('organic', 'sustainable', 'carbon_neutral', 'quality_grade', 'yield_record')),
  certificate_data jsonb NOT NULL DEFAULT '{}',
  blockchain_hash text UNIQUE NOT NULL,
  transaction_id text,
  verification_url text,
  issuer_name text NOT NULL,
  issued_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  is_verified boolean DEFAULT false,
  verification_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Weather Alerts Table
CREATE TABLE IF NOT EXISTS weather_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region text NOT NULL,
  alert_type text CHECK (alert_type IN ('frost', 'drought', 'flood', 'storm', 'hail', 'extreme_heat')),
  severity text CHECK (severity IN ('low', 'medium', 'high', 'extreme')),
  title text NOT NULL,
  description text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  affected_crops text[] DEFAULT '{}',
  recommended_actions jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- User Weather Alert Subscriptions
CREATE TABLE IF NOT EXISTS weather_alert_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  region text NOT NULL,
  alert_types text[] DEFAULT '{}',
  notification_methods text[] DEFAULT '{"app"}' CHECK (notification_methods <@ ARRAY['app', 'email', 'sms']),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, region)
);

-- Enable RLS on all new tables
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE iot_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_detection ENABLE ROW LEVEL SECURITY;
ALTER TABLE yield_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_irrigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE pest_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_alert_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Automation Rules
CREATE POLICY "Users can manage own automation rules"
  ON automation_rules
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- IoT Devices
CREATE POLICY "Users can manage own IoT devices"
  ON iot_devices
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Sensor Data
CREATE POLICY "Users can read own sensor data"
  ON sensor_data
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM iot_devices 
    WHERE iot_devices.id = sensor_data.device_id 
    AND iot_devices.user_id = auth.uid()
  ));

CREATE POLICY "System can insert sensor data"
  ON sensor_data
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- AI Recommendations
CREATE POLICY "Users can read own AI recommendations"
  ON ai_recommendations
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create AI recommendations"
  ON ai_recommendations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own AI recommendations"
  ON ai_recommendations
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Disease Detection
CREATE POLICY "Users can manage own disease detection"
  ON disease_detection
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Yield Predictions
CREATE POLICY "Users can read own yield predictions"
  ON yield_predictions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create yield predictions"
  ON yield_predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Smart Irrigation
CREATE POLICY "Users can manage own irrigation systems"
  ON smart_irrigation
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Pest Alerts
CREATE POLICY "Users can manage own pest alerts"
  ON pest_alerts
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Market Predictions
CREATE POLICY "Anyone can read market predictions"
  ON market_predictions
  FOR SELECT
  TO authenticated
  USING (true);

-- Carbon Tracking
CREATE POLICY "Users can manage own carbon tracking"
  ON carbon_tracking
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Community Challenges
CREATE POLICY "Anyone can read active challenges"
  ON community_challenges
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create challenges"
  ON community_challenges
  FOR INSERT
  TO authenticated
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Creators can update own challenges"
  ON community_challenges
  FOR UPDATE
  TO authenticated
  USING (creator_id = auth.uid())
  WITH CHECK (creator_id = auth.uid());

-- Challenge Participants
CREATE POLICY "Users can manage own participation"
  ON challenge_participants
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Achievements
CREATE POLICY "Anyone can read achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (true);

-- User Achievements
CREATE POLICY "Users can read own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can award achievements"
  ON user_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Virtual Consultations
CREATE POLICY "Users can manage own consultations"
  ON virtual_consultations
  FOR ALL
  TO authenticated
  USING (client_id = auth.uid() OR expert_id = auth.uid())
  WITH CHECK (client_id = auth.uid() OR expert_id = auth.uid());

-- Blockchain Certificates
CREATE POLICY "Users can read own certificates"
  ON blockchain_certificates
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can issue certificates"
  ON blockchain_certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Weather Alerts
CREATE POLICY "Anyone can read weather alerts"
  ON weather_alerts
  FOR SELECT
  TO authenticated
  USING (true);

-- Weather Alert Subscriptions
CREATE POLICY "Users can manage own subscriptions"
  ON weather_alert_subscriptions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS automation_rules_user_id_idx ON automation_rules(user_id);
CREATE INDEX IF NOT EXISTS automation_rules_trigger_type_idx ON automation_rules(trigger_type);
CREATE INDEX IF NOT EXISTS automation_rules_is_active_idx ON automation_rules(is_active);

CREATE INDEX IF NOT EXISTS iot_devices_user_id_idx ON iot_devices(user_id);
CREATE INDEX IF NOT EXISTS iot_devices_device_type_idx ON iot_devices(device_type);
CREATE INDEX IF NOT EXISTS iot_devices_is_online_idx ON iot_devices(is_online);

CREATE INDEX IF NOT EXISTS sensor_data_device_id_idx ON sensor_data(device_id);
CREATE INDEX IF NOT EXISTS sensor_data_recorded_at_idx ON sensor_data(recorded_at DESC);
CREATE INDEX IF NOT EXISTS sensor_data_sensor_type_idx ON sensor_data(sensor_type);

CREATE INDEX IF NOT EXISTS ai_recommendations_user_id_idx ON ai_recommendations(user_id);
CREATE INDEX IF NOT EXISTS ai_recommendations_type_idx ON ai_recommendations(recommendation_type);
CREATE INDEX IF NOT EXISTS ai_recommendations_priority_idx ON ai_recommendations(priority);

CREATE INDEX IF NOT EXISTS disease_detection_user_id_idx ON disease_detection(user_id);
CREATE INDEX IF NOT EXISTS disease_detection_severity_idx ON disease_detection(severity_level);

CREATE INDEX IF NOT EXISTS yield_predictions_user_id_idx ON yield_predictions(user_id);
CREATE INDEX IF NOT EXISTS yield_predictions_harvest_date_idx ON yield_predictions(harvest_date);

CREATE INDEX IF NOT EXISTS smart_irrigation_user_id_idx ON smart_irrigation(user_id);
CREATE INDEX IF NOT EXISTS smart_irrigation_next_irrigation_idx ON smart_irrigation(next_irrigation);

CREATE INDEX IF NOT EXISTS pest_alerts_user_id_idx ON pest_alerts(user_id);
CREATE INDEX IF NOT EXISTS pest_alerts_severity_idx ON pest_alerts(severity_level);
CREATE INDEX IF NOT EXISTS pest_alerts_is_resolved_idx ON pest_alerts(is_resolved);

CREATE INDEX IF NOT EXISTS market_predictions_crop_region_idx ON market_predictions(crop_name, region);
CREATE INDEX IF NOT EXISTS market_predictions_valid_until_idx ON market_predictions(valid_until);

CREATE INDEX IF NOT EXISTS carbon_tracking_user_id_idx ON carbon_tracking(user_id);
CREATE INDEX IF NOT EXISTS carbon_tracking_activity_date_idx ON carbon_tracking(activity_date);

CREATE INDEX IF NOT EXISTS community_challenges_status_idx ON community_challenges(status);
CREATE INDEX IF NOT EXISTS community_challenges_start_date_idx ON community_challenges(start_date);

CREATE INDEX IF NOT EXISTS user_achievements_user_id_idx ON user_achievements(user_id);

CREATE INDEX IF NOT EXISTS virtual_consultations_client_id_idx ON virtual_consultations(client_id);
CREATE INDEX IF NOT EXISTS virtual_consultations_expert_id_idx ON virtual_consultations(expert_id);
CREATE INDEX IF NOT EXISTS virtual_consultations_scheduled_at_idx ON virtual_consultations(scheduled_at);

CREATE INDEX IF NOT EXISTS blockchain_certificates_user_id_idx ON blockchain_certificates(user_id);
CREATE INDEX IF NOT EXISTS blockchain_certificates_hash_idx ON blockchain_certificates(blockchain_hash);

CREATE INDEX IF NOT EXISTS weather_alerts_region_idx ON weather_alerts(region);
CREATE INDEX IF NOT EXISTS weather_alerts_is_active_idx ON weather_alerts(is_active);

-- Insert sample achievements
INSERT INTO achievements (name, description, category, difficulty, points_reward, criteria) VALUES
('İlk Ekim', 'İlk bitkini ek', 'planting', 'bronze', 10, '{"plants_planted": 1}'),
('Yeşil Başparmak', '10 farklı bitki ek', 'planting', 'silver', 50, '{"unique_plants": 10}'),
('Hasat Ustası', 'İlk hasadını yap', 'harvesting', 'bronze', 15, '{"harvests_completed": 1}'),
('Verimli Çiftçi', '100 kg ürün hasat et', 'harvesting', 'gold', 100, '{"total_yield_kg": 100}'),
('Çevre Dostu', 'Karbon ayak izini %50 azalt', 'sustainability', 'gold', 150, '{"carbon_reduction_percent": 50}'),
('Topluluk Lideri', '5 kişiye yardım et', 'community', 'silver', 75, '{"people_helped": 5}'),
('Teknoloji Meraklısı', 'İlk IoT cihazını bağla', 'innovation', 'bronze', 25, '{"iot_devices_connected": 1}'),
('Bilgi Avcısı', '50 makale oku', 'learning', 'silver', 60, '{"articles_read": 50}');

-- Insert sample market predictions
INSERT INTO market_predictions (crop_name, region, predicted_price, current_price, price_trend, confidence_level, prediction_period, factors, valid_until) VALUES
('Domates', 'Akdeniz', 12.50, 10.00, 'rising', 0.85, '1_month', '["seasonal_demand", "weather_conditions"]', NOW() + INTERVAL '1 month'),
('Salatalık', 'Marmara', 8.75, 9.20, 'falling', 0.78, '1_week', '["oversupply", "import_competition"]', NOW() + INTERVAL '1 week'),
('Biber', 'Ege', 15.30, 14.50, 'stable', 0.92, '3_months', '["stable_demand", "normal_weather"]', NOW() + INTERVAL '3 months');

-- Insert sample weather alerts
INSERT INTO weather_alerts (region, alert_type, severity, title, description, start_time, end_time, affected_crops, recommended_actions) VALUES
('Akdeniz', 'extreme_heat', 'high', 'Aşırı Sıcaklık Uyarısı', 'Önümüzdeki 3 gün boyunca sıcaklıklar 40°C üzerine çıkacak', NOW(), NOW() + INTERVAL '3 days', ARRAY['domates', 'biber'], '[{"action": "Gölgeleme yapın", "priority": "high"}, {"action": "Su miktarını artırın", "priority": "medium"}]'),
('Karadeniz', 'frost', 'medium', 'Don Uyarısı', 'Gece saatlerinde don riski var', NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days', ARRAY['marul', 'havuç'], '[{"action": "Bitkileri örtün", "priority": "high"}, {"action": "Sulama yapmayın", "priority": "medium"}]');

-- Create functions for automation triggers
CREATE OR REPLACE FUNCTION trigger_automation_rules()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- This function would be called by a cron job or external service
  -- to check and trigger automation rules based on conditions
  RAISE NOTICE 'Automation rules triggered at %', NOW();
END;
$$;

-- Create function to calculate carbon footprint
CREATE OR REPLACE FUNCTION calculate_carbon_footprint(user_uuid uuid, start_date date, end_date date)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
  total_impact numeric := 0;
BEGIN
  SELECT COALESCE(SUM(carbon_impact), 0)
  INTO total_impact
  FROM carbon_tracking
  WHERE user_id = user_uuid
    AND activity_date BETWEEN start_date AND end_date;
  
  RETURN total_impact;
END;
$$;

-- Create function to check achievements
CREATE OR REPLACE FUNCTION check_user_achievements(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  achievement_record RECORD;
  user_stats RECORD;
BEGIN
  -- Get user statistics
  SELECT 
    COUNT(DISTINCT ps.id) as plants_planted,
    COUNT(DISTINCT CASE WHEN ps.status = 'harvested' THEN ps.id END) as harvests_completed,
    COALESCE(SUM(CASE WHEN ps.status = 'harvested' AND yp.actual_yield_kg IS NOT NULL THEN yp.actual_yield_kg ELSE 0 END), 0) as total_yield_kg,
    COUNT(DISTINCT iot.id) as iot_devices_connected
  INTO user_stats
  FROM planting_schedules ps
  LEFT JOIN yield_predictions yp ON ps.id = yp.schedule_id
  LEFT JOIN iot_devices iot ON iot.user_id = user_uuid
  WHERE ps.user_id = user_uuid;

  -- Check each achievement
  FOR achievement_record IN 
    SELECT * FROM achievements WHERE is_active = true
  LOOP
    -- Check if user already has this achievement
    IF NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = user_uuid AND achievement_id = achievement_record.id
    ) THEN
      -- Check achievement criteria (simplified logic)
      IF (achievement_record.criteria->>'plants_planted')::int <= user_stats.plants_planted
         OR (achievement_record.criteria->>'harvests_completed')::int <= user_stats.harvests_completed
         OR (achievement_record.criteria->>'total_yield_kg')::numeric <= user_stats.total_yield_kg
         OR (achievement_record.criteria->>'iot_devices_connected')::int <= user_stats.iot_devices_connected
      THEN
        -- Award achievement
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (user_uuid, achievement_record.id);
      END IF;
    END IF;
  END LOOP;
END;
$$;

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_automation_rules_updated_at BEFORE UPDATE ON automation_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_iot_devices_updated_at BEFORE UPDATE ON iot_devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smart_irrigation_updated_at BEFORE UPDATE ON smart_irrigation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();