# Project Plan

This plan tracks the portfolio prototype against the Sunday Workshop PRD. The static demo is implemented; this roadmap separates tested local interactions from future connector-backed product work.

## Delivered

- Responsive static workspace and navigation across Workspace, Live tasks, Workflows, and History.
- Prompt-to-plan flow, five-step simulated execution, pause/resume/stop controls, and safe recovery as paused after refresh.
- Human review of an editable draft; approval records a local completion and does not send the message.
- Downloadable synthetic briefing, browser-local history, a locally saved workflow pattern, and a clear-data control.
- README setup guidance and supplied design references copied into `assets/screens/`.

## Remaining For Portfolio Release

- Capture screenshots of the implemented application at desktop and mobile sizes.
- Add automated browser coverage for the complete happy path, stop/retry behavior, refresh recovery, and history reset.
- Run a small usability session and record task completion, prompt count, and timings with conditions and sample size.
- Select and add a repository license before inviting reuse or contributions.
- Choose one hosting target and verify the published static site.

The application does not currently have a backend, live Copilot/agent runtime, Microsoft connector, voice input, file upload, or dynamic task-specific generation.

## Next Milestones

1. Capture screenshots of the implemented app at desktop and mobile sizes, using only synthetic content. Keep them distinct from the supplied Stitch references.
2. Add browser automation for the main task flow, pause/resume/stop, refresh recovery, approval, history restore, workflow save, and clear-data behavior.
3. Run a small usability session. Record the task, participant count, completion rate, follow-up count, and generation time; do not present a small demo test as commercial adoption or retention evidence.
4. Select and add a repository license before inviting reuse or contributions.
5. Publish the static site and verify the GitHub Pages URL from a clean browser session.

## Acceptance Criteria For Portfolio Release

- A reviewer can open or host `index.html` without installing dependencies.
- The core flow works at desktop and mobile sizes, including task restoration after refresh.
- The downloadable result, local persistence, and approval behavior match the README.
- Screenshots show the implemented prototype and use synthetic content; reference screens are labeled as references.
- The README distinguishes implemented behavior, simulation, and future work.
- License and hosting choices are explicit.

## Future Product Work

- Replace the fixed demonstration with task-specific planning and output generation, backed by a defined evaluation rubric.
- Design and implement real connectors only after permissions, consent, data retention, threat model, and recovery behavior are specified.
- Define user-visible action summaries and audit records; do not expose hidden internal reasoning.
- Clarify the PRD's 5,000-8,000-token target, 45-second timing boundary, target persona, and 3-4 interaction definition.
- Verify any encryption claim against an actual threat model and implementation; browser `localStorage` is not encrypted storage.

## Risks And Dependencies

- Real Microsoft application access, connector APIs, and agent orchestration need services and permissions not present in this static public demo.
- The current task steps and deliverables are deterministic sample content, not generated from arbitrary prompt semantics.
- Browser-local persistence is inappropriate for sensitive content on shared devices and is not a production privacy boundary.