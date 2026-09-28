# Database and API

Database: Supabase Postgres (project `main password`), tables `taskflow_users` and `taskflow_tasks`.

## taskflow_users
| Field | Type | Notes |
|---|---|---|
| id | uuid | Auto |
| name | text | Required |
| email | text | Required, unique |
| password_hash | text | bcrypt, never plain text |
| created_at | timestamptz | Auto |

## taskflow_tasks
| Field | Type | Notes |
|---|---|---|
| id | uuid | Auto |
| user_id | uuid | Owner, FK to taskflow_users |
| title | text | Required |
| description | text | Optional |
| priority | text | low / medium / high |
| due_date | date | Optional |
| category | text | Optional |
| completed | boolean | Default false |
| created_at | timestamptz | Auto |
| updated_at | timestamptz | Auto |

## Pages
| Route | Purpose |
|---|---|
| / | Premium landing |
| /pricing | Pricing plans |
| /about | About the product |
| /blog | Blog index |
| /blog/:slug | Blog post |
| /signup, /login | Auth |
| /dashboard | Task dashboard (login required) |

## Endpoints
| Method | Route | Purpose | Login needed |
|---|---|---|---|
| POST | /api/auth/signup | Create account | No |
| POST | /api/auth/login | Log in | No |
| POST | /api/auth/logout | Log out | Yes |
| GET | /api/auth/me | Current user | Yes |
| GET | /api/tasks | List my tasks (?search, ?status, ?sort) | Yes |
| POST | /api/tasks | Create task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |

## Security
- Hash passwords with bcrypt.
- JWT in an HTTP-only cookie.
- Every task query filters by the logged-in user's ID.
- Secrets only in environment variables.
- Validate input on frontend and backend.
