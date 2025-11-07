/*
  # Optimize Admin Users RLS Performance

  ## Changes Made
  
  1. **Add user_id column**
     - Link admin_users to auth.users via user_id
     - This allows using auth.uid() which is more efficient than auth.jwt()
  
  2. **Update RLS Policies**
     - Replace email-based checks with user_id checks
     - Use (select auth.uid()) pattern to prevent re-evaluation per row
  
  3. **Update is_admin function**
     - Use user_id instead of email for better performance
  
  ## Performance Impact
  - Significantly faster RLS checks using UUID comparison vs text comparison
  - Prevents auth function re-evaluation for each row
  - Follows Supabase performance best practices
*/

-- Add user_id column to link to auth.users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'admin_users' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE admin_users ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
    CREATE UNIQUE INDEX IF NOT EXISTS admin_users_user_id_idx ON admin_users(user_id);
  END IF;
END $$;

-- Drop old policies
DROP POLICY IF EXISTS "Admins can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admins can update own last_login" ON admin_users;

-- Create optimized policies using user_id
CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Admins can update own last_login"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Update is_admin function to use user_id
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
    WHERE user_id = (select auth.uid())
  );
END;
$$;

GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
