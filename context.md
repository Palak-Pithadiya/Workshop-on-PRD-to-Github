# Project Context

## Project

**Working name:** Sunday Workshop

Sunday Workshop is a portfolio prototype exploring how Microsoft Copilot could help people complete useful, repeatable work from a natural-language request. The product concept is an assistant embedded in the user's current Microsoft application, not a new destination that asks them to switch apps.

The repository contains the source PRD, the supplied Stitch screen exports, and a dependency-free static web prototype. The UI and local interactions are implemented; connectors, source records, orchestration, and outputs are simulated. Any portfolio presentation must distinguish the prototype from a real Microsoft integration.

## Problem

People can try Copilot without making it part of their everyday work. The opportunity described by the PRD is to move beyond experimentation: help a user complete a meaningful task, make the result easy to use in their existing workflow, and encourage repeat use that builds toward more agentic capabilities.

## Product Direction

Represent the experience as an in-context Copilot workspace. A user describes a task by typing, reviews the proposed outcome, and follows its progress to a sample artifact or draft. The interface should keep the user oriented and in control without implying that real Microsoft application access or autonomous agents are available when they are not.

### Goals

- Increase the number of tasks successfully completed with Copilot across Microsoft applications.
- Improve the success rate of tasks users request through Copilot.
- Make a first meaningful task easy to complete and establish a repeatable workflow.

### Out of Scope

- Building a new standalone destination for completing real Copilot tasks. A standalone prototype is acceptable only as a demonstrator of an experience intended to live inside an existing app.
- Requiring users to switch applications to finish a supported task.
- Video-creation workflows in the initial phase.
- Claiming production Microsoft 365 connectors, real multi-agent orchestration, or account-backed Copilot access unless these are implemented and verified.

## Priorities From the PRD

1. **P0 - End-to-end intelligent execution:** understand a goal, coordinate the steps, and produce a completed result across the represented workflow.
2. **P1 - Connected context and multi-agent orchestration:** use relevant context across applications and coordinate specialized capabilities for complex tasks.
3. **P2 - Transparent and controllable execution:** show task status, explain actions at a useful level, and provide user control.

For the portfolio MVP, prioritize one narrow, demonstrable task from prompt to usable output. Make execution state visible because it supports trust and makes the prototype legible; defer cross-application orchestration until a real connector-backed core flow is designed.

## Core User Flow

1. User enters a work request in the in-context task pane.
2. The system identifies the intended task and any missing required information; avoid unnecessary follow-up prompts.
3. The user can review or correct the proposed action before consequential steps.
4. The system runs the task and presents clear progress, completion, or a recoverable error.
5. The user reviews the result and exports or reuses it in an appropriate format, such as a document or email draft.
6. The task and its useful context can be restored and run again without losing the conversation.

## Requirements

### Functional

- Accept typed task prompts. The current demo stores the text but does not interpret it; voice and file input controls are placeholders.
- Turn a request into an executable task with limited handholding.
- Simulate the task and produce a fixed sample result, with a downloadable text brief and editable email draft.
- Support repeatable task patterns through agents or reusable workflows as the implementation matures.
- Let a user recover, restore, and rerun a conversation with its relevant context.

### Non-functional Targets

Treat these as PRD targets to validate, not achievements of the current repository:

- **Performance:** complete output generation within 45 seconds for the supported task and tested conditions.
- **Quality:** the PRD specifies 5,000-8,000 response tokens unless requested otherwise. Confirm whether this means model output, task capacity, or another measure before implementing; it is not a sensible default length for ordinary UI responses.
- **Reliability:** recover and rerun chats without losing task context.
- **Security and privacy:** keep user data on the user's device; send it elsewhere only with explicit authorization. The PRD also calls for end-to-end encryption. A local-only prototype can demonstrate local persistence, but cannot claim end-to-end encryption or production security without a defined threat model and verified implementation.
- **Transparency:** provide a recoverable execution log, task status, and concise explanations of actions. Interpret the PRD's request for a user-visible "chain of thought" as actionable progress and decision summaries, not hidden internal reasoning.
- **Usability:** complete supported tasks in approximately 3-4 prompt interactions.

## Success Measures

- **North Star:** month-over-month growth in commercial Copilot adoption and usage.
- **Leading indicators:** users completing a first meaningful Copilot task; average successfully completed tasks per active user.
- **Counter-metrics:** initiated-task drop-off rate and 30-day user inactivation rate.

For a portfolio prototype, report only what can actually be measured in a local usability test. Do not present prototype interaction counts as evidence of commercial adoption or retention.

## Current Prototype

- **Target persona:** Aanya Sharma, a fictional APAC marketing lead.
- **Demonstrated workflow:** prepare for a Contoso client review using synthetic email, meeting, file, and campaign context.
- **Stack:** static HTML, CSS, and JavaScript; no build or runtime dependencies.
- **Persistence:** task state, history, and the saved workflow pattern in browser `localStorage`; reset is available in the sidebar.
- **Handoff:** download a sample `.txt` briefing. The email is an editable local preview and is never sent.
- **Visual reference:** Stitch screen exports and a Fluent-inspired visual system are included in the repository.

## Assumptions and Decisions To Resolve

- The current interface is a standalone portfolio demonstrator of an experience intended to be embedded in a host application; it is not a working Copilot task pane.
- Arbitrary prompt text is accepted, but the plan and output are fixed sample content rather than task-specific AI generation.
- The PRD names DOCX, Canva, email, and other connector tools as possible outputs; genuine integrations and their permissions are not defined.
- Browser-local persistence is not encrypted. Production storage, threat model, authentication, and consent flows require separate design.
- The 5,000-8,000-token response requirement, visible reasoning wording, target user research, and success rubric need clarification before a production build.

## Source

This context is derived from `PRD - Sunday Workshop.docx`. If implementation choices conflict with it, document the trade-off here and update the plan before expanding scope.