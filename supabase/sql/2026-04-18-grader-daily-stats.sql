create table if not exists grader_daily_stats (
  day          date primary key,
  submissions  integer not null default 0,
  avg_ai       numeric(6, 2) not null default 0,
  avg_human    numeric(6, 2) not null default 0,
  avg_variance numeric(8, 3) not null default 0,
  cost_usd     numeric(12, 6) not null default 0,
  updated_at   timestamptz not null default now()
);
