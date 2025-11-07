/*
  # Create booking submissions table

  1. New Tables
    - `booking_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `service_type` (text, required) - tracks which service was selected
      - `desired_date` (text, required)
      - `desired_time` (text, required)
      - `created_at` (timestamp)
      - `status` (text, default 'new')

  2. Security
    - Enable RLS on `booking_submissions` table
    - Add policy for anonymous users to insert bookings
    - Add policy for authenticated admin users to view all bookings
*/

CREATE TABLE IF NOT EXISTS booking_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  desired_date text NOT NULL,
  desired_time text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled'))
);

ALTER TABLE booking_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can insert bookings"
  ON booking_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON booking_submissions
  FOR SELECT
  TO authenticated
  USING (true);