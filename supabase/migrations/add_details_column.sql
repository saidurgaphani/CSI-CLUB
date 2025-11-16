/*
  # Add details column to events table
  1. New Column: details (text)
  2. Security: No changes needed, RLS already enabled
*/
ALTER TABLE events
ADD COLUMN IF NOT EXISTS details text;