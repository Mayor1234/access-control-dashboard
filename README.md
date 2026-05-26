# Access Control Dashboard

A web-based estate and community access management dashboard built for administrators to manage visitors, residents, buildings, and staff in a gated community or estate environment.

---

## Features

- **Two-factor authentication** — Email + OTP login with automatic token refresh
- **Dashboard overview** — Real-time stats cards, daily visitor charts, and pie chart breakdowns
- **Visitor log** — Track and filter all visitor check-ins and check-outs
- **Resident approval** — Approve or reject pending resident registrations
- **Community management** — Manage the estate's streets, buildings, and flats
- **Admin user management** — Create and manage staff accounts with role-based access
- **Role management** — Define and assign custom permission roles

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | TailwindCSS 4 |
| State management | Redux Toolkit + RTK Query |
| Routing | React Router 7 |
| Forms & validation | React Hook Form + Zod |
| Charts | Recharts |
| Animations | Framer Motion |
| Notifications | React Toastify |
| Production server | Express 5 |

---

## Project Structure

```
src/
├── assets/              # Static images and SVGs
├── components/
│   ├── charts/          # Recharts wrappers (PieChart, DailyVisitors)
│   ├── error-boundary/  # React ErrorBoundary component
│   ├── modal/           # Modal overlay component
│   ├── pagination/      # Pagination component
│   ├── side-bar/        # Sidebar navigation
│   ├── spinnners/       # Loading spinner component
│   ├── table/           # Generic Table component with mobile card view
│   └── ui/              # Feature-specific UI components
│       ├── approval-oversight/
│       ├── auth/
│       ├── button/
│       ├── community-management/
│       ├── dashbaord/
│       ├── forms/
│       ├── header/
│       ├── search/
│       ├── settings/
│       ├── tap-header/
│       └── visitor-log/
├── constants/           # Sidebar menu config and app-wide constants
├── layouts/             # DashboardLayout (sidebar + header + outlet)
├── pages/
│   ├── auth/            # Login (OTP flow)
│   ├── approval-oversight/
│   ├── community-management/
│   ├── dashboard/
│   ├── settings/
│   │   └── manage-users/
│   └── visitor-log/
├── redux/
│   ├── app/             # Store config, typed hooks, error middleware
│   └── features/
│       ├── auth/        # Auth slice + authApi
│       ├── dashboard/   # dashboardApi (residents, overview, charts)
│       ├── visitors-log/ # visitorsApi
│       ├── community-management/ # communityApi (streets, buildings, flats)
│       └── settings/    # settingsApi (admin users, roles)
├── routes/              # createBrowserRouter config
├── shared/
│   ├── helper/          # formatStatus badge helper
│   └── utils/           # baseQueryWithRefreshAuth, UserStorage, env validation
└── types/               # Global TypeScript type declarations
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Mayor1234/access-control-dashboard.git
cd access-control-dashboard
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://accesscontrol.ng/api/v1
```

> The app validates this variable on startup and throws a clear error if it is missing.

### Development

```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:3001`.

### Production Build

```bash
npm run build
```

Compiles TypeScript and outputs the static bundle to `dist/`.

### Serve Production Build

```bash
npm start
```

Runs an Express server that serves the `dist/` folder with SPA fallback routing on port 3001.

### Lint

```bash
npm run lint
```

---

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Login | Public |
| `/dashboard` | Overview + charts | Protected |
| `/visitor-log` | Visitor check-in/out log | Protected |
| `/visitor-log/:id` | Visitor detail | Protected |
| `/approval-oversight` | Pending resident approvals | Protected |
| `/approval-oversight/:id` | Resident detail | Protected |
| `/community-management` | Streets, buildings, flats | Protected |
| `/community-management/:id` | Community detail | Protected |
| `/settings/manage-users` | Admin user management | Protected |
| `/settings/user-roles` | Role management | Protected |
| `*` | 404 Not Found | Public |

All protected routes require a valid session. Unauthenticated users are redirected to `/`.

---

## Authentication Flow

1. User enters email and password → API sends a 6-digit OTP to their email.
2. User enters OTP within 60 seconds → API returns an access token.
3. Token is stored in Redux state. On page refresh, `PersistAuth` reads the user ID from `localStorage` and calls the token refresh endpoint automatically.
4. All subsequent API requests attach the token via `Authorization` header.
5. On a `403` response, `baseQueryWithRefreshAuth` attempts a token refresh before retrying the request. If the refresh fails, the user is logged out.

---

## API

**Base URL:** `https://accesscontrol.ng/api/v1`

All authenticated endpoints require the `Authorization` header set to the access token. The API layer is built with RTK Query — each feature has its own API slice in `src/redux/features/`.

| Domain | Slice file |
|---|---|
| Auth | `features/auth/authApi.ts` |
| Dashboard | `features/dashboard/dashboardApi.ts` |
| Visitors | `features/visitors-log/visitorsLogApi.ts` |
| Community | `features/community-management/communityApi.ts` |
| Settings | `features/settings/settingsApi.ts` |

---

## State Management

Redux Toolkit is used for both global state and server-side data fetching (via RTK Query).

```
store
├── auth           — user, token, isAuthReady
├── dashboardApi   — estate overview, charts, residents
├── visitorsApi    — invites / visitor log
├── communityApi   — streets, buildings, flats
└── settingsApi    — admin users, roles
```

RTK Query handles caching, loading states, and tag-based invalidation automatically. A custom error middleware (`errorToastMiddleware`) intercepts all rejected API calls and displays a toast notification.

---

## Key Components

| Component | Description |
|---|---|
| `Table` | Generic, reusable table with skeleton loading, empty state, mobile card view, and expandable rows |
| `ErrorBoundary` | Class component that catches render errors per page section and shows a recovery UI |
| `SearchComponent` | Search bar with debounce, filter dropdown, and export button |
| `PersistAuth` | Route wrapper that restores user session on page load |
| `ProtectedRoute` | Redirects unauthenticated users to login |
| `DashboardLayout` | Sidebar + header shell with animated page transitions |

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3001 |
| `npm run build` | Type-check + build for production |
| `npm start` | Serve production build with Express |
| `npm run lint` | Run ESLint across all source files |
| `npm run preview` | Preview the production build locally via Vite |
