/*
  # Create club_settings table and insert default data
  1. New Tables: club_settings (id uuid, join_form_link text, contact_email text, phone_number text, social_media_facebook text, social_media_instagram text, social_media_linkedin text, updated_at timestamptz)
  2. Security: Enable RLS, add read policy for anonymous users
  3. Initial Data: Insert a default row if the table is empty.
*/
CREATE TABLE IF NOT EXISTS club_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  join_form_link text DEFAULT '',
  contact_email text DEFAULT '',
  phone_number text DEFAULT '',
  social_media_facebook text DEFAULT '',
  social_media_instagram text DEFAULT '',
  social_media_linkedin text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE club_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to club settings" ON club_settings
FOR SELECT TO public
USING (true);

-- Insert default settings if no rows exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM club_settings) THEN
        INSERT INTO club_settings (join_form_link, contact_email, phone_number, social_media_facebook, social_media_instagram, social_media_linkedin)
        VALUES (
            'https://forms.gle/your-join-form-link', -- Placeholder: Replace with your actual join form link
            'contact@csiclub.com',
            '+1234567890',
            'https://facebook.com/csiclub',
            'https://instagram.com/csiclub',
            'https://linkedin.com/csiclub'
        );
    END IF;
END
$$;
