# ComplianceAI

AI regulatory compliance management platform for tracking, assessing, and documenting AI system compliance across global frameworks.

<!-- Add screenshot here -->

## Features

- **Compliance Dashboard** — Overview of compliance status across all AI systems with KPI cards
- **Regulation Tracker** — Monitor compliance against EU AI Act, NIST AI RMF, ISO 42001, OECD, and more
- **AI System Registry** — Central catalog of all deployed AI systems with risk classifications
- **Risk Assessment** — Structured risk evaluation for each AI system against regulatory requirements
- **Compliance Checklists** — Framework-specific checklists with progress tracking
- **Documentation Generator** — Auto-generate compliance documentation and audit reports
- **Audit Trail** — Complete history of compliance activities, assessments, and changes
- **Deadline Tracking** — Monitor upcoming regulatory deadlines with at-risk alerts

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Recharts
- **Database:** Supabase (with SSR helpers)
- **Date Utilities:** date-fns
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project

### Installation

```bash
git clone <repo-url>
cd complianceai
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── regulations/      # Regulation framework tracker
│   ├── registry/         # AI system registry
│   ├── risk-assessment/  # Risk evaluation tools
│   ├── checklists/       # Compliance checklists
│   ├── documentation/    # Report generation
│   └── audit-trail/      # Audit history
├── components/           # Shared UI and Sidebar
├── lib/                  # Store, utilities, Supabase client
└── types/                # TypeScript type definitions
```

## License

MIT
