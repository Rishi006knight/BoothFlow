# BoothFlow — Election Management System

A full-stack Election Management System (EMS) for managing constituencies, voters, candidates, parties, elections, polling stations, and vote counting. Built with **Spring Boot** (backend) and **React + Vite** (frontend).

## Live Demo

- **Frontend:** [booth-flow.vercel.app](https://booth-flow-rishi006knights-projects.vercel.app)
- **Backend API:** [boothflow-1.onrender.com/api](https://boothflow-1.onrender.com/api/dashboard)

> The Render free-tier backend may take ~90 seconds to wake from cold start on first visit.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Java 17, Spring Boot 3.3.5, Spring Data JPA, Hibernate |
| **Database** | H2 in-memory (seeded on startup) |
| **Frontend** | React 18, TypeScript, Vite 5, React Router 7 |
| **Icons** | Lucide React |
| **Deployment** | Render (Docker) · Vercel (static) |

## Project Structure

```
BoothFlow/
├── backend/
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── pom.xml
│   └── src/main/java/com/election/ems/
│       ├── config/          # CORS configuration
│       ├── entity/          # JPA entities (State, Constituency, Voter, etc.)
│       ├── repository/      # Spring Data JPA repositories
│       ├── service/         # Business logic (ElectionService)
│       └── web/
│           ├── dto/         # Request DTOs with validation
│           ├── ElectionController.java   # REST API endpoints
│           ├── DashboardResponse.java
│           ├── ResultRow.java
│           └── SystemInfo.java
├── frontend/
│   ├── vercel.json
│   ├── vite.config.ts
│   ├── package.json
│   └── src/
│       ├── api.ts           # API client (fetch wrapper)
│       ├── types.ts         # TypeScript interfaces
│       ├── main.tsx         # App entry + routing
│       ├── styles.css       # Custom CSS (no framework)
│       ├── components/
│       │   ├── Sidebar.tsx
│       │   ├── AdminLogin.tsx
│       │   └── UserLogin.tsx
│       └── pages/
│           ├── Home.tsx     # Dashboard with stats & live results
│           ├── Voters.tsx
│           ├── Elections.tsx
│           ├── Candidates.tsx
│           ├── Results.tsx
│           ├── States.tsx
│           ├── Vote.tsx
│           ├── Admin.tsx
│           └── About.tsx
└── render.yaml
```

## Features

- **Dashboard** — Overview with total voters, votes cast, active elections, candidates, and live results per constituency
- **Voter Management** — Register and view voters with constituency assignment
- **Election Management** — Create and manage elections across multiple constituencies
- **Candidate Registration** — Add candidates to elections with party affiliation
- **Vote Casting** — One-vote-per-election enforcement with constituency validation
- **Live Results** — Real-time vote tallying with percentage breakdown per candidate
- **State/Constituency Browser** — Navigate states and their constituencies
- **Admin Panel** — Administrative controls and settings
- **H2 Console** — In-memory database console available at `/h2-console`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Dashboard stats and latest results |
| `GET` | `/api/states` | List all states |
| `GET` | `/api/constituencies` | List all constituencies |
| `POST` | `/api/constituencies` | Create a constituency |
| `GET` | `/api/polling-stations` | List all polling stations |
| `POST` | `/api/polling-stations` | Create a polling station |
| `GET` | `/api/parties` | List all parties |
| `POST` | `/api/parties` | Create a party |
| `GET` | `/api/elections` | List all elections |
| `POST` | `/api/elections` | Create an election |
| `GET` | `/api/candidates` | List candidates (optional `?electionId=`) |
| `POST` | `/api/candidates` | Create a candidate |
| `GET` | `/api/voters` | List voters (optional `?constituencyId=`) |
| `POST` | `/api/voters` | Register a voter |
| `GET` | `/api/results?electionId=` | Get vote results for an election |
| `POST` | `/api/votes` | Cast a vote |
| `GET` | `/api/about` | System info |

## Local Development

### Prerequisites

- Java 17+
- Node.js 18+
- npm

### Backend

```bash
cd backend
mvn spring-boot:run
```

The API runs at `http://localhost:8081` and is seeded with sample data (5 Indian states, 5 constituencies, 50 voters, 8 parties, 10 candidates, 50 votes).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` and proxies `/api` requests to the backend.

## Deployment

### Render (Backend)

The backend is deployed as a Docker web service. The `render.yaml` at the repo root configures it:

```bash
# Auto-detected from render.yaml on push
# Or manually: New > Web Service > Connect GitHub repo
# Root Directory: (leave empty — render.yaml specifies dockerContext)
```

### Vercel (Frontend)

The frontend is a static Vite build:

1. Import the GitHub repo on [Vercel](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Vercel auto-builds and deploys on every push

## Seed Data

The application comes pre-seeded with Tamil Nadu election data:

- **5 States:** Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana
- **5 Constituencies:** Chennai Central, Chennai South, Coimbatore North, Madurai East, Salem City
- **10 Polling Stations** across all constituencies
- **8 Parties:** DMK, AIADMK, BJP, INC, PMK, MDMK, VCK, NTK
- **5 Elections** (Tamil Nadu Assembly 2026)
- **10 Candidates** including real party leaders
- **50 Voters** distributed across constituencies
- **50 Sample Votes** with realistic distribution

## License

This project is for educational and demonstration purposes.