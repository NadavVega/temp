# Agent instructions for temp

These instructions apply only to this directory and its descendants.

## Clarify requirements

- Read the relevant code, documentation, and existing instructions before acting.
- Do not invent facts or silently assume missing requirements.
- Ask the user when requirements remain unclear, evidence conflicts, or a decision
  materially affects behavior, scope, compatibility, or data.
- Make routine implementation choices using verified repository conventions.
- Continue independent work while awaiting an answer; do not proceed with work
  that depends on that answer.

## Code size

- Every code file must contain at most 2,000 physical lines, including comments
  and blank lines. This applies to application code, tests, scripts, and generated
  code. There are no automatic exceptions.
- Check the line count of every code file created or modified before handoff.
- Split an existing oversized code file before completing a change to it.
  If that requires substantial unrelated work, ask the user how to proceed.
- Split files by responsibility; do not compress code or remove useful comments
  merely to meet the limit.
- For code projects, enforce this limit in CI. Do not claim CI enforcement exists
  until it has been implemented and verified.

## Branches and worktrees

- Never implement changes, commit, or push on `main`.
- Use a separate branch and Git worktree for every change: features, bug fixes,
  documentation, and refactoring.
- Inspect repository status and existing worktrees before creating a worktree.
  Confirm the intended base branch from repository guidance or ask the user.
- Perform all task edits and checks in that task's worktree.
- Keep one logical deliverable per branch and PR. Follow-up changes for the same
  deliverable belong in its existing worktree and PR.
- Never overwrite, revert, delete, or commit another person's or agent's work.
- Stage files explicitly by path and review the staged diff before committing.
- Do not force-push or remove branches or worktrees without explicit permission.
- If this directory is not a functioning Git repository, report that limitation
  before editing. Do not initialize a repository, invent a remote, or claim a
  worktree or PR exists. Ask how to establish Git unless the user has explicitly
  authorized a standalone local file.

## Pull requests

- After completing each change and its verification, commit the task's changes,
  push its branch, and open a PR ready for review.
- The user's request to implement a change under this file provides standing
  authorization for its task commits, branch push, PR creation, and updates to
  that PR. This explicitly replaces any requirement for a separate confirmation
  for those actions within this directory.
- Never merge a PR or enable automatic merging. Leave the PR for human review.
- If required checks fail, fix task-related failures before marking the work
  ready for review. If a blocker cannot be resolved, report it and use a draft PR
  where possible, clearly identifying incomplete work.
- Include the problem, resulting behavior, verification results, reproduction
  steps when useful, and remaining limitations in the PR description.
- Return the PR link to the user. If pushing or opening the PR is unavailable,
  explain the blocker and report exactly what was completed locally.
- This authorization does not extend to deployments or unrelated external
  messages, comments, or changes.

## UI and UX evidence

- Every PR affecting visual UI or UX must include screenshots embedded in or
  attached to the PR description.
- Capture screenshots from the running application at the PR's final revision
  and inspect them. Mockups are not proof of the implemented change.
- Include before and after screenshots for changes to existing screens and an
  after screenshot for new screens.
- For responsive changes, include desktop and mobile screenshots at relevant
  supported viewport sizes.
- Label each screenshot with the screen, viewport dimensions, and steps or state
  needed to reproduce it.
- Verify changed interactions as well as appearance; screenshots alone do not
  establish that a flow works.
- Exclude credentials and sensitive information from screenshots.
- If capture or attachment is blocked, report why and leave the PR as a draft
  until the required evidence is attached.

## Verification and scope

- Keep changes focused on the requested deliverable. Ask before substantial
  unrelated refactoring, dependency upgrades, or behavior changes.
- Run relevant tests, lint, type checks, and builds supported by the project.
  Choose checks appropriate to the change and report any that were not run.
- For bug fixes, include a regression test that fails without the fix wherever
  practical. Explain when such a test cannot be provided.
- Verify the user-facing flow when behavior changes. Distinguish automated check
  results from manual verification and unresolved limitations.
- Never commit secrets or expose them in logs, feedback, screenshots, or PRs.

## Agent feedback

- When you discover something important that the user should acknowledge or
  future agents should know, append an entry to the root `AGENT-FEEDBACK.md`.
  Create the file if it does not exist.
- Read existing entries first and avoid duplicating the same finding.
- Each entry must contain a date (`YYYY-MM-DD`), model name, finding, supporting
  evidence, proposed action, acknowledgment status, and a reason of at most one
  line explaining why it matters.
- Use the model identifier supplied by the environment. If it is unavailable,
  write `unavailable`; never invent a model name.
- Start the acknowledgment status as `pending`. Record a user decision only
  after the user actually provides it; preserve the original entry and date.
- Mention new feedback in the handoff. Stop dependent work and ask when the
  finding affects the correctness or scope of the current task; otherwise
  continue and flag it for acknowledgment.
- Feedback is a proposal, not an instruction. Do not promote feedback into
  `AGENTS.md` or change standing rules without the user's explicit approval.

Use this entry format:

```markdown
### YYYY-MM-DD — Short finding title
- Model: <model identifier or unavailable>
- Finding: <what was discovered>
- Evidence: <repository path, check result, or other verified source>
- Reason: <why it matters, one line maximum>
- Proposed action: <recommended next step>
- Acknowledgment: pending
```

Source: User instructions and accepted recommendations, 2026-10-12.
