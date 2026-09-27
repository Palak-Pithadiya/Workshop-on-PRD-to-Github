---
name: Fluent Autonomous Orchestration
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#0060ab'
  on-secondary: '#ffffff'
  secondary-container: '#4ca0ff'
  on-secondary-container: '#003664'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d3e3ff'
  secondary-fixed-dim: '#a3c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.025em
  caption:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-lg: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system translates Microsoft’s enterprise design philosophy—Fluent 2—into an autonomous task execution experience for mobile executives and knowledge workers. The aesthetic prioritizes institutional trust, intellectual clarity, and reliable productivity over speculative AI flashiness. The interface deliberately avoids glowing sci-fi neon aesthetics, oversized psychedelic gradients, and unpredictable floating chrome. Instead, it projects the quiet precision of an executive dashboard.

The emotional baseline is composure under complexity. Autonomous multi-agent operations (delegated research, spreadsheet consolidation, cross-tenant file synchronization, draft generation) are presented through structured progressive disclosure, clear state ownership, and deterministic checkpoints. Visual feedback emphasizes accountability: human-in-the-loop review nodes feel deliberate, multi-agent delegation traces are transparent, and enterprise boundaries are reaffirmed at every viewport.

## Colors

The palette establishes hierarchical separation between platform identity, autonomous activity, Microsoft 365 ecosystem sources, and operational validation.

- **Primary (`#4F46E5` / `#6366F1`)**: Copilot Agentic Purple. Used for proactive intelligence markers, autonomous execution status rings, prompt affordances, and active agent threads.
- **Secondary (`#0078D4`)**: Microsoft 365 Core Blue. Anchors standard enterprise operations, primary user controls, navigation anchors, and ecosystem provenance.
- **Tertiary / Semantic Success (`#10B981`)**: Task completed, verification certified, and automated pipeline passed.
- **Semantic Amber (`#F59E0B`)**: Human-in-the-loop approval required, execution paused, or tenant authorization check pending.
- **Semantic Rose (`#EF4444`)**: Execution exception, token timeout, or permission blocked.
- **Surfaces & Backgrounds**: Base canvas relies on `#F8FAFC` (Slate 50) to mitigate pure-white eye strain on mobile OLED panels, while interactive cards and floating sheets utilize pure `#FFFFFF` (White) framed by crisp `#E2E8F0` (Slate 200) borders.
- **M365 Source Badging**:
  - Outlook: `#0078D4`
  - Teams: `#6264A7`
  - OneDrive: `#0067B8`
  - Excel: `#107C41`
  - Word: `#185ABD`
  - SharePoint: `#038387`

## Typography

The typography system relies on **Inter** to ensure geometric rhythm, neutral rendering, and parity with native system fonts across iOS and Android builds running Fluent 2. 

- Numeric telemetry, execution timestamps, agent token throughputs, and confidence metrics rely on tabular figures (`font-variant-numeric: tabular-nums`) to prevent jittering during real-time streaming updates.
- Headline weights strictly cap at 700 to prevent visual over-saturation within high-density mobile cards.
- Line heights maintain a minimum 1.4x factor to ensure glanceable scanning while walking or multi-tasking on handheld devices.
- `label-sm` and `caption` styles are tuned for agent telemetry, system attribution breadcrumbs, and permission metadata tags.

## Layout & Spacing

The layout is built for hand-held, one-thumb mobile ergonomic efficiency using a fluid vertical stack anchored to safe-area boundaries.

- **Grid & Canvas**: Layouts conform to a 4-column fluid mobile grid with `16px` (`1rem`) outer margins and `16px` gutters. When rendering split-agent diff views or lateral comparisons, the grid collapses into side-scrolling cards with continuous snap points.
- **Vertical Rhythm**: Spacing operates on an 8pt base grid with a 4pt sub-grid for badge insets and micro-alignments (`space-xs`: 4px, `space-sm`: 8px, `space-md`: 12px, `space-lg`: 16px, `space-xl`: 24px).
- **Thumb-Zone Architecture**: High-frequency human-in-the-loop interactions (Approve, Intervene, Reject, Delegate Input) anchor to the bottom 38% of the viewport. Interactive triggers never sit in the top 15% header zone, which is reserved strictly for tenant status, agent status badges, and contextual source telemetry.

## Elevation & Depth

Elevation conveys the level of autonomy and system intervention needed. Rather than thick drop shadows, this design system combines low-opacity ambient drop shadows with crisp border definitions (`#E2E8F0` at 1px) to evoke physical enterprise paper and translucent glass layers.

- **Level 0 (Flat Canvas)**: `#F8FAFC`. Base view plane. Zero shadow.
- **Level 1 (Execution Cards & Accordions)**: `#FFFFFF` surface, `0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)`, bordered by `1px solid #E2E8F0`. Used for task logs, multi-agent status tiles, and passive telemetry.
- **Level 2 (Active Agent Pulse & Approvals)**: `#FFFFFF` surface, `0 4px 6px -1px rgba(79, 70, 229, 0.08), 0 2px 4px -2px rgba(79, 70, 229, 0.04)`, bordered by `1px solid #CBD5E1`. Used for active tasks and human approval review blocks.
- **Level 3 (Modal Execution Sheets & Decision Bottom Sheets)**: `#FFFFFF` surface with an iOS/Android native blur scrim (`backdrop-filter: blur(12px)` over a 30% alpha neutral fill), elevated by `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`.

## Shapes

The geometric structure balances Fluent 2's signature softness with clean enterprise architecture.

- **Container Surfaces (Task Cards, Orchestration Modules)**: Standardized to `16px` (`rounded-lg`) up to `20px` for top-level focal cards, avoiding hyper-rounded pill styling on structural elements to retain informational density.
- **Interactive Micro-Surfaces**: Chips, contextual filters, and Microsoft 365 source badges use `6px` to `8px` corner radii to clearly contrast with round agent status avatars.
- **Agent Avatars & Action Pills**: Multi-agent indicators (e.g., Research Agent, Writing Agent, Data Analysis Agent) and approval buttons utilize complete pill shapes (`9999px`) to immediately signal interactive, click-to-inspect affordances.

## Components

### Buttons & Interactive Delegation Inputs
- **Primary Action (Approve / Execute)**: Solid fill `#4F46E5` (or `#0078D4` for standard tenant workflows), text `#FFFFFF`, height `48px` to guarantee minimum touch targets. 12px border radius.
- **Secondary Action (Intervene / Edit Scope)**: Surface `#FFFFFF`, border `1px solid #CBD5E1`, text `#0F172A`. Active state renders subtle background `#F1F5F9`.
- **Destructive / Abort (Reject Task)**: Surface `#FEF2F2`, border `1px solid #FECACA`, text `#DC2626`.
- **Delegation Input Bar**: Fixed bottom-docked card with integrated voice/text capture, token counters, and quick-prompt chips.

### Multi-Agent Orchestration Badges
- **Agent Identity Pills**: Standard `24px` height, featuring a `14px` agent icon, an agent name in `label-sm`, and an execution dot indicator.
  - *Research Agent*: Light Slate background (`#F1F5F9`), text `#334155`.
  - *Data Analysis Agent*: Light Emerald background (`#ECFDF5`), text `#065F46`.
  - *Writing Agent*: Light Violet background (`#EEF2FF`), text `#3730A3`.
- **Status Indicators**:
  - *Completed*: Static Emerald icon checkmark (`#10B981`).
  - *In-Progress*: Smooth 1.5s breathing pulse border using `#6366F1` with ambient ring expansion.
  - *Attention*: Steady Amber warning beacon (`#F59E0B`).

### Microsoft 365 Source Micro-Badges
- Miniature source pills (`height: 20px`) placed alongside agent findings to cite information origins.
- Composed of an authentic app icon mark (Outlook, Teams, OneDrive, Excel) followed by the specific asset title (e.g., "Q3_Forecast.xlsx"), capped at 140px width with ellipsis truncation.

### Human-in-the-Loop Approval Banners
- Prominent container placed directly above the bottom action bar.
- Uses `#FFFBEB` (Amber 50) background, `1.5px solid #FCD34D`, with an alert header detailing the threshold crossed (e.g., *"Agent requests permission to update 4 rows in 'Budget.xlsx' and send 1 email via Outlook"*). Includes side-by-side diff previews.

### Cards & Progressive Disclosure Accordions
- Top-level cards highlight the overarching autonomous objective, accompanied by an interactive nested step log.
- Steps fold into an accordion showing: *Timestamp | Sub-Agent | Micro-action completed*. Expanding reveals tool calls, raw retrieved context, and citation links.