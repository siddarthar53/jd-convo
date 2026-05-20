# JD Platform

> A role-based **Job Description (JD) management** web app for HR teams and employees — featuring AI-assisted JD creation, multi-level approval workflows, peer collaboration, and conditional dashboards based on the user's role and reporting hierarchy.

![Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-✓-000000)

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [User Roles & Demo Accounts](#user-roles--demo-accounts)
4. [Tech Stack](#tech-stack)
5. [Architecture](#architecture)
6. [Design System](#design-system)
7. [Getting Started](#getting-started)
8. [Project Structure](#project-structure)
9. [Development Workflow](#development-workflow)
10. [Mocked vs Real (Current State)](#mocked-vs-real-current-state)
11. [Roadmap](#roadmap)
12. [Deployment](#deployment)
13. [Contributing](#contributing)
14. [License](#license)

---

## Overview

**JD Platform** streamlines the lifecycle of a Job Description inside an organization:

- HR initiates and curates JDs through an **AI Agent conversation**.
- Employees draft / refine their own JDs and request peer or manager input.
- **Managers** (employees with direct reports) review and approve their downline's JDs.
- All employees can see **peer mentions** and collaborate in **chat**.

The current iteration is a **frontend-only prototype** — authentication, JDs, approvals, and chat run on mocked in-memory data. It is designed to plug into a real backend (e.g. **Lovable Cloud**) with minimal refactor.

---

## Key Features

- 🔐 **Role-aware UI** — A single `User` model with `role: 'hr' | 'employee'` and a `reportsTo`/`subordinates` graph drives the entire tabbed experience.
- 🤖 **AI Agent Conversation** — Chat-style intake to collect JD requirements.
- ✅ **Review & Approval Workflows** — HR approves all JDs; managers approve their direct reports' JDs.
- 👥 **Peer Mentions / Peer Approval** — Lightweight collaboration on JD drafts.
- 📊 **Admin Dashboard & Notifications** — HR-only analytics and alerting surface.
- 💬 **Chat (placeholder)** — Conversations list + thread view, ready to be wired to a real-time backend.
- 🎨 **Polished design system** — Custom HSL token palette, gradients, shadows, and animation keyframes; fully themed light/dark mode ready.

---

## User Roles & Demo Accounts

The app ships with four seeded accounts (see `src/context/AuthContext.tsx`). All credentials are hardcoded for the prototype.

| Email                | Password   | Name           | Role       | Hierarchy           | Effective view         |
| -------------------- | ---------- | -------------- | ---------- | ------------------- | ---------------------- |
| `hr@demo.com`        | `Hr@123`   | Sarah Johnson  | `hr`       | —                   | HR Admin (5 tabs)      |
| `manager@demo.com`   | `Mgr@123`  | Michael Chen   | `employee` | Subordinates: 3,4,5 | Employee + Manager tab |
| `employee@demo.com`  | `Emp@123`  | Alex Rivera    | `employee` | Reports to Michael  | Employee (3 tabs)      |
| `peer@demo.com`      | `Peer@123` | Jamie Wilson   | `employee` | Reports to Michael  | Employee (3 tabs)      |

> **No separate "manager" role exists.** A user is treated as a manager purely when `role === 'employee'` **and** `subordinates?.length > 0`. This avoids privilege duplication and keeps the role model minimal.

### Tab matrix

| Tab                       | HR | Manager | Employee |
| ------------------------- | -- | ------- | -------- |
| AI Agent Conversation     | ✓  | ✓ (as JD Conversation) | ✓ |
| Review/Approve JDs        | ✓  | —       | —        |
| Downline JD Approvals     | —  | ✓       | —        |
| Peer Approval             | ✓  | —       | —        |
| Peer Mentions             | —  | ✓       | ✓        |
| Chat                      | ✓  | ✓       | ✓        |
| Dashboard / Notifications | ✓  | —       | —        |

---

## Tech Stack

| Layer            | Choice                                                      |
| ---------------- | ----------------------------------------------------------- |
| Framework        | **React 18** + **TypeScript 5**                             |
| Build tool       | **Vite 5**                                                  |
| Styling          | **Tailwind CSS 3** with semantic HSL tokens                 |
| UI primitives    | **shadcn/ui** (Radix under the hood)                        |
| Routing          | **React Router v6**                                         |
| State            | **React Context** (`AuthContext`) + local component state   |
| Server state     | **@tanstack/react-query** (configured, ready for backend)   |
| Icons            | **lucide-react**                                            |
| Notifications    | **sonner** + shadcn `<Toaster />`                           |
| Persistence      | `localStorage` (auth session only)                          |

---

## Architecture

### Routing

```text
App.tsx
 └─ <BrowserRouter>
     └─ <AuthProvider>
         └─ <Layout>            ← header, role badge, logout
             └─ <Routes>
                 ├─ /login        → <Login />
                 ├─ /dashboard    → <ProtectedRoute><Dashboard /></ProtectedRoute>
                 ├─ /unauthorized → <Unauthorized />
                 └─ *             → <NotFound />
```

### Auth flow

1. `Login` calls `AuthContext.login(email, password)`.
2. `AuthContext` validates against `DEMO_CREDENTIALS`, stores user in state **and** `localStorage` (`jd-platform-user`).
3. `ProtectedRoute` blocks unauthenticated visits to `/dashboard`.
4. `Logout` clears state + storage and redirects to `/login`.

### Role-based tab rendering

`src/pages/Dashboard.tsx` is the single decision point:

```ts
const isManager =
  user.role === 'employee' &&
  user.subordinates &&
  user.subordinates.length > 0;

if (user.role === 'hr') {
  // render 5 HR tabs
} else {
  // render 3 employee tabs + conditional Manager tab when isManager
}
```

All tab content components live in `src/components/dashboard/` and `src/components/chat/`. State is preserved per-tab via the controlled `Tabs` component (`activeTab` state).

---

## Design System

All visual decisions are encoded as **semantic HSL tokens** in `src/index.css` and consumed via Tailwind utilities mapped in `tailwind.config.ts`.

```css
:root {
  --primary: 214 84% 56%;
  --accent:  160 84% 39%;
  --warning: 38 92% 50%;
  --gradient-primary: linear-gradient(135deg, hsl(214 84% 56%), hsl(214 84% 48%));
  --shadow-glow: 0 0 30px hsl(var(--primary) / 0.3);
  --radius: 0.75rem;
}
```

### Rules

- **Never** use raw color classes like `bg-blue-500` or `text-white` in components — always use semantic tokens (`bg-primary`, `text-primary-foreground`).
- **All colors are HSL** (no hex, no rgb) so they compose with `hsl(var(--token) / <alpha>)`.
- Reusable patterns live in `@layer components` (`.chat-bubble`, `.card-elevated`, `.btn-corporate`, status pills).
- Animation keyframes (`fade-in`, `slide-up`, `scale-in`, `pulse-glow`) are global and reusable.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 (use [nvm](https://github.com/nvm-sh/nvm))
- **npm** (or `bun` / `pnpm`)

### Install & run

```sh
# 1. Clone
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install
npm install

# 3. Dev server (Vite, HMR on http://localhost:8080)
npm run dev

# 4. Production build
npm run build
npm run preview
```

No environment variables are required in the current prototype.

---

## Project Structure

```text
src/
├── App.tsx                   # Router + global providers
├── main.tsx                  # React entry
├── index.css                 # Tailwind layers + design tokens + keyframes
├── context/
│   └── AuthContext.tsx       # User model, demo creds, login/logout, localStorage
├── components/
│   ├── Layout.tsx            # App shell: header, role badge, logout
│   ├── Login.tsx             # Sign in / sign up toggle
│   ├── ProtectedRoute.tsx    # Auth + optional role guard
│   ├── ui/                   # shadcn primitives (button, card, tabs, ...)
│   ├── chat/
│   │   └── ChatInterface.tsx # AI Agent conversation UI
│   └── dashboard/
│       ├── AdminDashboard.tsx
│       ├── ApprovalDashboard.tsx
│       ├── ManagerTab.tsx        # Downline JD approvals
│       ├── PeerApprovalTab.tsx
│       ├── CollaborationTab.tsx
│       └── ReminderTab.tsx
├── pages/
│   ├── Dashboard.tsx         # Role-based tab orchestrator
│   ├── Index.tsx
│   ├── Unauthorized.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
└── lib/
    └── utils.ts              # cn() classname helper
```

---

## Development Workflow

### Editing the project

There are three equivalent paths — changes from any of them sync to the same Git repo:

1. **Lovable** — open the [Lovable project](https://lovable.dev/projects/742c2357-ee34-4008-a6a1-b46c7991d66d) and prompt. Commits push automatically.
2. **Local IDE** — clone, `npm install`, `npm run dev`, push.
3. **GitHub Codespaces** — Code → Codespaces → New codespace.

### Adding a new dashboard tab

1. Create the component in `src/components/dashboard/MyNewTab.tsx` using semantic tokens only.
2. Import it in `src/pages/Dashboard.tsx`.
3. Add a `<TabsTrigger value="my-new">` and matching `<TabsContent value="my-new">` inside the correct role branch (HR or employee).
4. If the tab should only appear for managers, wrap it in `{isManager && ( ... )}` and update the `grid-cols-N` count.

### Adding a new demo user

Extend `DEMO_CREDENTIALS` in `src/context/AuthContext.tsx`:

```ts
'newuser@demo.com': {
  password: 'New@123',
  user: {
    id: '6',
    email: 'newuser@demo.com',
    name: 'New User',
    role: 'employee',
    reportsTo: '2',
  },
}
```

Add `subordinates: ['...']` to make the user a manager.

### Code quality

```sh
npm run lint   # ESLint
```

- Strict TypeScript — fix all type errors before committing.
- Components should be **small and focused**; split when a file grows past ~200 LOC.
- Never inline raw hex colors — extend tokens in `index.css` instead.

---

## Mocked vs Real (Current State)

| Capability          | Status                                          |
| ------------------- | ----------------------------------------------- |
| Authentication      | ✋ Mocked (`DEMO_CREDENTIALS`)                   |
| User hierarchy      | ✋ Hardcoded `reportsTo` / `subordinates`        |
| JDs & approvals     | ✋ In-memory mock data inside each tab component |
| Peer mentions       | ✋ Mocked                                        |
| Chat                | ✋ Placeholder UI, no transport                  |
| Notifications       | ✋ Static                                        |
| Persistence         | ✅ `localStorage` for auth session only          |

---

## Roadmap

- [ ] **Lovable Cloud integration** — real auth, Postgres-backed users / JDs / approvals, RLS-protected reads.
- [ ] **Real-time chat** — replace placeholder with a `messages` table + realtime subscription (or polling).
- [ ] **AI Agent → LLM** — wire `ChatInterface` to Lovable AI Gateway for actual JD generation.
- [ ] **Event-driven notifications** — derived from approval state changes and mentions.
- [ ] **Audit log** — immutable history of who approved/rejected what.
- [ ] **JD versioning** — diff view between revisions.
- [ ] **Dark mode polish** — palette already defined; surface the toggle in the header.

---

## Deployment

- **One-click publish** via Lovable: open the project → **Share → Publish**.
- **Custom domain**: Project → Settings → Domains → *Connect Domain* ([docs](https://docs.lovable.dev/tips-tricks/custom-domain)).
- Any static host (Vercel, Netlify, Cloudflare Pages, S3+CloudFront) works for the built `dist/` output.

---

## Contributing

1. Fork & branch from `main` (`feat/<short-name>` or `fix/<short-name>`).
2. Keep PRs scoped — one feature or fix per PR.
3. Run `npm run lint` and ensure the build succeeds before opening a PR.
4. Follow the [Design System](#design-system) rules — **no hardcoded colors**.
5. Update this README when you add a new role, tab, or backend integration.

---

## License

MIT — see `LICENSE` (add one if your repo doesn't have it yet).

---

*Built with [Lovable](https://lovable.dev). Project URL: <https://lovable.dev/projects/742c2357-ee34-4008-a6a1-b46c7991d66d>*
