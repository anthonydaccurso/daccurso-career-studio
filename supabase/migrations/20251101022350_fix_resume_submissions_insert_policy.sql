/*
  # Fix resume submissions insert policy

  1. Changes
    - Drop existing insert policy
    - Create new unrestricted insert policy for all users (including anonymous)
    - This ensures anyone can submit resumes without authentication

  2. Security
    - Allows public/anonymous users to insert resume submissions
    - Maintains existing read/update policies for authenticated users
*/

DROP POLICY IF EXISTS "Anyone can submit resumes" ON resume_submissions;

CREATE POLICY "Public can insert resume submissions"
  ON resume_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);
