/*
  # Create Reseller Registrations Table

  1. New Tables
    - `reseller_registrations`
      - `id` (uuid, primary key)
      - `full_name` (text) - Full name of the reseller candidate
      - `email` (text, unique) - Email address for contact
      - `whatsapp` (text) - WhatsApp number for direct communication
      - `city` (text) - City of origin
      - `status` (text) - Registration status (pending, approved, rejected)
      - `created_at` (timestamptz) - Registration timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `reseller_registrations` table
    - Add policy for public to insert their registration
    - Add policy for authenticated users to view all registrations (admin access)

  3. Notes
    - Public users can only insert (register)
    - Only authenticated admins can view/manage registrations
    - Email is unique to prevent duplicate registrations
*/

CREATE TABLE IF NOT EXISTS reseller_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  whatsapp text NOT NULL,
  city text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reseller_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to register (insert)
CREATE POLICY "Anyone can register as reseller"
  ON reseller_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admins) to view all registrations
CREATE POLICY "Authenticated users can view all registrations"
  ON reseller_registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update registrations
CREATE POLICY "Authenticated users can update registrations"
  ON reseller_registrations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_reseller_registrations_email ON reseller_registrations(email);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_reseller_registrations_status ON reseller_registrations(status);