/*
  # Add 'type' column to members table and categorize members
  1. Alter Table: Add 'type' column to 'members' table.
  2. Update Data: Assign 'faculty' or 'student' type to existing members.
  3. Add New Data: Insert additional sample members for both categories.
*/

-- Add the 'type' column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='members' AND column_name='type') THEN
        ALTER TABLE members ADD COLUMN type text DEFAULT 'student' NOT NULL;
    END IF;
END
$$;

-- Update existing members to categorize them
UPDATE members SET type = 'faculty' WHERE role IN ('President', 'Vice President', 'Technical Lead', 'Marketing Lead');
UPDATE members SET type = 'student' WHERE role IN ('Secretary', 'Treasurer', 'Event Coordinator');

-- Insert additional sample data for a richer display
INSERT INTO members (name, role, image_url, type)
VALUES
  ('Dr. Emily Chen', 'Faculty Advisor', 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'faculty'),
  ('Prof. David Lee', 'Research Mentor', 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'faculty'),
  ('Sophia Rodriguez', 'Web Development Lead', 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'student'),
  ('Daniel Kim', 'Cybersecurity Lead', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'student'),
  ('Olivia Martinez', 'Outreach Coordinator', 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'student'),
  ('Ethan Wilson', 'Logistics Manager', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'student')
ON CONFLICT (name) DO NOTHING; -- Prevent duplicate inserts if run multiple times
