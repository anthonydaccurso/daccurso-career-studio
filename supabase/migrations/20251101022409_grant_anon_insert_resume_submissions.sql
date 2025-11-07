/*
  # Grant direct insert permissions to anonymous users

  1. Changes
    - Grant INSERT permission directly to anon role on resume_submissions table
    - This works in conjunction with RLS policies to ensure anonymous users can submit resumes

  2. Security
    - Allows anonymous users to insert into resume_submissions
    - RLS policy controls what can be inserted (WITH CHECK true allows all)
*/

GRANT INSERT ON resume_submissions TO anon;
GRANT INSERT ON resume_submissions TO authenticated;
