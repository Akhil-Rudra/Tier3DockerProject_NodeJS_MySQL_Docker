# Tier 3 Docker Project - NodeJS_MySQL_Docker

This project is a simple **User Management App** built with:
- **Frontend**: Node.js + Webpack (React-like simple client)
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Containerization**: Docker & Docker Compose

---

## 📂 Project Structure

```
3-Tier-NodeJS-MySQL-Docker/
│── client/                # Frontend application
│   ├── src/               # Source code (JS, styles, components)
│   ├── dist/              # Build output (bundle.js)
│   ├── package.json       # Frontend dependencies & scripts
│   └── webpack.config.js  # Webpack build configuration
│
│── server/                # Backend API (Express.js)
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic for API routes
│   ├── models/            # Database models (tables, schema)
│   ├── routes/            # Express routes (API endpoints)
│   ├── app.js             # Express app setup
│   ├── server.js          # Server entry point
│   ├── package.json       # Backend dependencies & scripts
│   └── package-lock.json  # Dependency lock file
│
│── docker-compose.yml     # Multi-container setup (MySQL + App)
│── Dockerfile             # Builds frontend + backend into single container
│── README.md              # Project documentation
│── execution_results/     # Saved logs & proof of execution
```

### 🔑 Explanation of Key Files
- **client/** → Frontend UI built with Node.js + Webpack. Compiles into `bundle.js` served by backend.  
- **server/** → Backend API (Express.js). Handles routes, DB connections, serves frontend bundle.  
  - `config/` → Database connection setup.  
  - `controllers/` → Functions for handling user CRUD operations.  
  - `models/` → Database schema definitions (users table).  
  - `routes/` → API endpoints like `/api/users`.  
  - `server.js` → Starts the Express server.  
- **Dockerfile** → Builds client + server into one container image.  
- **docker-compose.yml** → Defines multi-container environment (App + MySQL).  
- **execution_results/** → Stores command outputs as proof.  

---

## 📦 Prerequisites
- Node.js v14+ (LTS recommended)
- MySQL 8.4+ (installed via Homebrew or package manager)
- Docker & Docker Compose (for containerized execution)

---

## 🗄️ Setting up MySQL (Local Machine)
1. Start MySQL service:
   ```bash
   brew services start mysql@8.4
   ```

2. Export MySQL binary path (if `mysql` is not found):
   ```bash
   export PATH="/opt/homebrew/opt/mysql@8.4/bin:$PATH"
   ```

3. Connect to MySQL:
   ```bash
   mysql -h 127.0.0.1 -u root -ppassword
   ```

4. Create database:
   ```sql
   CREATE DATABASE test_db;
   ```

---

## 🚀 Run the Application Locally (without Docker)

### 1. Set Environment Variables
```bash
export DB_HOST=127.0.0.1
export DB_USER=root
export DB_PASSWORD=password
export DB_NAME=test_db
export PORT=5050
```

### 2. Start Backend
```bash
cd server
npm install
npm start
```
Expected output:
```
Server is running on http://localhost:5050
Database connected.
Users table initialized or already exists.
```

### 3. Start Frontend
```bash
cd ../client
npm install
npm run build    # build production bundle
npm start        # dev mode (optional)
```

### 4. Test API
```bash
curl http://localhost:5050/api/users
```
Expected output (empty DB):
```json
[]
```

---

## 🐳 Run with Docker

### 1. Build & Start Containers
```bash
docker-compose up --build
```

### 2. Check Running Containers
```bash
docker ps
```

You should see `app` and `mysql` containers running.

### 3. Access the Application
- Backend/API: [http://localhost:5000/api/users](http://localhost:5000/api/users)
- Frontend: served via backend (bundle copied into server `public/`)

### 4. Stop Containers
```bash
docker-compose down -v
```

---

## 📝 Execution Results (Proof)

All command outputs and execution logs are stored under the `execution_results/` directory for transparency and proof of setup.

```
execution_results/
│── apitest_execution_results/     # Logs from API tests (curl commands)
│── backend_execution_results/     # Logs from backend (npm start, server output)
│── frontend_execution_results/    # Logs from frontend (npm run build, npm start)
│── docker_execution_results/      # Logs from Docker commands (build, ps, compose)
│── sql_execution_results/         # Logs from MySQL queries and schema setup
```

This structure shows **end-to-end validation**:
- Backend & frontend were installed and run successfully  
- MySQL server was set up and verified  
- Docker containers were built and tested  
- API endpoints were tested (`/api/users`) and logged  

Each subdirectory contains `.txt` files with the actual command outputs.  

---

## ✅ Notes
- Use `DB_HOST=127.0.0.1` when running **locally**
- Use `DB_HOST=mysql` when running **inside Docker**
- `mysql2` driver is required (`npm install mysql2`)
- If port `5000` or `5050` is busy, change it before running
