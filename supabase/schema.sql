-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  registry_number text,
  specialty text,
  signature_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Patients table
create table public.patients (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  full_name text not null,
  birth_date date,
  gender text,
  contact_email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Test Results table
create table public.test_results (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patients(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  test_type text not null,
  results_json jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Subscriptions table
create type subscription_plan as enum ('basic', 'clinical', 'pro');
create type subscription_status as enum ('active', 'canceled', 'past_due');

create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  plan subscription_plan not null default 'basic',
  status subscription_status not null default 'active',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic setup)
alter table public.profiles enable row level security;
alter table public.patients enable row level security;
alter table public.test_results enable row level security;
alter table public.subscriptions enable row level security;

-- Policies
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view their own patients" on public.patients for select using (auth.uid() = profile_id);
create policy "Users can insert their own patients" on public.patients for insert with check (auth.uid() = profile_id);
create policy "Users can update their own patients" on public.patients for update using (auth.uid() = profile_id);
create policy "Users can delete their own patients" on public.patients for delete using (auth.uid() = profile_id);

create policy "Users can view their own test results" on public.test_results for select using (auth.uid() = profile_id);
create policy "Users can insert their own test results" on public.test_results for insert with check (auth.uid() = profile_id);

create policy "Users can view their own subscription" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can insert their own subscription" on public.subscriptions for insert with check (auth.uid() = user_id);
create policy "Users can update their own subscription" on public.subscriptions for update using (auth.uid() = user_id);
