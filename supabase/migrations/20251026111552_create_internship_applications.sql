/*
  # Create Internship Applications Table

  1. New Tables
    - `internship_applications`
      - `id` (uuid, primary key)
      - `full_name` (text) - Full name of the applicant
      - `email` (text, unique) - Email address for contact
      - `whatsapp` (text) - WhatsApp number for direct communication
      - `school_university` (text) - School or University name
      - `position` (text) - Desired internship position
      - `status` (text) - Application status (pending, approved, rejected)
      - `created_at` (timestamptz) - Application timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `internship_applications` table
    - Add policy for public to insert their application
    - Add policy for authenticated users to view all applications (admin access)

  3. Notes
    - Public users can only insert (apply)
    - Only authenticated admins can view/manage applications
    - Email is unique to prevent duplicate applications
*/

CREATE TABLE IF NOT EXISTS internship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  whatsapp text NOT NULL,
  school_university text NOT NULL,
  position text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply for internship"
  ON internship_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON internship_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update applications"
  ON internship_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_internship_applications_email ON internship_applications(email);
CREATE INDEX IF NOT EXISTS idx_internship_applications_status ON internship_applications(status);
CREATE INDEX IF NOT EXISTS idx_internship_applications_position ON internship_applications(position);
