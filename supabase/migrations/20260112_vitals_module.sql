-- Create Vitals Logs Table
create table if not exists vitals_logs (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references patients(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Measurements
  weight numeric, -- kg
  height numeric, -- cm
  bmi numeric,
  systolic integer, -- blood pressure
  diastolic integer,
  heart_rate integer, -- bpm
  temperature numeric, -- °C
  oxygen_saturation integer, -- %
  respiratory_rate integer, -- rpm
  
  notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table vitals_logs enable row level security;

-- Policies
create policy "Users can view vitals of their patients"
  on vitals_logs for select
  using (
    exists (
      select 1 from patients
      where patients.id = vitals_logs.patient_id
      and patients.profile_id = auth.uid()
    )
  );

create policy "Users can manage vitals of their patients"
  on vitals_logs for all
  using (
    exists (
      select 1 from patients
      where patients.id = vitals_logs.patient_id
      and patients.profile_id = auth.uid()
    )
  );

-- Function to automatically update patient updated_at
create trigger handle_vitals_updated_at before update on vitals_logs
  for each row execute procedure moddatetime (updated_at);
