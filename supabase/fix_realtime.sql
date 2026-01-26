-- Enable Supabase Realtime for Clinical Sessions
-- This script adds the table to the replication publication so changes are broadcasted.

-- 1. Add table to the realtime publication
alter publication supabase_realtime add table clinical_sessions;

-- 2. Set replica identity to full to ensure we get old values and full payloads
alter table clinical_sessions replica identity full;

-- 3. Verify it's added (optional check)
-- select * from pg_publication_tables where pubname = 'supabase_realtime';
