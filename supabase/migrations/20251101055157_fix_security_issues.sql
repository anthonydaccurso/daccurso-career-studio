/*
  # Fix Security Issues

  ## Issues Fixed
  
  1. **Auth RLS Performance Optimization**
     - Update `admin_users` policies to use `(select auth.jwt())` instead of `auth.jwt()`
     - This prevents re-evaluation of auth function for each row, improving performance at scale
  
  2. **Remove Duplicate Permissive Policies**
     - Drop the overly permissive "Authenticated users can view all contact submissions" policy
     - Keep only the more secure "Admins can view all contact submissions" policy
     - Remove overly permissive update policy as well
  
  3. **Fix Function Search Path**
     - Update `is_admin()` function to use immutable search_path
     - Add `SET search_path = public, extensions` to prevent search path injection attacks
  
  ## Security Improvements
  - Better query performance with optimized RLS policies
  - Reduced attack surface by removing duplicate permissive policies
  - Protected against search path injection in security-critical functions
*/

-- Drop existing policies that need to be updated
DROP POLICY IF EXISTS "Admins can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admins can update own last_login" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can view all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can update contact submissions" ON contact_submissions;

-- Recreate admin_users policies with optimized auth function calls
CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (email = (select auth.jwt()->>'email'));

CREATE POLICY "Admins can update own last_login"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (email = (select auth.jwt()->>'email'))
  WITH CHECK (email = (select auth.jwt()->>'email'));

-- Recreate is_admin function with secure search_path
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = (select auth.jwt()->>'email')
  );
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Note: The duplicate permissive policies for contact_submissions have been removed
-- Only the "Admins can view all contact submissions" policy (from another migration) remains
-- This ensures only admins can view and manage contact submissions
