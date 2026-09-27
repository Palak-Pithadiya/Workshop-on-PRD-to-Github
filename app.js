const STORAGE_KEY = "sunday-workshop-demo-v1";
const demoPrompt = "Prepare me for tomorrow's client meeting with Contoso. Review the latest emails, meeting notes, previous proposals, and campaign performance. Summarize key points, identify open issues, create a briefing doc, and draft a follow-up email.";
const steps = [
  { title: "Review recent emails", description: "14 messages parsed and prioritized" },
  { title: "Check previous meeting notes", description: "2 meeting notes matched to this account" },
  { title: "Analyze campaign performance", description: "Q3 conversion and regional trends summarized" },
  { title: "Create executive briefing", description: "A one-page meeting brief is ready to review" },
  { title: "Stage follow-up email", description: "Draft prepared; approval required before sending" },
];
const navItems = [
  ["workspace", "space_dashboard", "Workspace"],
  ["live", "motion_play", "Live tasks"],
  ["workflows", "account_tree", "Workflows"],
  ["history", "history", "History"],
];
const appMain = document.querySelector("#app-main");
const toast = document.querySelector("#toast");
let toastTimer;
let executionTimer;
let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.history) && typeof saved.view === "string") {
      if (saved.task?.status === "running") saved.task.status = "paused";
      return saved;
    }
  } catch { /* Start with a clean demo session if storage is unavailable. */ }
  return { view: "workspace", task: null, history: [] };
}

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { showToast("Browser storage is unavailable. This session will not persist after closing the tab."); }
}

function icon(name) {
  return `<span class="material-symbols-rounded" aria-hidden="true">${name}</span>`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function setView(view) {
  state.view = view;
  persist();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function createTask(prompt) {
  if (state.task && state.task.status === "complete") addToHistory(state.task);
  state.task = {
    id: `demo-${Date.now().toString().slice(-6)}`,
    title: prompt.toLowerCase().includes("contoso") ? "Prepare Contoso client meeting" : "Prepare a work briefing",
    prompt,
    email: "Hi Sarah,\n\nLooking forward to our review tomorrow at 10:00 AM. I have summarized the campaign results and pulled together the key discussion points, including the Q4 budget, contract renewal timing, and regional attribution.\n\nThe briefing is attached so we can use our time to align on the open decisions.\n\nBest,\nAanya",
    status: "planned",
    progress: 0,
    step: 0,
    createdAt: new Date().toISOString(),
  };
  state.view = "plan";
  persist();
  render();
}

function addToHistory(task) {
  if (!task || state.history.some((item) => item.id === task.id)) return;
  state.history.unshift({ ...task, completedAt: new Date().toISOString() });
  state.history = state.history.slice(0, 20);
}

function updateNavigation() {
  const activeView = ["plan", "execution", "review", "complete"].includes(state.view) ? "live" : state.view;
  const count = state.task && ["planned", "running", "paused", "review"].includes(state.task.status) ? 1 : 0;
  document.querySelector("#live-count").textContent = String(count);
  document.querySelector("#topbar-view").textContent = ({ workspace: "Workspace", live: "Live tasks", workflows: "Workflows", history: "History", plan: "Task plan", execution: "Live execution", review: "Human review", complete: "Task complete" })[state.view] || "Workspace";
  document.querySelectorAll("[data-view]").forEach((element) => {
    element.classList.toggle("is-active", element.dataset.view === activeView);
    if (element.matches("button")) element.setAttribute("aria-current", element.dataset.view === activeView ? "page" : "false");
  });
}

function connector(name, className = "") {
  return `<span class="connector-pill ${className}"><b></b>${escapeHtml(name)}</span>`;
}

function sourceTile(name, detail, logoClass = "") {
  const initial = ({ Outlook: "O", Teams: "T", OneDrive: "D", "Power BI": "P" })[name] || name[0];
  return `<div class="source-tile"><span class="source-logo ${logoClass}">${initial}</span><span><strong>${name}</strong><small>${detail}</small></span></div>`;
}

function pageHeading(kicker, title, description, meta = "") {
  return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${description}</p></div>${meta ? `<div class="heading-meta">${icon("verified_user")}${meta}</div>` : ""}</div>`;
}

function renderWorkspace() {
  const task = state.task;
  return `${pageHeading("SAMPLE SESSION · APAC GROWTH HUB", "Good morning, Aanya", "Turn a work request into a clear plan, a useful deliverable, and a human-approved next step.", "4 sample sources ready")}
    <div class="workspace-grid">
      <div class="main-stack">
        <section class="panel composer-panel" aria-labelledby="composer-title">
          <div class="panel-heading"><div><h2 id="composer-title">Delegate an outcome</h2><p>Describe the result you need. You stay in control of what gets sent.</p></div><span class="mode-label">LOCAL DEMO</span></div>
          <form id="task-form">
            <div class="composer"><textarea id="task-prompt" maxlength="700" aria-label="Describe the task" placeholder="For example: prepare me for tomorrow's Contoso meeting and draft the follow-up..."></textarea><div class="composer-footer"><div class="composer-tools"><button class="tool-button" type="button" data-action="sample-prompt">${icon("attach_file")} Add context</button><button class="tool-button" type="button" data-action="sample-prompt">${icon("mic")} Voice input</button></div><span class="composer-hint">SYNTHETIC DATA ONLY</span></div></div>
            <div class="composer-actions"><div class="quick-prompts"><button class="quick-prompt" type="button" data-prompt="Prepare me for tomorrow's client meeting with Contoso">Prep a client meeting</button><button class="quick-prompt" type="button" data-prompt="Create an APAC campaign performance digest from the weekly metrics">Draft a campaign digest</button></div><button class="button button-primary" type="submit">${icon("bolt")} Build task plan</button></div>
          </form>
        </section>

        <section class="panel featured-task" aria-labelledby="featured-title">
          <div class="feature-top"><div class="feature-title"><span class="task-orb">${icon("calendar_month")}</span><span><strong>${task ? "Your current task" : "Suggested for tomorrow"}</strong><small>${task ? "Saved in this browser" : "Based on a sample calendar event"}</small></span></div><span class="state-tag"><span class="status-dot"></span>${task ? escapeHtml(task.status.replace("-", " ").toUpperCase()) : "SUGGESTED"}</span></div>
          <h3 id="featured-title">${task ? escapeHtml(task.title) : "Prepare for the Contoso client review"}</h3>
          <p>${task ? escapeHtml(task.prompt) : "Bring recent messages, meeting notes, and campaign results into one concise briefing. The follow-up stays a draft until you approve it."}</p>
          <div class="progress-line"><span style="width:${task ? task.progress : 0}%"></span></div>
          <div class="connector-row">${connector("Outlook")} ${connector("Teams", "teams")} ${connector("OneDrive", "drive")} ${connector("Power BI", "analytics")}</div>
          <div class="feature-bottom"><span class="microcopy">5 STEPS <span aria-hidden="true">·</span> HUMAN CHECKPOINT BEFORE SEND</span><button class="button button-soft" type="button" data-action="open-featured">${task && task.status === "complete" ? "View completed task" : task && task.status === "review" ? "Review task" : task && task.status === "running" ? "View live progress" : task && task.status === "paused" ? "Resume task" : task && task.status === "planned" ? "Review task plan" : "Review suggested plan"} ${icon("arrow_forward")}</button></div>
        </section>

        <section aria-labelledby="suggestions-title"><div class="section-heading"><h2 id="suggestions-title">Suggested workflows</h2><small>DEMO DATA</small></div><div class="suggestion-list">
          <article class="suggestion"><div class="suggestion-copy"><div class="suggestion-meta"><span class="priority-label">TOMORROW · 10:00 AM</span><span class="source-caption">${icon("mail")} 4 sources</span></div><h3>Prepare briefing for Contoso review</h3><p>Synthesize email, meeting notes, and campaign metrics into a one-page prep sheet.</p></div><button class="button button-secondary" type="button" data-action="start-suggested">Review plan ${icon("arrow_forward")}</button></article>
          <article class="suggestion"><div class="suggestion-copy"><div class="suggestion-meta"><span class="frequency-label">WEEKLY RECURRING</span><span class="source-caption">${icon("monitoring")} Power BI</span></div><h3>Draft APAC campaign performance digest</h3><p>Collect regional lead velocity and channel performance for a weekly review.</p></div><button class="button button-secondary" type="button" data-action="start-campaign">Use workflow ${icon("arrow_forward")}</button></article>
          <article class="suggestion"><div class="suggestion-copy"><div class="suggestion-meta"><span class="frequency-label">FINANCE SYNC</span><span class="source-caption">${icon("table_chart")} Excel</span></div><h3>Reconcile Q3 influencer budget</h3><p>Review a synthetic ledger and flag line items for a person to verify.</p></div><button class="button button-secondary" type="button" data-action="finance-workflow">View steps ${icon("arrow_forward")}</button></article>
        </div></section>
      </div>
      <aside class="side-stack" aria-label="Workspace context">
        <section class="panel side-panel"><div class="section-title-line"><h2>Next on your calendar</h2><span class="eyebrow">SAMPLE</span></div><div class="today-event"><span class="event-date">TOMORROW · 10:00 AM SGT</span><strong>Contoso quarterly growth review</strong><p>Sarah Jenkins · 45 minutes · Teams</p></div></section>
        <section class="panel side-panel"><div class="section-title-line"><h2>Available context</h2><a href="#sources" data-action="show-sources">View all</a></div><div class="source-list">${sourceItem("Outlook", "14 sample messages", "")} ${sourceItem("Teams", "2 sample meeting notes", "teams-logo")} ${sourceItem("OneDrive", "3 sample documents", "drive-logo")} ${sourceItem("Power BI", "1 sample report", "excel-logo")}</div></section>
        <section class="trust-panel"><div class="trust-heading">${icon("shield_lock")} Your approval matters</div><p>This demo does not access Microsoft accounts. <strong>No message is sent</strong>; the final email is only a reviewable sample draft.</p></section>
      </aside>
    </div>`;
}

function sourceItem(name, detail, logoClass) {
  const initial = ({ Outlook: "O", Teams: "T", OneDrive: "D", "Power BI": "P" })[name] || name[0];
  return `<div class="source-item"><span class="source-logo ${logoClass}">${initial}</span><span><strong>${name}</strong><small>${detail}</small></span><span class="source-state">SAMPLE</span></div>`;
}

function renderSteps(currentStep = -1, doneThrough = -1, checkpoint = true) {
  return steps.map((step, index) => {
    const status = index <= doneThrough ? "Done" : index === currentStep ? "In progress" : checkpoint && index === 4 ? "Approval" : "Queued";
    const cls = checkpoint && index === 4 ? " step-checkpoint" : "";
    return `<div class="step${cls}${index <= doneThrough ? " is-done" : ""}${index === currentStep ? " is-current" : ""}"><span class="step-index">${index <= doneThrough ? icon("check") : index + 1}</span><div class="step-copy"><strong>${step.title}</strong><p>${step.description}</p></div><span class="step-status">${status.toUpperCase()}</span></div>`;
  }).join("");
}

function renderPlan() {
  if (!state.task) return renderWorkspace();
  return `<div class="view-narrow">${pageHeading("TASK EXECUTION DETAIL", "Review your task plan", "Check the sources and approval point before running this local simulation.", "Approval required before send")}
      <section class="request-box"><div class="request-label">${icon("chat_bubble")} YOUR REQUEST</div><p>“${escapeHtml(state.task.prompt)}”</p></section>
      <section class="plan-summary"><div><h2>Autonomous task plan</h2><p>4 sample sources · 5 steps · estimated demo run: about 5 seconds</p></div><span class="plan-duration">LOCAL SIMULATION</span></section>
      <div class="checkpoint-banner">${icon("policy")} <span><strong>Human checkpoint:</strong> the last step prepares an email draft. This prototype will not send it or connect to Outlook.</span></div>
      <div class="main-stack" style="margin-top:15px"><section><div class="section-heading"><h2>Assigned specialist roles</h2><small>SIMULATED</small></div><div class="agent-row"><span class="agent-chip">${icon("manage_search")} Research <small>sample messages</small></span><span class="agent-chip">${icon("monitoring")} Data analyst <small>sample report</small></span><span class="agent-chip">${icon("edit_document")} Executive writer <small>brief + draft</small></span></div></section>
      <section><div class="section-heading"><h2>Step-by-step plan</h2><small>5 STEPS</small></div><div class="panel step-list">${renderSteps()}</div></section>
      <div class="plan-bottom"><p>Starting will animate a deterministic demo trace. All source names, records, and results are synthetic.</p><div class="view-actions"><button class="button button-secondary" type="button" data-action="back-workspace">Cancel</button><button class="button button-primary" type="button" data-action="start-execution">${icon("play_arrow")} Start execution</button></div></div></div>
    </div>`;
}

function renderExecution() {
  if (!state.task) return renderWorkspace();
  const task = state.task;
  const current = Math.min(task.step, 4);
  const feed = [
    ["check_circle", "Reading sample Outlook messages", task.progress > 5],
    ["check_circle", "Matching meeting notes from Teams", task.progress > 28],
    [task.progress > 50 ? "sync" : "schedule", "Summarizing campaign metrics from Power BI", task.progress > 50],
  ];
  return `<div class="view-narrow">${pageHeading(`LIVE TASK · ${escapeHtml(task.id)}`, task.status === "paused" ? "Execution paused" : "Execution in progress", "A visible, recoverable trace for the work being simulated.")}
      <section class="panel execution-header"><div class="execution-title-row"><div><div class="eyebrow">${task.status === "paused" ? "EXECUTION PAUSED" : "RUNNING STEP " + Math.min(current + 1, 5) + " OF 5"}</div><h1>${escapeHtml(task.title)}</h1><p>Local deterministic demo · no external services</p></div><span class="progress-number">${task.progress}%</span></div><div class="progress-line"><span style="width:${task.progress}%"></span></div><div class="execution-meta"><span>Elapsed · ${Math.max(1, Math.round(task.progress / 18))} sec</span><span>Demo target · under 45 sec</span></div><div class="execution-controls"><button class="button button-secondary" type="button" data-action="toggle-pause">${icon(task.status === "paused" ? "play_arrow" : "pause")} ${task.status === "paused" ? "Resume execution" : "Pause execution"}</button><button class="button button-danger" type="button" data-action="stop-execution">${icon("stop_circle")} Stop task</button></div></section>
      <section class="panel activity-panel" style="margin-top:12px"><div class="activity-heading"><strong>Current activity</strong><span class="live-indicator"><span class="status-dot"></span>${task.status === "paused" ? "PAUSED" : "DEMO TRACE"}</span></div><p class="activity-message">${steps[current].description}. Results are drawn from the sample workspace and are not live data.</p><div class="activity-feed">${feed.map(([glyph, label, complete]) => `<div class="feed-item${!complete && task.status === "running" ? " active" : ""}"><span>${icon(glyph)}<span>${label}</span></span><small>${complete ? "DONE" : task.status === "paused" ? "PAUSED" : "IN PROGRESS"}</small></div>`).join("")}</div></section>
      <section style="margin-top:12px"><div class="section-heading"><h2>Execution plan</h2><small>STRUCTURED TRACE</small></div><div class="panel execution-steps">${renderSteps(task.status === "paused" ? -1 : current, current - 1)}<div class="execution-footer"><span>Demo run ${escapeHtml(task.id)}</span><span>Changes can be stopped or reviewed</span></div></div></section>
      <section class="panel side-panel" style="margin-top:12px"><div class="section-title-line"><h2>Sample context sources</h2><span class="eyebrow">NOT CONNECTED</span></div><div class="source-grid">${sourceTile("Outlook", "14 sample messages")} ${sourceTile("Teams", "2 sample notes", "teams-logo")} ${sourceTile("OneDrive", "3 sample docs", "drive-logo")} ${sourceTile("Power BI", "1 sample report", "excel-logo")}</div></section>
      <div class="trace-note" style="margin-top:12px">${icon("info")}<div><strong>What you see is the audit summary</strong><p>The timeline records user-facing task steps only. This prototype does not expose private model reasoning or call external tools.</p></div></div>
    </div>`;
}

function renderReview() {
  if (!state.task) return renderWorkspace();
  return `<div class="view-narrow">${pageHeading("HUMAN-IN-THE-LOOP REVIEW", "Ready for your sign-off", "Review the sample deliverables. Approval marks the task complete but does not send anything.", "No external action")}
      <section class="completion-banner"><span class="completion-check">${icon("task_alt")}</span><div><h1>Meeting prep is ready to review</h1><p>Briefing and email draft assembled from synthetic workspace examples.</p></div></section>
      <div class="review-grid" style="margin-top:14px"><section class="panel email-card"><div class="email-top"><span class="source-logo">O</span><span><strong>Follow-up email draft</strong><small>LOCAL PREVIEW · NOT CONNECTED TO OUTLOOK</small></span><span class="email-status">APPROVAL REQUIRED</span></div><div class="email-fields"><div class="email-field"><span>To</span><strong>Sarah Jenkins (sample contact)</strong></div><div class="email-field"><span>Subject</span><strong>Briefing &amp; next steps: Contoso growth review</strong></div></div><div class="email-copy"><textarea id="email-draft" aria-label="Edit the sample email draft">${escapeHtml(state.task.email)}</textarea></div><div class="attachment">${icon("description")} Contoso_Exec_Prep.txt · sample briefing</div><div class="review-actions"><button class="button button-secondary" type="button" data-action="save-draft">${icon("edit")} Save edits</button><button class="button button-danger" type="button" data-action="discard-draft">${icon("delete")} Discard draft</button></div></section>
        <section class="panel deliverable-panel"><div class="deliverable-header"><h2>Executive briefing</h2><span class="verified-tag">${icon("verified")} READY</span></div><div class="deliverable-file"><span class="file-icon">${icon("description")}</span><span><strong>Contoso_Exec_Prep.txt</strong><small>One-page sample briefing · generated locally</small></span></div><div class="insight-list"><div class="insight"><strong>Q4 budget scope</strong><p>Confirm the allocation before the next campaign cycle.</p></div><div class="insight"><strong>Renewal timeline</strong><p>Validate the contract date with the account owner.</p></div><div class="insight"><strong>Regional attribution</strong><p>Align on the measurement window for APAC results.</p></div></div><button class="button button-soft button-wide" style="margin-top:11px" type="button" data-action="download-brief">${icon("download")} Download sample briefing</button></section></div>
      <section class="audit-card"><h2>Task activity summary</h2><div class="audit-line">${icon("check_circle")} Read synthetic email and meeting-note summaries.</div><div class="audit-line">${icon("check_circle")} Prepared a draft briefing and an editable email.</div><div class="audit-line">${icon("pause_circle")} Paused before any external communication. Your approval is still required.</div></section>
      <div class="plan-bottom"><p>Approving only records your choice in this browser and opens the completion summary. It will not send, sync, or publish these sample files.</p><div class="view-actions"><button class="button button-secondary" type="button" data-action="revise-task">${icon("tune")} Revise plan</button><button class="button button-success" type="button" data-action="approve-task">${icon("check_circle")} Approve and complete</button></div></div>
    </div>`;
}

function renderComplete() {
  if (!state.task) return renderWorkspace();
  return `<div class="view-narrow">${pageHeading(`TASK COMPLETE · ${escapeHtml(state.task.id)}`, "Your prep package is complete", "The approved demo result is saved to local browser history. No real connector or message was used.")}
      <section class="completion-banner"><span class="completion-check">${icon("check")}</span><div><h1>Contoso meeting prep complete</h1><p>Three sample deliverables ready · completed just now · all data is synthetic</p></div></section>
      <div class="completion-layout"><section class="outcome-list"><div class="section-heading"><h2>Deliverables and outcomes</h2><span class="verified-tag">${icon("verified")} 3 READY</span></div><article class="outcome-item"><div class="outcome-item-top"><span class="file-icon">${icon("description")}</span><h2>Executive briefing</h2></div><p>Key context, open questions, and discussion topics in a concise one-page format.</p><button class="button button-soft" type="button" data-action="download-brief">${icon("download")} Download briefing</button></article><article class="outcome-item"><div class="outcome-item-top"><span class="task-orb">${icon("mail")}</span><h2>Follow-up email draft</h2></div><p>Editable message addressed to a synthetic contact. The draft was not sent.</p><button class="button button-secondary" type="button" data-action="view-email">Review saved draft</button></article><article class="outcome-item"><div class="outcome-item-top"><span class="task-orb">${icon("lightbulb")}</span><h2>Priority discussion points</h2></div><p>Q4 budget scope · contract renewal timing · APAC attribution window.</p></article></section>
        <aside class="panel audit-summary"><h2>Simulated agent activity</h2><div class="agent-audit"><div class="agent-audit-row">${icon("check_circle")} Research role <small>messages + notes</small></div><div class="agent-audit-row">${icon("check_circle")} Data analyst role <small>sample metrics</small></div><div class="agent-audit-row">${icon("check_circle")} Executive writer role <small>brief + draft</small></div></div><div class="trace-note" style="margin-top:13px">${icon("shield_lock")}<div><strong>Approval checkpoint passed</strong><p>Recorded locally. Nothing was sent or synced.</p></div></div></aside></div>
      <div class="reuse-banner"><div><strong>Make this a repeatable workflow</strong><p>Save the task structure as a local demo template for another run.</p></div><button class="button button-primary" type="button" data-action="save-workflow" ${state.savedWorkflow ? "disabled" : ""}>${icon(state.savedWorkflow ? "bookmark_added" : "bookmark_add")} ${state.savedWorkflow ? "Workflow saved" : "Save workflow"}</button></div>
      <div class="plan-bottom"><p>Review and export sample deliverables at any time from this browser.</p><div class="view-actions"><button class="button button-secondary" type="button" data-view="history">${icon("history")} View history</button><button class="button button-primary" type="button" data-action="new-task">New task ${icon("arrow_forward")}</button></div></div>
    </div>`;
}

function renderLive() {
  const task = state.task;
  const active = task && ["planned", "running", "paused", "review"].includes(task.status);
  const title = task ? escapeHtml(task.title) : "No live tasks yet";
  const action = active ? task.status === "review" ? "Continue review" : task.status === "running" || task.status === "paused" ? "View progress" : "Review plan" : "Start sample task";
  return `${pageHeading("TASK MONITOR", "Live tasks", "Review delegated work, inspect progress, or return to a pending approval.")}${active ? `<div class="list-view"><article class="list-card"><span class="task-orb">${icon(task.status === "review" ? "rate_review" : "motion_play")}</span><div class="list-card-copy"><strong>${title}</strong><p>${escapeHtml(task.prompt)}</p></div><div class="list-card-meta"><span>${escapeHtml(task.status.toUpperCase())}</span><span>${task.progress}%</span></div><button class="button button-soft" type="button" data-action="open-featured">${action}</button></article></div>` : `<div class="empty-state">${icon("motion_play")}<h2>No work in flight</h2><p>Your active and approval-required tasks will appear here. Start with the Contoso meeting-prep sample to explore the flow.</p><button class="button button-primary" style="margin-top:14px" type="button" data-action="start-suggested">Review sample plan</button></div>`}`;
}

function renderWorkflows() {
  const savedWorkflow = state.savedWorkflow ? `<section class="panel side-panel" style="margin-bottom:12px"><div class="section-title-line"><h2>Saved in this browser</h2><span class="verified-tag">${icon("bookmark_added")} SAVED</span></div><strong style="font-size:10px">Contoso meeting preparation</strong><p class="muted" style="font-size:9px;line-height:1.5">Your reusable sample task pattern is stored locally.</p><button class="button button-soft" type="button" data-action="start-suggested">Run sample ${icon("arrow_forward")}</button></section>` : "";
  return `${pageHeading("REPEATABLE WORK", "Workflows", "Reusable task patterns for common knowledge-work moments. These examples use synthetic data only.")}${savedWorkflow}
    <div class="workflow-grid"><article class="workflow-card"><span class="task-orb">${icon("calendar_month")}</span><h2>Client meeting preparation</h2><p>Collect relevant context, create a briefing, and stage a follow-up for review.</p><div class="connector-row">${connector("Outlook")} ${connector("Teams", "teams")} ${connector("OneDrive", "drive")}</div><button class="button button-soft" type="button" data-action="start-suggested">Run sample ${icon("arrow_forward")}</button></article><article class="workflow-card"><span class="task-orb">${icon("monitoring")}</span><h2>APAC campaign digest</h2><p>Turn a weekly performance snapshot into a concise team update.</p><div class="connector-row">${connector("Power BI", "analytics")} ${connector("Teams", "teams")}</div><button class="button button-secondary" type="button" data-action="start-campaign">Run sample ${icon("arrow_forward")}</button></article><article class="workflow-card"><span class="task-orb">${icon("account_balance")}</span><h2>Budget discrepancy check</h2><p>Compare sample ledger entries and identify items that need human verification.</p><div class="connector-row">${connector("Excel", "analytics")} ${connector("OneDrive", "drive")}</div><button class="button button-secondary" type="button" data-action="finance-workflow">Review steps ${icon("arrow_forward")}</button></article><article class="workflow-card"><span class="task-orb">${icon("add")}</span><h2>Build from a prompt</h2><p>Describe a small, bounded task and create a one-time demo plan.</p><div class="connector-row"><span class="connector-pill">YOUR REQUEST</span></div><button class="button button-secondary" type="button" data-view="workspace">Write a task ${icon("arrow_forward")}</button></article></div>`;
}

function renderHistory() {
  if (!state.history.length) return `${pageHeading("LOCAL BROWSER STORAGE", "Task history", "Completed sample runs are saved only in this browser until you clear demo data.")}
    <div class="empty-state">${icon("history")}<h2>Your history is empty</h2><p>When you approve a sample task, its local completion record will appear here.</p><button class="button button-primary" style="margin-top:14px" type="button" data-action="start-suggested">Explore sample task</button></div>`;
  return `${pageHeading("LOCAL BROWSER STORAGE", "Task history", "Completed sample runs are stored in this browser. Clear demo data from the sidebar to remove them.")}<div class="history-filter"><span>${state.history.length} saved ${state.history.length === 1 ? "run" : "runs"}</span><span>SYNTHETIC DEMO RECORDS</span></div><div class="list-view">${state.history.map((task) => `<article class="list-card"><span class="task-orb">${icon("task_alt")}</span><div class="list-card-copy"><strong>${escapeHtml(task.title)}</strong><p>${escapeHtml(task.prompt)}</p></div><div class="list-card-meta"><span>COMPLETE</span><span>${new Date(task.completedAt).toLocaleDateString()}</span></div><button class="button button-secondary" type="button" data-action="reopen-history" data-task-id="${escapeHtml(task.id)}">Inspect</button></article>`).join("")}</div>`;
}

function renderMobileNav() {
  return navItems.map(([view, glyph, label]) => `<button type="button" class="nav-item" data-view="${view}">${icon(glyph)}<span>${label}</span>${view === "live" ? `<span class="nav-count">${state.task && ["planned", "running", "paused", "review"].includes(state.task.status) ? 1 : 0}</span>` : ""}</button>`).join("");
}

function render() {
  const page = ({ workspace: renderWorkspace, plan: renderPlan, execution: renderExecution, review: renderReview, complete: renderComplete, live: renderLive, workflows: renderWorkflows, history: renderHistory })[state.view] || renderWorkspace;
  appMain.innerHTML = page();
  document.querySelector("#mobile-nav").innerHTML = renderMobileNav();
  updateNavigation();
}

function openCurrentTask() {
  if (!state.task) { createTask(demoPrompt); return; }
  if (state.task.status === "complete") state.view = "complete";
  else if (state.task.status === "review") state.view = "review";
  else if (state.task.status === "running" || state.task.status === "paused") state.view = "execution";
  else state.view = "plan";
  persist();
  render();
}

function startExecution() {
  if (!state.task) return;
  window.clearInterval(executionTimer);
  state.task.status = "running";
  state.task.progress = 2;
  state.task.step = 0;
  state.view = "execution";
  persist();
  render();
  executionTimer = window.setInterval(() => {
    if (!state.task || state.task.status !== "running") return;
    state.task.progress = Math.min(90, state.task.progress + 18);
    state.task.step = Math.min(4, Math.floor(state.task.progress / 20));
    if (state.task.progress >= 90) {
      window.clearInterval(executionTimer);
      state.task.status = "review";
      state.view = "review";
      showToast("The sample task is ready for your review.");
    }
    persist();
    render();
  }, 900);
}

function togglePause() {
  if (!state.task) return;
  if (state.task.status === "running") {
    window.clearInterval(executionTimer);
    state.task.status = "paused";
  } else if (state.task.status === "paused") {
    state.task.status = "running";
    executionTimer = window.setInterval(() => {
      if (!state.task || state.task.status !== "running") return;
      state.task.progress = Math.min(90, state.task.progress + 18);
      state.task.step = Math.min(4, Math.floor(state.task.progress / 20));
      if (state.task.progress >= 90) {
        window.clearInterval(executionTimer);
        state.task.status = "review";
        state.view = "review";
        showToast("The sample task is ready for your review.");
      }
      persist();
      render();
    }, 900);
  }
  persist();
  render();
}

function stopExecution() {
  window.clearInterval(executionTimer);
  if (state.task) state.task.status = "stopped";
  state.view = "live";
  persist();
  render();
  showToast("Task stopped. No external actions were taken.");
}

function approveTask() {
  if (!state.task) return;
  const email = document.querySelector("#email-draft");
  if (email) state.task.email = email.value;
  state.task.status = "complete";
  state.task.progress = 100;
  addToHistory(state.task);
  state.view = "complete";
  persist();
  render();
  showToast("Approval recorded locally. Nothing was sent.");
}

function downloadBrief() {
  const text = `CONTOSO MEETING BRIEF\n\nPrepared for: Contoso quarterly growth review\nMeeting: Tomorrow, 10:00 AM SGT\n\nKEY DISCUSSION POINTS\n- Confirm Q4 budget scope before the next campaign cycle.\n- Validate contract renewal timing with the account owner.\n- Align on the measurement window for APAC attribution.\n\nFOLLOW-UP\nReview the open decisions with Sarah Jenkins.\n\nThis sample document was generated by the Sunday Workshop local prototype. All data is synthetic.`;
  const file = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Contoso-Executive-Brief-SAMPLE.txt";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Sample briefing downloaded.");
}

function startCampaign() {
  createTask("Create an APAC campaign performance digest from the weekly metrics. Highlight regional changes, open questions, and a short update for the team.");
}

function clearData() {
  if (!window.confirm("Clear saved demo tasks and local history from this browser?")) return;
  window.clearInterval(executionTimer);
  localStorage.removeItem(STORAGE_KEY);
  state = { view: "workspace", task: null, history: [] };
  render();
  showToast("Local demo data cleared.");
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) { event.preventDefault(); setView(viewButton.dataset.view); return; }
  const promptButton = event.target.closest("[data-prompt]");
  if (promptButton) {
    const field = document.querySelector("#task-prompt");
    field.value = promptButton.dataset.prompt;
    field.focus();
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "start-suggested") createTask(demoPrompt);
  if (action === "start-campaign") startCampaign();
  if (action === "open-featured") openCurrentTask();
  if (action === "start-execution") startExecution();
  if (action === "toggle-pause") togglePause();
  if (action === "stop-execution") stopExecution();
  if (action === "back-workspace") setView("workspace");
  if (action === "approve-task") approveTask();
  if (action === "save-draft") {
    const email = document.querySelector("#email-draft");
    if (email && state.task) { state.task.email = email.value; persist(); showToast("Draft saved in this browser."); }
  }
  if (action === "discard-draft") {
    if (window.confirm("Discard this sample email draft? The briefing will remain available.")) { state.task.email = "[Sample email draft discarded by user.]"; persist(); render(); showToast("Sample draft discarded."); }
  }
  if (action === "revise-task") { state.task.status = "planned"; state.view = "plan"; persist(); render(); }
  if (action === "download-brief") downloadBrief();
  if (action === "save-workflow") { state.savedWorkflow = true; persist(); render(); showToast("Workflow saved in this browser."); }
  if (action === "new-task") { state.task = null; setView("workspace"); }
  if (action === "view-email") { state.view = "review"; render(); }
  if (action === "clear-data") clearData();
  if (action === "show-sources") showToast("All listed sources are sample labels, not live connections.");
  if (action === "finance-workflow") showToast("Budget reconciliation is a design sample and is not implemented yet.");
  if (action === "sample-prompt") showToast("File and voice inputs are visual placeholders in this prototype.");
  if (action === "reopen-history") {
    const record = state.history.find((item) => item.id === actionButton.dataset.taskId);
    if (record) { state.task = { ...record, status: "complete", progress: 100 }; state.view = "complete"; persist(); render(); }
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "task-form") return;
  event.preventDefault();
  const prompt = document.querySelector("#task-prompt").value.trim();
  if (!prompt) { showToast("Describe the outcome you need first."); document.querySelector("#task-prompt").focus(); return; }
  createTask(prompt);
});

render();