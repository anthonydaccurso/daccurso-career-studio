/*
  # Create Password Policy Configuration

  1. Overview
    - Centralized password policy configuration
    - Allows administrators to manage password requirements
    - Provides flexibility without code changes

  2. Settings
    - Minimum password length
    - Password leak protection enabled/disabled
    - Maximum breach count allowed
    - Password complexity requirements

  3. Security
    - Only service role can modify policies
    - Default secure settings enforced
*/

-- Create password policy configuration table
CREATE TABLE IF NOT EXISTS password_policy (
  id integer PRIMARY KEY DEFAULT 1,
  min_length integer NOT NULL DEFAULT 8,
  require_leak_check boolean NOT NULL DEFAULT true,
  max_breach_count_allowed integer NOT NULL DEFAULT 0,
  require_uppercase boolean NOT NULL DEFAULT false,
  require_lowercase boolean NOT NULL DEFAULT false,
  require_numbers boolean NOT NULL DEFAULT false,
  require_special_chars boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  updated_by text,
  CONSTRAINT single_policy_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE password_policy ENABLE ROW LEVEL SECURITY;

-- Only service role can access policy
CREATE POLICY "Service role can manage password policy"
  ON password_policy
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to view policy (but not modify)
CREATE POLICY "Authenticated users can view password policy"
  ON password_policy
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default policy
INSERT INTO password_policy (id, min_length, require_leak_check, max_breach_count_allowed)
VALUES (1, 8, true, 0)
ON CONFLICT (id) DO UPDATE SET
  min_length = EXCLUDED.min_length,
  require_leak_check = EXCLUDED.require_leak_check,
  max_breach_count_allowed = EXCLUDED.max_breach_count_allowed;

-- Add comments
COMMENT ON TABLE password_policy IS 'Centralized password security policy configuration';
COMMENT ON COLUMN password_policy.require_leak_check IS 'When true, passwords must pass HaveIBeenPwned check';
COMMENT ON COLUMN password_policy.max_breach_count_allowed IS 'Maximum number of times a password can appear in breaches (0 = must not be in any breach)';
