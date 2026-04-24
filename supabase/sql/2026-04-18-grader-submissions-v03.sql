alter table if exists grader_submissions
  add column if not exists spec_version text,
  add column if not exists prompt_version text,
  add column if not exists file_name text,
  add column if not exists file_size bigint,
  add column if not exists file_mime text,
  add column if not exists normalized_text text,
  add column if not exists original_doc text,
  add column if not exists raw_llm_responses jsonb,
  add column if not exists variance_report jsonb,
  add column if not exists review_status text,
  add column if not exists founder_note text,
  add column if not exists override_scores jsonb,
  add column if not exists sent_at timestamptz,
  add column if not exists purge_after timestamptz;

update grader_submissions
set
  spec_version = coalesce(spec_version, '0.3'),
  raw_llm_responses = coalesce(raw_llm_responses, '[]'::jsonb),
  review_status = coalesce(review_status, 'unreviewed'),
  purge_after = coalesce(purge_after, now() + interval '30 days');

alter table grader_submissions
  alter column raw_llm_responses set default '[]'::jsonb,
  alter column review_status set default 'unreviewed',
  alter column purge_after set default (now() + interval '30 days');

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'grader_submissions_review_status_check'
  ) then
    alter table grader_submissions
      add constraint grader_submissions_review_status_check
      check (review_status in ('unreviewed', 'reviewing', 'sent', 'archived'));
  end if;
end $$;

create index if not exists idx_grader_submissions_review_status
  on grader_submissions (review_status, created_at desc);

create index if not exists idx_grader_submissions_purge_after
  on grader_submissions (purge_after);
