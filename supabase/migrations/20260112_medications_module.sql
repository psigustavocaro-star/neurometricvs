-- Create Patient Medications Table
create table if not exists patient_medications (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references patients(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Drug Details
  name text not null,
  dosage text,
  frequency text,
  route text default 'Oral',
  
  -- Timeline
  start_date date,
  end_date date,
  status text default 'active', -- active, historic, paused
  
  -- Metadata
  prescribed_by text,
  notes text
);

-- Enable RLS
alter table patient_medications enable row level security;

-- Policies
create policy "Users can view medications of their patients"
  on patient_medications for select
  using (
    exists (
      select 1 from patients
      where patients.id = patient_medications.patient_id
      and patients.profile_id = auth.uid()
    )
  );

create policy "Users can manage medications of their patients"
  on patient_medications for all
  using (
    exists (
      select 1 from patients
      where patients.id = patient_medications.patient_id
      and patients.profile_id = auth.uid()
    )
  );

-- Trigger for updated_at
create trigger handle_medications_updated_at before update on patient_medications
  for each row execute procedure moddatetime (updated_at);
