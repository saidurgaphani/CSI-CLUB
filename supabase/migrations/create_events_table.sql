/*
      # Create events table
      1. New Table: events (id uuid, title text, description text, date timestamptz, venue text, created_at timestamptz)
      2. Security: Enable RLS, add read policy for authenticated users
    */
    CREATE TABLE IF NOT EXISTS events (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text,
      date timestamptz,
      venue text,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE events ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Events read policy" ON events FOR SELECT USING (true);