-- Create Clinical Records Table (One-to-One with Patients)
create table if not exists clinical_records (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references patients(id) on delete cascade not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Clinical Data Fields
  anamnesis jsonb default '{}'::jsonb, -- Stores HPI, Family, Social, etc. structured
  diagnosis text,
  allergies text,
  medications text,
  blood_type text,
  height numeric, -- in cm
  weight numeric, -- in kg
  
  -- Cultural/Personal
  interests text, -- Hobbies, likes for AI recommendations
  cultural_background text
);

-- Enable RLS
alter table clinical_records enable row level security;

-- Create Policies (assuming profiles/users link)
-- Allow read/write if the patient belongs to the user's profile
create policy "Users can view clinical records of their patients"
  on clinical_records for select
  using (
    exists (
      select 1 from patients
      where patients.id = clinical_records.patient_id
      and patients.profile_id = auth.uid()
    )
  );

create policy "Users can update clinical records of their patients"
  on clinical_records for insert
  with check (
    exists (
      select 1 from patients
      where patients.id = clinical_records.patient_id
      and patients.profile_id = auth.uid()
    )
  );

create policy "Users can update clinical records of their patients"
  on clinical_records for update
  using (
    exists (
      select 1 from patients
      where patients.id = clinical_records.patient_id
      and patients.profile_id = auth.uid()
    )
  );

-- Create Clinical Sessions Table (One-to-Many with Patients)
create table if not exists clinical_sessions (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references patients(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  
  duration integer default 60, -- minutes
  type text default 'Sesión Regular', -- Evaluación, Control, Crisis, etc.
  status text default 'scheduled', -- scheduled, completed, cancelled
  
  -- Content
  subjective text, -- S in SOAP
  objective text, -- O in SOAP
  assessment text, -- A in SOAP
  plan text, -- P in SOAP
  notes text, -- General private notes
  
  transcription text -- If we add voice later
);

-- Enable RLS
alter table clinical_sessions enable row level security;

create policy "Users can view sessions of their patients"
  on clinical_sessions for select
  using (
    exists (
      select 1 from patients
      where patients.id = clinical_sessions.patient_id
      and patients.profile_id = auth.uid()
    )
  );

create policy "Users can manage sessions of their patients"
  on clinical_sessions for all
  using (
    exists (
      select 1 from patients
      where patients.id = clinical_sessions.patient_id
      and patients.profile_id = auth.uid()
    )
  );

-- Create AI Insights Table (One-to-One with Sessions)
create table if not exists ai_insights (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references clinical_sessions(id) on delete cascade not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  analysis text, -- Detailed clinical analysis
  clinical_path_suggestions jsonb default '[]'::jsonb, -- Array of suggested paths
  
  -- "Cultural Prescriptions"
  recommendations jsonb default '[]'::jsonb, -- Array of { type: 'movie'|'book'|'activity', title: '', reason: '' }
  
  risk_assessment text -- AI flag for risks
);

-- Enable RLS
alter table ai_insights enable row level security;

create policy "Users can view ai insights of their patients"
  on ai_insights for select
  using (
    exists (
      select 1 from clinical_sessions
      join patients on patients.id = clinical_sessions.patient_id
      where clinical_sessions.id = ai_insights.session_id
      and patients.profile_id = auth.uid()
    )
  );
