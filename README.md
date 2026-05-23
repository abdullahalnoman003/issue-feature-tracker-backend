# DevIntel API 🚀

DevIntel is a collaborative issue tracking and workflow management API designed for software development teams.
It helps contributors report bugs or feature requests while allowing maintainers to manage issue workflows efficiently through a secure role-based system.

Built with scalability, security, and clean architecture in mind, DevIntel follows a modular backend structure using Node.js, Express.js, TypeScript, PostgreSQL, and raw SQL queries.

---

## ✨ Features

* JWT-based Authentication & Authorization
* Role-based Access Control (`contributor` & `maintainer`)
* Secure Password Hashing with bcrypt
* Create and Manage Issues
* Issue Status Workflow Management
* Filtering & Sorting Support
* Centralized Error Handling
* Modular Scalable Architecture
* Raw SQL Queries using PostgreSQL (`pg`)
* Environment-based Configuration
* Clean & Reusable Code Structure

---

## 🛠️ Tech Stack

| Technology   | Usage               |
| ------------ | ------------------- |
| Node.js      | Runtime Environment |
| TypeScript   | Type Safety         |
| Express.js   | Backend Framework   |
| PostgreSQL   | Relational Database |
| pg           | PostgreSQL Driver   |
| bcrypt       | Password Hashing    |
| jsonwebtoken | JWT Authentication  |

---

# 📂 Project Structure

```bash
src/
├── app.ts
├── server.ts
├── config/
│   └── index.ts
├── database/
│   └── index.ts
├── middleware/
│   ├── auth.ts
│   ├── globalErrorhandler.ts
│   └── user.d.ts
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   └── auth.service.ts
│   └── issues/
│       ├── issues.controller.ts
│       ├── issues.interface.ts
│       ├── issues.route.ts
│       └── issues.service.ts
├── types/
│   └── index.ts
└── utility/
  └── responseSender.ts
```

---

# 🔐 Authentication System

DevIntel uses JWT-based authentication.

### Authentication Flow

1. User registers an account
2. Password is hashed using bcrypt
3. User logs in with credentials
4. Server generates JWT token
5. Client sends token in request headers
6. Protected routes verify the token before processing

### Authorization Header

```http
Authorization: <JWT_TOKEN>
```

---

# 👥 User Roles

## Contributor

* Register & Login
* Create Issues
* View All Issues
* Update Own Open Issues

## Maintainer

* Full Contributor Access
* Update Any Issue
* Delete Any Issue
* Manage Issue Workflow Status
* Access Protected Administrative Operations

---

# 🗄️ Database Schema

## users

| Field      | Type                     |
| ---------- | ------------------------ |
| id         | Serial Primary Key       |
| name       | VARCHAR                  |
| email      | VARCHAR (Unique)         |
| password   | TEXT                     |
| role       | contributor / maintainer |
| created_at | TIMESTAMP                |
| updated_at | TIMESTAMP                |

---

## issues

| Field       | Type                          |
| ----------- | ----------------------------- |
| id          | Serial Primary Key            |
| title       | VARCHAR(150)                  |
| description | TEXT                          |
| type        | bug / feature_request         |
| status      | open / in_progress / resolved |
| reporter_id | INTEGER                       |
| created_at  | TIMESTAMP                     |
| updated_at  | TIMESTAMP                     |

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register User |
| POST   | `/api/auth/login`  | Login User    |

---

## Issues

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/issues`     | Create Issue     |
| GET    | `/api/issues`     | Get All Issues   |
| GET    | `/api/issues/:id` | Get Single Issue |
| PATCH  | `/api/issues/:id` | Update Issue     |
| DELETE | `/api/issues/:id` | Delete Issue     |

---

# 🔎 Query Parameters

### Get All Issues

```http
GET /api/issues?sort=newest&type=bug&status=open
```

| Parameter | Values                        |
| --------- | ----------------------------- |
| sort      | newest / oldest               |
| type      | bug / feature_request         |
| status    | open / in_progress / resolved |

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/DevIntel-api.git
```

## Navigate to Project

```bash
cd DevIntel-api
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
CONNECTION=your_database_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
BYCR_ROUND=10

```

## Run Development Server

```bash
npm run dev
```

---

# 🚀 Scripts

| Script        | Description              |
| ------------- | ------------------------ |
| npm run dev   | Start Development Server |
| npm run build | Build TypeScript         |
| npm start     | Run Production Build     |

---

# 📦 API Response Structure

## Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

---

# 🔒 Security Features

* Password Hashing using bcrypt
* JWT Token Verification
* Protected Routes Middleware
* Role-based Authorization
* Environment Variable Protection
* Input Validation
* Centralized Error Handling

---

# 🌍 Deployment

The API can be deployed using:

* Vercel
* Render
* Railway

PostgreSQL providers:

* NeonDB
* Supabase
* ElephantSQL

**Live Deployment:** https://devintel-backend.vercel.app/ 

---

# 📘 Future Improvements

* Pagination Support
* Refresh Tokens
* Issue Comments System
* Activity Logs
* Email Notifications
* API Documentation with Swagger
* Unit & Integration Testing

---

# 👨‍💻 Author

Developed by Abdullah Al Noman

GitHub: [https://github.com/abdullahalnoman003](https://github.com/abdullahalnoman003)

---

# 📄 License

This project is licensed under the MIT License.
