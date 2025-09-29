This application is a simple implementation of a CRUD system for products with login and registration features.

## Features

- Register
- Login
- CRUD Products with pagination

## Principles Used

- DDD (Domain-Driven Design)
- Clean Architecture
- Without ORM
- Migration
- Atomic Design

## Tech Stack

- Backend: Express.js
- Database: PostgreSQL
- Frontend: EJS for HTML template

## Installation

1. Clone the repository:
   ```
   git clone <repo_url>
   cd monolith-js
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Setup `.env`:

   - Copy `.env.example` file to `.env` and adjust it with your credentials:
     ```
     DATABASE_URL=postgres://username:password@localhost:5432/db_name
     JWT_SECRET=your_jwt_secret
     SESSION_SECRET=your_session_secret
     APP_PORT=your_port
     ```

4. Database Migration

   - After setting up the `.env` file, you can migrate the database to PostgreSQL by running the following command:
     ```
     npm run migrate
     ```
   - Reset Database (Optional):

     To drop the tables and start the migration from scratch:

     ```
     npm run migrate:reset
     ```

5. Running the Application

   The backend and frontend will be served together from the same host and port. By default, the app will be running at http://localhost:`{APP_PORT}`.

   ```
   npm run dev
   ```
