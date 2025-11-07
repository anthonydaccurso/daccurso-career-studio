/*
  # Create Images Storage Bucket Policies

  1. Policies
    - Allow public read access to images bucket
    - Allow authenticated and anon users to upload to images bucket
*/

-- Enable public access for reading
CREATE POLICY "Public can read images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'images');

-- Allow anyone to update images
CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'images');
