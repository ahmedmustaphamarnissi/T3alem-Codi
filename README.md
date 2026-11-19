# T3alem Codi — E-Learning Platform

A full-stack e-learning platform built with **Angular 21** on the front end and **ASP.NET Core** on the back end, using **SQL Server** as the database. The platform supports two roles — **Admin** and **Student** — with JWT-based authentication.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21, Bootstrap 5, Chart.js, Angular SSR |
| Backend | ASP.NET Core Web API (.NET) |
| Database | SQL Server (ADO.NET, no ORM) |
| Auth | JWT Bearer Tokens + BCrypt password hashing |
| API Docs | Swagger / OpenAPI |

---

## Project Structure

```
E-Learning Platform/
├── front-end/              # Angular 21 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layouts/        # Shared layouts (Admin, User, Auth)
│   │   │   └── view/
│   │   │       ├── admin/      # Admin pages
│   │   │       ├── user/       # Student pages
│   │   │       ├── guards/     # Route guards
│   │   │       └── services/   # HTTP services
│   │   ├── index.html
│   │   └── styles.css
│   └── package.json
│
└── back-end/               # ASP.NET Core solution
    ├── meanProject/            # Web API project (controllers, Program.cs)
    ├── meanBuisnessLayer/      # Business logic layer
    └── meanDataAccessLayer/    # Data access layer (ADO.NET + SQL Server)
```

---

## Features

### Student (User)
- Register & Login
- Browse available courses by domain
- View course details
- Enroll / Checkout
- Edit profile & settings

### Admin
- Dashboard with charts (Chart.js)
- Manage students (add, view all)
- Manage instructors (add, view all)
- Manage courses (add)
- Manage domains
- View messages
- Settings

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 20 and npm ≥ 11
- [Angular CLI](https://angular.dev/tools/cli) ≥ 21
- [.NET SDK](https://dotnet.microsoft.com/) ≥ 8
- SQL Server (local or remote)

---

### Backend Setup

1. **Set environment variables** (never hardcode secrets):

   ```bash
   # Windows (PowerShell)
   $env:JWT_SECRET_KEY = "your-super-secret-key-min-32-chars"
   $env:DB_ID          = "your-sql-server-username"
   $env:DB_Password    = "your-sql-server-password"
   ```

2. **Create the database** named `mean` in SQL Server.

3. **Run the API:**

   ```bash
   cd back-end/meanProject
   dotnet run
   ```

   The API will start at `https://localhost:7217` / `http://localhost:5215`.  
   Swagger UI is available at: `https://localhost:7217/swagger`

---

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd front-end
   npm install
   ```

2. **Start the dev server:**

   ```bash
   npm start
   # or
   ng serve
   ```

   Open your browser at `http://localhost:4200`.

---

## API Endpoints

All routes are prefixed with `/api/`.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | ❌ | Login and receive a JWT |
| GET | `/api/student` | ✅ | Get all students |
| POST | `/api/student` | ✅ Admin | Add a student |
| GET | `/api/courses` | ✅ | Get all courses |
| POST | `/api/courses` | ✅ Admin | Add a course |
| GET | `/api/domain` | ✅ | Get all domains |
| GET | `/api/instructors` | ✅ | Get all instructors |
| POST | `/api/instructors` | ✅ Admin | Add an instructor |
| GET | `/api/user` | ✅ | Get user info |

> Secure endpoints require the `Authorization: Bearer <token>` header.

---

## Authentication Flow

1. User logs in via `POST /api/auth/login` with email + password.
2. Server verifies the password with **BCrypt** and returns a **JWT** (30-minute expiry).
3. The Angular frontend stores the token and attaches it to every subsequent request using `@auth0/angular-jwt`.
4. Route guards (`AdminGuard`, `UserGuard`) protect pages based on the role claim inside the token.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `JWT_SECRET_KEY` | Secret key used to sign/verify JWT tokens (min. 32 characters) |
| `DB_ID` | SQL Server login username |
| `DB_Password` | SQL Server login password |

> ⚠️ Never commit these values. They are intentionally excluded from `appsettings.json` and read at runtime from environment variables.

---

## Scripts

### Frontend (`front-end/`)

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server at `localhost:4200` |
| `npm run build` | Production build |
| `npm test` | Run unit tests with Vitest |

### Backend (`back-end/meanProject/`)

| Command | Description |
|---------|-------------|
| `dotnet run` | Start the API in development mode |
| `dotnet build` | Build the solution |
| `dotnet publish` | Publish for deployment |
