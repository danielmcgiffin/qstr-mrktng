# Process Grader Spec

## Goal
The tool is a lead-gen applet. Users can upload docs and get a letter grade inline + full diagnostic emailed within 24 hours.

## User flow
1. /grader - landing + form (paste textarea OR file upload, email required)
2. Submit -> sends the input to my email where I can grade it, send them back their version, their grade, and what I'd do if I were them.
3. Report Received -> User can check out Quaestor or set up a call.

## Constraints
- No site storage of docs, only in my email for now.
- Max paste length: 50k chars
- Max upload size: 5MB, PDF/docx/txt/md only
- Privacy copy MUST appear above submit button
