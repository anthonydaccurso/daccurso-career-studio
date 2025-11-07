/*
  # Create Resume Files Storage Bucket
  
  1. New Bucket
    - `resume-files` - Private bucket for storing resume documents
  
  2. Storage Policies
    - Allow public (anonymous) users to upload resume files
    - Only service role can read files (for admin access)
    - No public read access to protect user privacy
  
  3. Security
    - Files are private by default
    - Only backend with service role can retrieve files
    - Users can upload but cannot read other users' files
*/

-- Create the resume-files bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resume-files',
  'resume-files',
  false,
  10485760,
  ARRAY['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone (including anonymous) to upload resume files
CREATE POLICY "Anyone can upload resume files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resume-files');

-- NOTE: No SELECT policy means only service_role can read files
-- This protects user privacy and prevents unauthorized access