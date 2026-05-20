# Plan: Comprehensive README.md for JD Platform

Replace the current boilerplate `README.md` (Lovable default) with a detailed, GitHub-ready document that explains what the project is, how it works, and how to develop on it.

## Sections to include

1. **Project Title & Tagline** — "JD Platform — Role-based Job Description management for HR & Employees"
2. **Overview** — What the app does, problem it solves, current status (frontend-only, mocked data)
3. **Key Features**
   - Role-based dashboards (HR / Employee / Manager-as-Employee)
   - AI Agent conversation for collecting JDs
   - JD review & approval workflows
   - Peer mentions / peer approval
   - Manager downline approvals (conditional on `subordinates`)
   - Chat placeholder, notifications/admin dashboard
4. **User Roles & Demo Accounts** — Table of the 4 seeded accounts from `AuthContext.tsx` with emails, passwords, and what tabs each sees
5. **Tech Stack** — React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router v6, React Context, TanStack Query, lucide-react
6. **Architecture**
   - Folder structure tree (`src/components`, `src/pages`, `src/context`, `src/hooks`, `src/lib`)
   - Routing flow (`App.tsx` → `ProtectedRoute` → `Dashboard`)
   - Auth flow (`AuthContext` + `localStorage`)
   - Role-based tab rendering logic (`role === 'hr'` vs employee, `isManager` derived from `subordinates.length`)
7. **Design System** — HSL semantic tokens in `index.css`, gradients, shadows, animation keyframes, Tailwind config mapping; rule against hardcoded colors
8. **Getting Started**
   - Prerequisites (Node 18+, npm/bun)
   - Install, dev, build, preview commands
   - Environment (none required currently)
9. **Project Structure** — annotated tree of important files
10. **Development Workflow**
    - Branching, commits
    - Editing via Lovable vs local IDE vs GitHub Codespaces (keep Lovable links)
    - Adding a new tab (steps: create component in `src/components/dashboard/`, register in `Dashboard.tsx` with conditional logic)
    - Adding a new role/user (extend `DEMO_CREDENTIALS`)
11. **Mocked vs Real** — What's hardcoded today (auth, JDs, approvals, chat) and what would need a backend
12. **Roadmap / Next Steps** — Lovable Cloud integration for real auth + DB, real-time chat, AI Agent wired to LLM, event-driven notifications
13. **Deployment** — Lovable publish flow + custom domain note
14. **Contributing** — PR conventions, code style (ESLint), design-token rule
15. **License** — Placeholder (MIT suggested)

## File touched

- `README.md` (overwrite)

No source code changes. No dependencies added.
