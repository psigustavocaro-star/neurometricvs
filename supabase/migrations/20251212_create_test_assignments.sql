-- 1. Crear tabla de asignaciones
create table if not exists test_assignments (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references patients(id) on delete cascade not null,
  test_id text not null,
  token uuid default gen_random_uuid() not null unique,
  status text check (status in ('pending', 'completed')) default 'pending',
  results jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- 2. Activar seguridad
alter table test_assignments enable row level security;

-- 3. Crear políticas de acceso (Profesional)
-- CORRECCION: Usamos profile_id en lugar de user_id
create policy "Profesional ve sus asignaciones"
  on test_assignments for select
  using (
    exists (
      select 1 from patients
      where patients.id = test_assignments.patient_id
      and patients.profile_id = auth.uid()
    )
  );

create policy "Profesional crea asignaciones"
  on test_assignments for insert
  with check (
    exists (
      select 1 from patients
      where patients.id = test_assignments.patient_id
      and patients.profile_id = auth.uid()
    )
  );

-- 4. Funciones para acceso público seguro (Paciente)
create or replace function get_assignment_by_token(lookup_token uuid)
returns setof test_assignments
language sql security definer set search_path = public
as $$
  select * from test_assignments where token = lookup_token limit 1;
$$;

create or replace function submit_assignment_results(lookup_token uuid, new_results jsonb)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  update test_assignments
  set status = 'completed', results = new_results, completed_at = now()
  where token = lookup_token and status = 'pending';
end;
$$;
