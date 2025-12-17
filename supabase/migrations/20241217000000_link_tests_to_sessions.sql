alter table test_results
add column session_id uuid references clinical_sessions(id) on delete set null;

create index idx_test_results_session_id on test_results(session_id);
