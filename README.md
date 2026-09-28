# TaskFlow: To-Do Website

A simple, fast to-do app. Sign up, add tasks, set priority and due date, tick them off. Everything is saved in a live database.

- **Live site:** https://your-app.vercel.app
- **GitHub:** https://github.com/your-username/taskflow
- **Demo login:** demo@taskflow.com / Demo@1234

## Assignment Checklist

| Requirement | Done with |
|---|---|
| Frontend | Next.js + Tailwind CSS |
| Backend | Next.js API routes |
| Active database | Supabase (Postgres) |
| Hosting | Vercel |

## Features

- Signup, login, logout (passwords hashed)
- Add, edit, delete, complete tasks
- Priority (low / medium / high), due date, category
- Search, filter (all / active / done), sort
- Overdue and due-today highlights
- Each user sees only their own tasks
- Works on mobile and desktop

## Tech Stack

Next.js, React, Tailwind CSS, Supabase Postgres, JWT cookie auth, Vercel.

## Run Locally

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open http://localhost:3000

## Environment Variables

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
JWT_SECRET=a_long_random_secret
```

## Deploy (Vercel)

1. Push code to GitHub (never commit `.env.local`).
2. Import the repo in Vercel.
3. Add `SUPABASE_URL`, `SUPABASE_ANON_KEY` and `JWT_SECRET` in Environment Variables.
4. Deploy.

## More Docs

- [PLAN.md](PLAN.md): idea, scope, build steps
- [UI_UX.md](UI_UX.md): design rules and theme
- [DATABASE_API.md](DATABASE_API.md): data and endpoints
- [AGENT.md](AGENT.md): instructions for the AI coding tool
- [TESTING.md](TESTING.md): final checklist

Author: Your Name
