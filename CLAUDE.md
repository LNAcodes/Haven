# Haven App — CLAUDE.md

Haven is a mobile-first incident documentation app built as a student capstone project. It lets authenticated users privately log, view, edit, and delete workplace/personal incident records.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 13.4 — **Pages Router** (not App Router) |
| Language | JavaScript (no TypeScript) |
| Styling | Styled Components 6 (CSS-in-JS) |
| Database | MongoDB Atlas via Mongoose 9 |
| Auth | NextAuth 4 (GitHub OAuth + test credentials provider) |
| Data fetching | SWR 2 for client-side, `getServerSideProps` for SSR |
| Icons | FontAwesome + react-icons |
| Testing | Jest 29 + React Testing Library |

## Project Structure

```
Haven-App/
├── pages/
│   ├── _app.js              # SessionProvider + SWR config
│   ├── _document.js         # styled-components SSR (ServerStyleSheet)
│   ├── index.js             # Welcome page (/)
│   ├── login/index.js
│   ├── incidents/
│   │   ├── index.js         # Incident list
│   │   ├── [id].js          # Incident detail
│   │   └── add-incident/index.js
│   ├── edit-incident/[id].js
│   ├── info/index.js        # Help & Support resources
│   └── api/
│       ├── auth/[...nextauth].js
│       └── incidents/
│           ├── index.js     # GET list / POST create
│           └── [id].js      # GET / PUT / PATCH / DELETE
├── components/
│   ├── ui/
│   │   ├── Button.js
│   │   ├── Message.js       # Success/error/info modal
│   │   ├── Dialog.js        # Confirmation dialog
│   │   └── PageHeader.js    # Dark header bar used on all protected pages
│   ├── Navbar/Navbar.js     # Bottom navigation bar
│   ├── Footer/Footer.js
│   ├── IncidentForm/IncidentForm.js   # Shared create/edit form
│   ├── IncidentList/IncidentList.js
│   └── IncidentCard/IncidentCard.js
├── db/connect.js            # MongoDB singleton connection
├── models/Incident.js       # Mongoose schema
├── styles.js                # Global styled-components + CSS custom properties
├── next.config.js
└── jsconfig.json            # Path alias: @/* → project root
```

## Architecture Patterns

### Pages & Data Fetching
- All protected pages use `getServerSideProps` with a `getSession()` check; unauthenticated users are redirected to `/login`.
- Client-side list data is fetched with SWR via `useSWR('/api/incidents')`.
- After mutations (create/edit/delete), call SWR's `mutate()` to revalidate.

### API Routes
Standard pattern for every handler:

```js
export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  switch (req.method) {
    case "GET": ...
    case "POST": ...
    default: res.status(405).json({ message: "Method not allowed" });
  }
}
```

- All queries are scoped by `userId` (from `token.sub`) — never expose cross-user data.
- Return 403 if a user tries to access another user's incident.

### Authentication
- `NEXTAUTH_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_URL` must be set in `.env.local`.
- Test credentials provider (`username: "fisch"` / `password: "fisch"`) exists for development only.
- `authOptions` are defined in `pages/api/auth/[...nextauth].js` and imported wherever `getServerSession` is used.

## Data Model

**Incident** (`models/Incident.js`):

| Field | Type | Notes |
|---|---|---|
| `date` | Date | required |
| `time` | String | required, HH:MM format |
| `location` | String | required |
| `involvedPersons` | [String] | required; store initials, not full names |
| `witnesses` | [String] | optional |
| `category` | String enum | `verbal` `physical` `digital` `discrimination` `other` |
| `severity` | String enum | `low` `medium` `high` `critical` |
| `description` | String | required, min 10 chars |
| `impact` | String | optional |
| `reportedTo` | String | optional |
| `followUp` | String | optional |
| `status` | String enum | `complete` `incomplete`, default `complete` |
| `userId` | String | required; set server-side from JWT |
| `createdAt` / `updatedAt` | Date | auto via `timestamps: true` |

`userId` is **always set server-side** from the JWT token — never trust client-supplied userId.

## Design System

### Color Tokens (CSS custom properties in `styles.js`)

```
--color-primary:      #7BBFDF   (light blue — main brand)
--color-accent:       #7D4E8C   (purple — secondary)
--color-background:   #F0F4F8   (very light blue — page bg)
--color-text:         #2D3748   (dark gray — body text)
--color-button-text:  #FFFFFF

Severity colors (left-border on cards):
  low:      #c5cce8   (light indigo)
  medium:   #8d97c9
  high:     #5b6bb5
  critical: #2d3a7a

Message/feedback colors:
  success:  text #2d6a4f, bg #d8f3dc
  error:    text #92400e, bg #fef3c7
```

### Typography
- Font: **Inter** (Google Fonts), fallback `system-ui, sans-serif`
- Weights used: 400 (regular), 500 (medium), 600 (semibold)

### Spacing
- Base unit: **8px** (`--gap: 8px`)
- Common multiples: 4, 8, 12, 16, 24, 32, 48 px
- Body bottom padding: 88px (clears sticky Navbar)

### Responsive
- Mobile-first; body padding 24px
- Desktop breakpoint: `768px` (grid layouts switch to multi-column)
- Viewport height: `100dvh` (handles mobile keyboard)

### Component Conventions
- **Styled components** are defined as named `const` exports within each component file.
- Transient props use the `$` prefix (e.g., `$variant`, `$severity`) to avoid forwarding to the DOM.
- The `Button` component accepts a `$variant` prop: `action` | `back` | `delete` | `icon`.
- Form inputs have a minimum touch target height of 48px.
- Cards use a 4–8px `border-radius` and a left-border accent colored by severity.

## Conventions

### Naming
- **Components:** PascalCase files and exports (`IncidentCard.js`)
- **Variables/functions:** camelCase
- **API methods:** follow REST (`GET`/`POST`/`PUT`/`PATCH`/`DELETE`)

### File Organization
- Each component lives in its own folder: `components/ComponentName/ComponentName.js`
- Styled components are co-located in the same file as the component (no separate style files)
- Shared non-component logic lives under `lib/`: `lib/constants/`, `lib/utils/`, `lib/api/`

### Forms
- Use the native `FormData` API for form submission (not controlled inputs where avoidable)
- HTML-level validation (`required`, `minLength`, `type`, `pattern`) before JS validation
- Display success/error via the `Message` component (`components/ui/Message.js`)

### Code Style (Prettier)
- 80-char print width, 2-space indent
- Double quotes, trailing commas (ES5), always arrow-function parens

## DRY Rules

These rules exist because the same patterns were previously copy-pasted across files. Follow them to keep new code consistent.

### Auth guard — never copy the redirect block
All protected pages must use the shared `requireAuth` helper from `lib/auth/requireAuth.js`:

```js
// correct
export { requireAuth as getServerSideProps } from "@/lib/auth/requireAuth";

// wrong — do not inline this in each page
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: "/login", permanent: false } };
  ...
}
```

### API routes — use `withAuth` wrapper
Every API route must use the `withAuth` middleware from `lib/api/middleware.js` instead of repeating `dbConnect()` + `getServerSession()` + `getToken()` setup:

```js
// correct
export default withAuth(async function handler(req, res) { ... });

// wrong — do not repeat the setup boilerplate in every route
await dbConnect();
const session = await getServerSession(req, res, authOptions);
const token = await getToken({ req });
```

### Enum values — import from constants, never inline strings
Category and severity values are defined once in `lib/constants/incident.js`. Do not hardcode these strings in components, forms, or models:

```js
// correct
import { SEVERITY_LEVELS, INCIDENT_CATEGORIES } from "@/lib/constants/incident";

// wrong
enum: ["low", "medium", "high", "critical"]   // duplicated in model + form + card
```

### Severity colors — use `getSeverityColor()`
Do not write inline `if ($severity === "low") return "var(...)"` chains in styled components. Use the helper from `lib/utils/severity.js`:

```js
// correct
import { getSeverityColor } from "@/lib/utils/severity";
border-left: 8px solid ${({ $severity }) => getSeverityColor($severity)};

// wrong — repeated if-chain in IncidentCard, detail page, and IncidentForm
if ($severity === "low") return "var(--color-severity-low)";
if ($severity === "medium") return "var(--color-severity-medium)";
...
```

### Date formatting — always use `formatDate()`
Use `formatDate()` from `lib/utils/dateFormatter.js` for all date display. Always use `"en-GB"` locale. Do not call `toLocaleDateString` inline:

```js
// correct
import { formatDate } from "@/lib/utils/dateFormatter";
formatDate(incident.date)

// wrong
new Date(incident.date).toLocaleDateString("en-GB")
```

### API endpoints — import from constants
API route strings must come from `lib/api/endpoints.js`, not be hardcoded in `fetch()` calls or `useSWR()`:

```js
// correct
import { API_ENDPOINTS } from "@/lib/api/endpoints";
useSWR(API_ENDPOINTS.INCIDENTS)
fetch(API_ENDPOINTS.incidentById(id), { method: "DELETE" })

// wrong
useSWR("/api/incidents")
fetch(`/api/incidents/${id}`, ...)
```

### Array parsing — use `parseCommaSeparated()`
The `involvedPersons` and `witnesses` comma-split logic must use the shared helper in `lib/api/incidentParser.js`. Do not repeat `.split(",").map(s => s.trim())` in API routes:

```js
// correct
import { parseIncidentFields } from "@/lib/api/incidentParser";
const { involvedPersons, witnesses } = parseIncidentFields(req.body);

// wrong — duplicated in both API routes
const involvedPersonsArray = involvedPersons.split(",").map((p) => p.trim());
```

## Environment Variables

Required in `.env.local`:

```
MONGODB_URI=          # MongoDB Atlas connection string
GITHUB_ID=            # GitHub OAuth app client ID
GITHUB_SECRET=        # GitHub OAuth app client secret
NEXTAUTH_URL=         # e.g. http://localhost:3000
NEXTAUTH_SECRET=      # Random secret for JWT encryption
```

## Running Locally

```bash
npm install
# Add .env.local with the variables above
npm run dev       # http://localhost:3000
npm test          # Jest + React Testing Library
npm run lint      # ESLint
```

## Key Constraints

- **Not for production** — this is a student capstone project.
- Privacy is a core concern: store initials instead of full names in incident records.
- The test credentials provider must be removed or disabled before any real deployment.
- Never expose one user's incidents to another — always filter by `userId` server-side.
