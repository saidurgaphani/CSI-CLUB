/*
  # Create events table
  1. New Tables: events (id uuid, title text, description text, date timestamptz, venue text, form_link text, status text, image text, created_at timestamptz)
  2. Security: Enable RLS, add read policy for anonymous users
*/
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  venue text,
  form_link text,
  status text NOT NULL DEFAULT 'upcoming', -- 'upcoming' or 'past'
  image text, -- URL to event image
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to events" ON events
FOR SELECT TO public
USING (true);
