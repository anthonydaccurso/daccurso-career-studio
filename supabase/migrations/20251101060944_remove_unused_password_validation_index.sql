/*
  # Remove Unused Password Validation Index

  1. Overview
    - Removes unused index on password_validation_log.user_email
    - Index was not being utilized by queries
    - Improves database performance by reducing index maintenance overhead

  2. Changes
    - DROP INDEX idx_password_validation_user_email

  3. Notes
    - The checked_at index is sufficient for audit log queries
    - Email lookups are rare and don't require dedicated indexing
*/

-- Remove unused index
DROP INDEX IF EXISTS idx_password_validation_user_email;
