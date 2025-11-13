/*
  # Create members table
  1. New Tables: members (id uuid, name text, role text, image_url text, created_at timestamptz)
  2. Security: Enable RLS, add read policy for anonymous users
  3. Initial Data: Insert sample member data
*/
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  image_url text, -- URL to member's profile picture
  created_at timestamptz DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to members" ON members
FOR SELECT TO public
USING (true);

-- Insert some initial member data
INSERT INTO members (name, role, image_url)
VALUES
  ('Alice Johnson', 'President', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Bob Williams', 'Vice President', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Charlie Brown', 'Secretary', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Diana Miller', 'Treasurer', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Eve Davis', 'Event Coordinator', 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Frank White', 'Technical Lead', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
  ('Grace Taylor', 'Marketing Lead', 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
