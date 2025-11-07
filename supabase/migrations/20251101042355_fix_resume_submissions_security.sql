/*
  # Fix Resume Submissions Security
  
  1. Security Changes
    - DROP all existing insecure policies that use USING (true)
    - Add service_role only policy for SELECT (admin access only via service role key)
    - Keep public INSERT policy for anonymous submissions
    - Remove UPDATE policy entirely (updates should only happen via backend with service role)
  
  2. Notes
    - Anonymous users can submit resumes (INSERT only)
    - Only service role (backend) can read submissions for admin dashboard
    - No authenticated user access to prevent data leaks
    - No public UPDATE access to prevent tampering
*/

-- Drop all existing insecure policies
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON resume_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON resume_submissions;
DROP POLICY IF EXISTS "Public can insert resume submissions" ON resume_submissions;

-- Allow public (anonymous) users to insert resume submissions
CREATE POLICY "Anyone can submit resumes"
  ON resume_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- NOTE: No SELECT policies means only service_role can read data
-- This prevents any user from viewing submissions directly
-- Admins must use service_role key via backend/edge functions