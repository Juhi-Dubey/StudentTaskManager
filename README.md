# Student Task Manager

A full-stack MERN task manager for students with JWT authentication, user-specific tasks, filtering, sorting, and responsive task management UI.

## Features

- User registration and login
- JWT-based protected routes
- User-specific task data
- Add, edit, delete, complete, and undo tasks
- Filter tasks by all, pending, or completed
- Sort tasks by priority or due date
- Loading, success, and error states
- Responsive dashboard and auth pages

## Tech Stack

- React with Vite
- React Router
- Axios
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

## Project Structure

```text
StudentTaskManager/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    src/
      api/
      components/
      pages/
      utils/
      App.jsx
      main.jsx
      index.css
```

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

Optional frontend environment file at `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

If `VITE_API_URL` is not set, the frontend uses `http://localhost:5000/api`.

## Local Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## API Routes

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Tasks:

- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/toggle`

Task routes require this header:

```http
Authorization: Bearer <token>
```

## Deployment

Backend:

- Deploy the `backend` folder to a Node.js host such as Render, Railway, or Fly.io.
- Add `MONGO_URI`, `JWT_SECRET`, and `PORT` in the host environment settings.
- Ensure CORS allows the deployed frontend URL if you restrict CORS later.

Frontend:

- Deploy the `frontend` folder to a static host such as Vercel or Netlify.
- Set `VITE_API_URL` to the deployed backend API URL, ending with `/api`.
- Build with `npm run build`.

## Notes

- JWT tokens are stored in `localStorage`.
- Dashboard access is protected on the frontend and task data is protected on the backend.
- MongoDB task queries are scoped to the logged-in user.
