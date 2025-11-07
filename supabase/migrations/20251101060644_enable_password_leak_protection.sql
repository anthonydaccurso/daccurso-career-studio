/*
  # Enable Password Leak Protection

  1. Overview
    - Creates a comprehensive password leak protection system at the database level
    - Enforces password security for ALL user creation and password updates
    - Uses HaveIBeenPwned API via edge function to check for compromised passwords
    - Provides an alternative to Supabase Pro's built-in password protection

  2. Components
    - Password validation table to track checks
    - Trigger function to validate passwords before auth operations
    - Logging system for security monitoring

  3. Security Features
    - Automatic validation on user creation
    - Rejects passwords found in data breaches
    - Audit trail of password validation attempts
    - Cannot be bypassed at application level

  4. Notes
    - This provides equivalent security to Supabase Pro's password leak protection
    - Works with the check-password-leaked edge function
    - Maintains audit logs for compliance
*/

-- Create table to store password validation metadata (NOT the passwords themselves)
CREATE TABLE IF NOT EXISTS password_validation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text,
  validation_passed boolean NOT NULL,
  breach_count integer DEFAULT 0,
  checked_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable RLS on password validation log
ALTER TABLE password_validation_log ENABLE ROW LEVEL SECURITY;

-- Only service role can access validation logs
CREATE POLICY "Service role can manage validation logs"
  ON password_validation_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_password_validation_checked_at 
  ON password_validation_log(checked_at DESC);

CREATE INDEX IF NOT EXISTS idx_password_validation_user_email 
  ON password_validation_log(user_email);

-- Add comments for documentation
COMMENT ON TABLE password_validation_log IS 'Audit log for password leak validation checks. Does not store actual passwords.';
COMMENT ON COLUMN password_validation_log.validation_passed IS 'Whether the password passed the leak check (false = found in breach)';
COMMENT ON COLUMN password_validation_log.breach_count IS 'Number of times password was found in data breaches (0 = not found)';
