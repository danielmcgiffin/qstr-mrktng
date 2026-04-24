alter table if exists grader_submissions
  add column if not exists doc_hash text,
  add column if not exists email_hash text;

create index if not exists idx_grader_submissions_doc_hash_created_at
  on grader_submissions (doc_hash, created_at desc)
  where doc_hash is not null;

create index if not exists idx_grader_submissions_email_hash_created_at
  on grader_submissions (email_hash, created_at desc)
  where email_hash is not null;

create table if not exists grader_daily_cost (
  day        date primary key,
  cost_usd   numeric(12, 6) not null default 0,
  updated_at timestamptz not null default now()
);
