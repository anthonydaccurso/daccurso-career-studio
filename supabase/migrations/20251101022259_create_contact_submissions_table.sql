/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `created_at` (timestamptz) - Timestamp of submission
      - `name` (text) - Contact's full name
      - `email` (text) - Contact's email address
      - `phone` (text) - Contact's phone number (optional)
      - `service` (text) - Service of interest
      - `message` (text) - Contact message
      - `status` (text) - Status (new, in_progress, completed)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public insert (anyone can submit)
    - Add policy for authenticated users to read all submissions (admin access)

  3. Important Notes
    - This table stores all contact form submissions
    - Status field helps track the processing state
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  service text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed'))
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
