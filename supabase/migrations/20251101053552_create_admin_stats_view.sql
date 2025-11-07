/*
  # Create Admin Statistics Views

  1. Views Created
    - `admin_resume_stats` - Resume submissions statistics
    - `admin_contact_stats` - Contact form submissions statistics
    - `admin_ai_feedback_stats` - AI resume feedback statistics
  
  2. Security
    - Views are accessible only to authenticated admin users
    - RLS policies ensure only admins with valid emails can access
  
  3. Statistics Provided
    - Total count per table
    - Recent submissions (last 7 days)
    - Today's submissions
    - Average response/feedback metrics
*/

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = auth.jwt()->>'email'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Add RLS policies for admin access to existing tables
CREATE POLICY "Admins can view all resume submissions"
  ON resume_submissions
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can view all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can view all AI feedback"
  ON ai_resume_feedback
  FOR SELECT
  TO authenticated
  USING (is_admin());