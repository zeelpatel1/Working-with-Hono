# 🚀 Edge Task Management API

A production-ready Task Management REST API built using **Hono** and deployed on **Cloudflare Workers** with **D1 (SQLite) database integration**.

🌍 **Live URL:**
https://my-app.practice-hono.workers.dev

---

## 📌 Overview

This project is a fully deployed Edge-based backend API that supports complete CRUD operations for managing tasks.

It demonstrates:

* Clean MVC architecture
* Middleware authentication
* Zod validation
* Pagination support
* D1 database integration
* Production deployment using Wrangler
* Error handling & logging

---

## 🛠 Tech Stack

* **Framework:** Hono
* **Runtime:** Cloudflare Workers (Edge)
* **Database:** Cloudflare D1 (SQLite-based)
* **Validation:** Zod
* **Deployment Tool:** Wrangler CLI
* **Architecture:** MVC Pattern

---

## 📂 Project Structure

```
src/
 ├── routes/
 │    └── tasks.routes.ts
 ├── controllers/
 │    └── tasks.controller.ts
 ├── services/
 │    └── tasks.service.ts
 └── index.ts
```

* **Routes** → Defines API endpoints
* **Controllers** → Handles request validation and logic
* **Services** → Contains all database queries
* **Index** → App initialization and middleware setup

---

## 🔐 Authentication

Currently uses a middleware-based authorization check:

```
Authorization: Bearer 1234
```

All `/tasks` routes are protected.

---

## 📦 API Endpoints

### Base URL

```
https://my-app.practice-hono.workers.dev
```

---

### ✅ Get All Tasks

```
GET /tasks
```

Query Params:

* `limit` (default: 10)
* `offset` (default: 0)

Example:

```
GET /tasks?limit=5&offset=0
```

---

### ➕ Create Task

```
POST /tasks
```

Body:

```json
{
  "title": "New Task"
}
```

---

### ✏️ Update Task

```
PUT /tasks/:id
```

Body:

```json
{
  "title": "Updated Task"
}
```

---

## 🗄 Database Schema

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
);
```

---

## ⚙️ Deployment Steps

1. Install Wrangler:

   ```
   npm install -g wrangler
   ```

2. Login:

   ```
   wrangler login
   ```

3. Create D1 Database:

   ```
   wrangler d1 create tasks-db
   ```

4. Deploy:

   ```
   wrangler deploy
   ```

---

## 🧠 Key Learnings

* Edge-based backend architecture
* Using environment bindings (`c.env`)
* Prepared SQL statements with `.bind()` for security
* Middleware-based route protection
* Centralized error handling with `app.onError()`
* Production debugging using `wrangler tail`

---

## 🚀 Future Improvements

* JWT Authentication
* User system & per-user tasks
* Password hashing
* Role-based access control

---

## 📎 Author

Built as part of backend mastery journey using Hono and Cloudflare Workers.

---

## ⭐ If you like this project

Consider starring the repository!
