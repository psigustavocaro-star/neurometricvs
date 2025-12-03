-- Fix: Allow users to insert their own profile
-- This is required because the application attempts to auto-create a profile if it doesn't exist,
-- but RLS was blocking this operation.

create policy "Users can insert their own profile" 
on public.profiles 
for insert 
with check (auth.uid() = id);
