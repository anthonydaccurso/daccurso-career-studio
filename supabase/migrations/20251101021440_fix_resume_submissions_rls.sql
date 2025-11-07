/*
  # Fix RLS policy for resume submissions

  1. Changes
    - Drop existing insert policy
    - Create new policy that allows public inserts (anyone can submit)
    - This fixes the "new row violates row-level security policy" error

  2. Security
    - Allows anonymous users to insert resume submissions
    - Maintains existing read/update policies for authenticated users
*/

DROP POLICY IF EXISTS "Anyone can submit resumes" ON resume_submissions;

CREATE POLICY "Anyone can submit resumes"
  ON resume_submissions
  FOR INSERT
  WITH CHECK (true);
