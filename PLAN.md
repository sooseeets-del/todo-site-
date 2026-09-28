# Project Plan

## Idea
People lose track of tasks and deadlines. TaskFlow gives each user a clean, private dashboard to plan their day and see what is urgent. Tasks are saved in a database, so they are still there after refresh, logout, or on another device.

**Users:** students, freelancers, anyone who wants a simple planner.

## Scope

**Must have (build first)**
1. Signup, login, logout
2. Protected dashboard
3. Add, edit, delete, complete tasks
4. Priority, due date, category
5. Data saved in the database, private per user

**Nice to have (if time allows)**
- Search, filter, sort
- Stats (total, done, pending)
- Overdue highlight

**Not included:** team sharing, notifications, mobile app.

## Pages
1. Landing
2. Signup
3. Login
4. Dashboard (list, add form, filters, stats)

## Build Steps
| # | Step |
|---|---|
| 1 | Create Next.js + Tailwind project, push to GitHub |
| 2 | Connect MongoDB Atlas, create `lib/db.js` and models |
| 3 | Signup, login, logout, route protection |
| 4 | Task API (create, read, update, delete) |
| 5 | Dashboard UI connected to the API |
| 6 | Search, filter, sort, stats |
| 7 | Apply theme, polish UX, test on mobile |
| 8 | Deploy to Vercel, test live link |
| 9 | Screenshots, demo account, submit |

## Folder Structure
```
app/
  page.js
  login/page.js
  signup/page.js
  dashboard/page.js
  api/auth/{signup,login,logout,me}/route.js
  api/tasks/route.js
  api/tasks/[id]/route.js
components/   (Navbar, TaskCard, TaskForm, Toast, Skeleton)
lib/          (db.js, auth.js)
models/       (User.js, Task.js)
```
