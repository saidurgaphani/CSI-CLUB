/*
      # Add iframe column to events table
      1. Add new column: iframe (text)
    */
    ALTER TABLE events ADD COLUMN IF NOT EXISTS iframe text;
