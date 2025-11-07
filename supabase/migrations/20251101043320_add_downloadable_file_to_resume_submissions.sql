/*
  # Add Downloadable File Support to Resume Submissions
  
  1. Changes
    - Add file_data column to store base64 encoded file for downloads
    - Add file_size column to track file size
    - Add name and phone columns for contact information
  
  2. Notes
    - file_data stores base64 encoded file content for later download
    - Existing file_url and file_name remain for storage reference
    - This enables admins to download submitted resumes directly
*/

-- Add columns for file download support
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resume_submissions' AND column_name = 'file_data'
  ) THEN
    ALTER TABLE resume_submissions ADD COLUMN file_data text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resume_submissions' AND column_name = 'file_size'
  ) THEN
    ALTER TABLE resume_submissions ADD COLUMN file_size integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resume_submissions' AND column_name = 'name'
  ) THEN
    ALTER TABLE resume_submissions ADD COLUMN name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resume_submissions' AND column_name = 'phone'
  ) THEN
    ALTER TABLE resume_submissions ADD COLUMN phone text DEFAULT '';
  END IF;
END $$;