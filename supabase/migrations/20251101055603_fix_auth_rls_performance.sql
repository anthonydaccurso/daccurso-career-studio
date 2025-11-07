/*
  # Fix Auth RLS Performance Issues

  ## Issues Fixed
  
  1. **Correct Subquery Syntax for Auth Functions**
     - The policies were using `(select (auth.jwt()->>'email'))` with extra parentheses
     - Should be `(select auth.jwt()->>'email')` to prevent re-evaluation per row
     - This follows the official Supabase documentation pattern
  
  2. **Function Search Path**
     - Update is_admin() to use STABLE volatility instead of VOLATILE
     - This allows better query optimization while maintaining security
  
  ## Performance Impact
  - Prevents auth function re-evaluation for each row
  - Improves query performance at scale
  - Follows Supabase best practices
*/

-- Drop and recreate admin_users policies with correct syntax
DROP POLICY IF EXISTS "Admins can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admins can update own last_login" ON admin_users;

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

-- Update is_admin function to be STABLE instead of VOLATILE for better performance
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
STABLE
SET search_path = public, extensions
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = (select auth.jwt()->>'email')
  );
END;
$$;

GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
