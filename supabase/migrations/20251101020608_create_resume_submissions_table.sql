/*
  # Create resume submissions table

  1. New Tables
    - `resume_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `created_at` (timestamptz) - Timestamp of submission
      - `service_type` (text) - Type of service: 'manual' or 'ai'
      - `file_name` (text) - Original filename of uploaded resume
      - `file_url` (text) - URL/path to stored file
      - `email` (text) - User's email address (required for manual service)
      - `comments` (text) - Additional comments from user
      - `status` (text) - Submission status (pending, in_progress, completed)
      - `ai_feedback` (text) - AI-generated feedback (for AI service)

  2. Security
    - Enable RLS on `resume_submissions` table
    - Add policy for public insert (anyone can submit)
    - Add policy for authenticated users to read all submissions (admin access)

  3. Important Notes
    - This table stores all resume submissions for both manual and AI services
    - AI feedback is stored directly in the table for easy retrieval
    - Status field helps track the processing state of manual submissions
*/

CREATE TABLE IF NOT EXISTS resume_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  service_type text NOT NULL CHECK (service_type IN ('manual', 'ai')),
  file_name text NOT NULL,
  file_url text NOT NULL,
  email text,
  comments text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  ai_feedback text
);

ALTER TABLE resume_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit resumes"
  ON resume_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON resume_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON resume_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
