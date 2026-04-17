create table if not exists grader_submissions (
  id            uuid default gen_random_uuid() primary key,
  email         text,
  overall_grade text not null check (overall_grade in ('A', 'B', 'C', 'D', 'F')),
  total_score   int not null check (total_score between 5 and 25),
  scores        jsonb not null,
  gaps          jsonb not null,
  extracted     jsonb not null,
  summary       text not null,
  sop_text      text,
  source        text default 'organic',
  ip_hash       text,
  created_at    timestamptz default now()
);

create index if not exists idx_grade_email
  on grader_submissions (overall_grade, email)
  where email is not null;

create index if not exists idx_ip_rate
  on grader_submissions (ip_hash, created_at);
