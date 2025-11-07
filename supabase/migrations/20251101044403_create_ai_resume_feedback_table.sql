/*
  # Create AI Resume Feedback Table
  
  1. New Tables
    - `ai_resume_feedback`
      - `id` (uuid, primary key)
      - `file_name` (text) - Original filename
      - `file_data` (text) - Base64 encoded file for download
      - `file_size` (integer) - File size in bytes
      - `ai_feedback` (text) - AI-generated feedback
      - `created_at` (timestamptz) - Timestamp of submission
  
  2. Security
    - Enable RLS on `ai_resume_feedback` table
    - Add policy for anonymous users to insert their own submissions
    - Add policy for service role to read all submissions
  
  3. Notes
    - Separate table for AI feedback submissions distinct from manual resume services
    - Stores complete file data for download and outreach purposes
*/

CREATE TABLE IF NOT EXISTS ai_resume_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_data text,
  file_size integer,
  ai_feedback text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_resume_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit AI resume feedback"
  ON ai_resume_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all AI feedback"
  ON ai_resume_feedback
  FOR SELECT
  TO service_role
  USING (true);