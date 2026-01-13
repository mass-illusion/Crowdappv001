-- Supabase SQL Schema for CrowdApp Maps Feature

-- Enable Row Level Security
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorite places table
CREATE TABLE favorite_places (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  place_id TEXT NOT NULL, -- Mapbox place ID
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('restaurant', 'bar', 'coffee', 'boba', 'ice_cream', 'other')),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, place_id) -- Prevent duplicate favorites
);

-- Place matches table (for finding users with similar favorites)
CREATE TABLE place_matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user1_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  place_id TEXT NOT NULL,
  place_name TEXT NOT NULL,
  match_score INTEGER DEFAULT 1, -- How many shared places
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user1_id, user2_id, place_id)
);

-- User connections/following table
CREATE TABLE user_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Indexes for performance
CREATE INDEX idx_favorite_places_user_id ON favorite_places(user_id);
CREATE INDEX idx_favorite_places_place_id ON favorite_places(place_id);
CREATE INDEX idx_favorite_places_category ON favorite_places(category);
CREATE INDEX idx_favorite_places_location ON favorite_places(latitude, longitude);
CREATE INDEX idx_place_matches_users ON place_matches(user1_id, user2_id);
CREATE INDEX idx_user_connections_follower ON user_connections(follower_id);

-- Row Level Security Policies

-- Profiles: Users can view all profiles but only update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Favorite Places: Users can only see and modify their own favorites
ALTER TABLE favorite_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorite places" ON favorite_places
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorite places" ON favorite_places
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorite places" ON favorite_places
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorite places" ON favorite_places
  FOR DELETE USING (auth.uid() = user_id);

-- Place Matches: Users can view matches involving them
ALTER TABLE place_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their place matches" ON place_matches
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- User Connections: Users can manage their own connections
ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view connections involving them" ON user_connections
  FOR SELECT USING (auth.uid() = follower_id OR auth.uid() = following_id);

CREATE POLICY "Users can create their own connections" ON user_connections
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own connections" ON user_connections
  FOR DELETE USING (auth.uid() = follower_id);

-- Functions for automated match finding
CREATE OR REPLACE FUNCTION create_place_matches()
RETURNS TRIGGER AS $$
BEGIN
  -- Create matches with other users who have the same place
  INSERT INTO place_matches (user1_id, user2_id, place_id, place_name, match_score)
  SELECT 
    NEW.user_id,
    fp.user_id,
    NEW.place_id,
    NEW.name,
    1
  FROM favorite_places fp
  WHERE fp.place_id = NEW.place_id 
    AND fp.user_id != NEW.user_id
  ON CONFLICT (user1_id, user2_id, place_id) DO NOTHING;
  
  -- Also create reverse matches
  INSERT INTO place_matches (user1_id, user2_id, place_id, place_name, match_score)
  SELECT 
    fp.user_id,
    NEW.user_id,
    NEW.place_id,
    NEW.name,
    1
  FROM favorite_places fp
  WHERE fp.place_id = NEW.place_id 
    AND fp.user_id != NEW.user_id
  ON CONFLICT (user1_id, user2_id, place_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create matches when someone adds a favorite
CREATE TRIGGER trigger_create_place_matches
  AFTER INSERT ON favorite_places
  FOR EACH ROW
  EXECUTE FUNCTION create_place_matches();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_favorite_places_updated_at
  BEFORE UPDATE ON favorite_places
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();