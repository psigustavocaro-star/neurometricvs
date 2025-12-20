-- Add missing columns to profiles table
alter table profiles 
add column if not exists phone text,
add column if not exists registry_number text,
add column if not exists specialty text,
add column if not exists signature_url text;
