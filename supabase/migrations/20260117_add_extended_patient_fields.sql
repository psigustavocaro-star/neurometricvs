-- Migration: Add extended patient demographic and contact fields
-- This adds additional columns for a comprehensive clinical patient record

-- Add extended demographic and contact fields to patients table
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS rut TEXT,
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS clinic TEXT,
ADD COLUMN IF NOT EXISTS education TEXT,
ADD COLUMN IF NOT EXISTS occupation TEXT,
ADD COLUMN IF NOT EXISTS companion TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact TEXT,
ADD COLUMN IF NOT EXISTS genogram TEXT;

-- Add comments for documentation
COMMENT ON COLUMN patients.rut IS 'National ID (RUT for Chile, or equivalent)';
COMMENT ON COLUMN patients.age IS 'Patient age (can be derived from birth_date but useful for quick access)';
COMMENT ON COLUMN patients.phone IS 'Primary contact phone number';
COMMENT ON COLUMN patients.address IS 'Patient home address';
COMMENT ON COLUMN patients.clinic IS 'Primary clinic or care facility';
COMMENT ON COLUMN patients.education IS 'Educational level (e.g., University, High School)';
COMMENT ON COLUMN patients.occupation IS 'Current occupation or profession';
COMMENT ON COLUMN patients.companion IS 'Regular companion/caregiver name and relationship';
COMMENT ON COLUMN patients.emergency_contact IS 'Emergency contact name and phone';
COMMENT ON COLUMN patients.genogram IS 'Family genogram notes and observations';

-- Create index on commonly searched fields
CREATE INDEX IF NOT EXISTS idx_patients_rut ON patients(rut);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);
