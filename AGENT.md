# Instructions for the AI Coding Tool

You are a senior full-stack developer and UI/UX designer. Build the TaskFlow to-do website described in this folder.

## Read first
PLAN.md, UI_UX.md, DATABASE_API.md

## Stack
Next.js (App Router), Tailwind CSS, MongoDB Atlas with Mongoose, bcrypt, JWT in HTTP-only cookie, Vercel.

## Rules
1. Keep it simple. No extra libraries unless really needed.
2. Build in the order listed in PLAN.md. Finish the "Must have" list before "Nice to have".
3. Follow UI_UX.md exactly: theme colors, states (loading, empty, error, success), accessibility, responsive.
4. Put all DB settings in `.env.local` using MONGODB_URI and JWT_SECRET. Create `.env.example`. Keep `.env.local` in `.gitignore`.
5. One central DB file `lib/db.js` with a cached connection, error handling, and a "Database connected" log.
6. Never hardcode secrets or expose them to the frontend.
7. Every task API must check the logged-in user and filter by userId.
8. After each step, list the files you created or changed.
9. At the end, give me commands to run locally and steps to deploy on Vercel.

## Definition of done
All items in TESTING.md pass on the live link.
