# CHANGELOG

## [Unreleased] — feat/input-engine-ui

### Added — Design System
- **`globals.css`** — Complete neo-brutalist design system aligned with hermes-classmate-webpage reference
  - Bricolage Grotesque (headings) + DM Sans (body) Google Fonts
  - Updated color palette: `#FFF9EF`, `#FFD84D`, `#FF6B9D`, `#4DA6FF`, `#7BE495`, `#FF8A3D`, `#A78BFA`
  - `border-4` thick borders, solid 0-blur shadows (`2px–16px` offsets), rounded corners
  - Chunky scrollbar, selection highlight, background patterns (`grid-bg`, `dot-bg`)
  - CSS classes for cards, buttons, inputs, selects, textareas, checkboxes, tags, badges, stepper, toasts, sidebar, topbar, layout, stats, empty states, skeletons, sliders, animations

### Added — UI Components (`src/components/ui/`)
| Component | File | Purpose |
|-----------|------|---------|
| `NeoInput` | `neo-input.tsx` | Accessible text input with label, error, and helper text |
| `NeoSelect` | `neo-select.tsx` | Custom dropdown with options array and placeholder |
| `NeoTextarea` | `neo-textarea.tsx` | Textarea with character count and voice-input slot |
| `NeoTagInput` | `neo-tag-input.tsx` | Tag/pill input for concepts, misconceptions, support needs |
| `NeoBadge` | `neo-badge.tsx` | Status badges for workflow/entity states |
| `NeoStepper` | `neo-stepper.tsx` | Step indicator for multi-step wizard forms |
| `ToastProvider` | `neo-toast.tsx` | Toast notifications with auto-dismiss and slide animation |

### Added — Shell (`src/components/shell/`)
| Component | File | Purpose |
|-----------|------|---------|
| `Sidebar` | `sidebar.tsx` | Fixed sidebar with navigation sections, active link detection, mobile toggle |
| `Topbar` | `topbar.tsx` | Top bar with dynamic breadcrumbs, Wispr Flow surface, teacher avatar |

### Added — Infrastructure
- **`convex-provider.tsx`** — Convex client wrapper with graceful fallback when `NEXT_PUBLIC_CONVEX_URL` is not set
- **`layout.tsx`** (root) — Updated metadata, fonts
- **`dashboard/layout.tsx`** — Dashboard layout combining sidebar + topbar + Convex + toast providers

### Added — Pages
| Route | File | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | Redirects to `/dashboard` |
| `/dashboard` | `dashboard/page.tsx` | Teacher dashboard with stat cards, quick actions, activity feed |
| `/dashboard/classes` | `classes/page.tsx` | Class list with inline create form |
| `/dashboard/classes/[classId]` | `classes/[classId]/page.tsx` | Class detail with student roster, add-student form with tag inputs |
| `/dashboard/assessments` | `assessments/page.tsx` | Assessment list with status badges and action buttons |
| `/dashboard/assessments/new` | `assessments/new/page.tsx` | 5-step assessment builder wizard (Input Engine UI) |
| `/dashboard/assessments/[id]/submit` | `assessments/[assessmentId]/submit/page.tsx` | Student answer submission with question/rubric display |
| `/dashboard/demo` | `demo/page.tsx` | Full demo flow (moved from root `page.tsx`) |
| `/dashboard/planner` | `planner/page.tsx` | Weekly planner with sticky-note rotation effects |

### Changed
- **`page.tsx`** (root) — Replaced static demo page with redirect to `/dashboard`; original demo preserved at `/dashboard/demo`

### Architecture Notes
- All pages use **local state** — ready to plug into Convex once schema is provided
- Assessment wizard validates using **`assessmentPlanSchema`** from `src/lib/input-engine.ts`
- All interactive elements include **`data-testid`** attributes per design guidelines
- All UI follows the **neo-brutalist** design language from the hermes-classmate-webpage reference repo
- No Convex schema modifications were made (waiting for user-provided schema)
