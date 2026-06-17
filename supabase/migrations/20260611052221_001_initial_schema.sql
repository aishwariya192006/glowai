-- Salons table
CREATE TABLE salons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT DEFAULT 'Chennai',
  area TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  price_range TEXT DEFAULT 'moderate',
  is_women_owned BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  trust_score INTEGER DEFAULT 50,
  features TEXT[] DEFAULT '{}',
  opening_time TEXT DEFAULT '09:00',
  closing_time TEXT DEFAULT '21:00',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  is_student_deal BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer',
  glow_score INTEGER DEFAULT 0,
  hair_score INTEGER DEFAULT 0,
  skin_score INTEGER DEFAULT 0,
  confidence_score INTEGER DEFAULT 0,
  beauty_concerns TEXT[] DEFAULT '{}',
  skin_type TEXT,
  hair_type TEXT,
  preferred_styles TEXT[] DEFAULT '{}',
  is_student BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  total_price DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  ai_summary TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Beauty routines table
CREATE TABLE beauty_routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  occasion TEXT,
  steps JSONB DEFAULT '[]',
  total_duration INTEGER,
  total_budget DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved salons table
CREATE TABLE saved_salons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, salon_id)
);

-- Enable RLS
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE beauty_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_salons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for salons (public read)
CREATE POLICY "salons_select" ON salons FOR SELECT TO public USING (true);
CREATE POLICY "salons_insert" ON salons FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "salons_update" ON salons FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "salons_delete" ON salons FOR DELETE TO authenticated USING (true);

-- RLS Policies for services (public read)
CREATE POLICY "services_select" ON services FOR SELECT TO public USING (true);
CREATE POLICY "services_insert" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "services_update" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "services_delete" ON services FOR DELETE TO authenticated USING (true);

-- RLS Policies for users
CREATE POLICY "users_select" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "users_insert" ON users FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "users_update" ON users FOR UPDATE TO authenticated USING (auth.uid()::text = id::text OR true) WITH CHECK (true);

-- RLS Policies for bookings
CREATE POLICY "bookings_select" ON bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "bookings_insert" ON bookings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "bookings_update" ON bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "bookings_delete" ON bookings FOR DELETE TO authenticated USING (true);

-- RLS Policies for reviews
CREATE POLICY "reviews_select" ON reviews FOR SELECT TO public USING (true);
CREATE POLICY "reviews_insert" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "reviews_update" ON reviews FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "reviews_delete" ON reviews FOR DELETE TO authenticated USING (true);

-- RLS Policies for categories (public read)
CREATE POLICY "categories_select" ON categories FOR SELECT TO public USING (true);

-- RLS Policies for beauty_routines
CREATE POLICY "routines_select" ON beauty_routines FOR SELECT TO authenticated USING (true);
CREATE POLICY "routines_insert" ON beauty_routines FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "routines_update" ON beauty_routines FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "routines_delete" ON beauty_routines FOR DELETE TO authenticated USING (true);

-- RLS Policies for saved_salons
CREATE POLICY "saved_select" ON saved_salons FOR SELECT TO authenticated USING (true);
CREATE POLICY "saved_insert" ON saved_salons FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "saved_delete" ON saved_salons FOR DELETE TO authenticated USING (true);