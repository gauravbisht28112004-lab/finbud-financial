/*
# Create applications and contact_messages tables

## Purpose
This migration creates two tables for the FinBud Financial website:
1. `applications` — stores loan application submissions from the Apply page
2. `contact_messages` — stores contact form submissions from the Contact page

## Tables

### applications
- `id` (uuid, primary key)
- `full_name` (text, not null) — applicant's full name
- `email` (text, not null) — applicant's email
- `phone` (text, not null) — applicant's phone number
- `loan_type` (text, not null) — type of loan (Personal, Home, Business, Overdraft)
- `loan_amount` (numeric, not null) — requested loan amount
- `employment_type` (text, not null) — salaried, self-employed, business owner, professional
- `monthly_income` (numeric, not null) — applicant's monthly income
- `city` (text, not null) — applicant's city
- `message` (text, nullable) — additional details from applicant
- `consent` (boolean, not null, default false) — privacy consent acceptance
- `status` (text, not null, default 'pending') — application processing status
- `created_at` (timestamptz, default now())

### contact_messages
- `id` (uuid, primary key)
- `full_name` (text, not null) — renamed to `name` for clarity
- `name` (text, not null) — sender's name
- `email` (text, not null) — sender's email
- `phone` (text, not null) — sender's phone
- `subject` (text, nullable) — message subject
- `message` (text, not null) — message body
- `created_at` (timestamptz, default now())

## Security
- Both tables have RLS enabled.
- This is a no-auth (single-tenant) app — no login required.
- Policies use `TO anon, authenticated` so the anon-key frontend can insert records.
- SELECT/UPDATE/DELETE are restricted to authenticated (admin) access only — anon can only INSERT.
- This prevents public read access to submitted applications while allowing form submissions.
*/

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  loan_type text NOT NULL,
  loan_amount numeric NOT NULL,
  employment_type text NOT NULL,
  monthly_income numeric NOT NULL,
  city text NOT NULL,
  message text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Only authenticated (admin) can read applications
DROP POLICY IF EXISTS "authenticated_read_applications" ON applications;
CREATE POLICY "authenticated_read_applications" ON applications FOR SELECT
  TO authenticated USING (true);

-- Anyone (anon + authenticated) can submit applications
DROP POLICY IF EXISTS "anon_insert_applications" ON applications;
CREATE POLICY "anon_insert_applications" ON applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Only authenticated (admin) can update application status
DROP POLICY IF EXISTS "authenticated_update_applications" ON applications;
CREATE POLICY "authenticated_update_applications" ON applications FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated (admin) can delete applications
DROP POLICY IF EXISTS "authenticated_delete_applications" ON applications;
CREATE POLICY "authenticated_delete_applications" ON applications FOR DELETE
  TO authenticated USING (true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Only authenticated (admin) can read contact messages
DROP POLICY IF EXISTS "authenticated_read_contact_messages" ON contact_messages;
CREATE POLICY "authenticated_read_contact_messages" ON contact_messages FOR SELECT
  TO authenticated USING (true);

-- Anyone (anon + authenticated) can submit contact messages
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Only authenticated (admin) can delete contact messages
DROP POLICY IF EXISTS "authenticated_delete_contact_messages" ON contact_messages;
CREATE POLICY "authenticated_delete_contact_messages" ON contact_messages FOR DELETE
  TO authenticated USING (true);
