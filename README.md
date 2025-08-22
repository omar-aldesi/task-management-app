[![CI/CD Pipeline](https://github.com/omaraldesi/task-management-app/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/omaraldesi/task-management-app/actions/workflows/ci-cd.yml)

# Task Management Application

A full-stack task management application with drag-and-drop Kanban board functionality. Built with Node.js, React/Next.js, and PostgreSQL.

## 🚀 Quick Start

### Docker Hub (Recommended)

```
git clone https://github.com/omaraldesi/task-management-app.git
cd task-management-app
cp .env.example .env
docker-compose -f docker-compose.hub.yml up -d
```

**Access**: http://localhost:3000  
**API Docs**: http://localhost:5000/api-docs

## ✨ Features

- **Authentication**: JWT-based login/register system
- **Drag & Drop**: Move tasks between columns (Todo, In Progress, Done)
- **Real-time Updates**: Optimistic UI with error handling
- **Task Management**: Create, edit, delete tasks with modal interface
- **Search & Filter**: Find tasks by title
- **Responsive Design**: Mobile-friendly interface
- **API Documentation**: OpenAPI/Swagger docs included

## 🏗️ Tech Stack

**Backend**

- Node.js + Express.js
- PostgreSQL with Sequelize ORM
- JWT Authentication + bcrypt
- OpenAPI documentation

**Frontend**

- Next.js 15 + TypeScript
- React Context API + Custom Hooks
- Ant Design (ANTD) components
- @dnd-kit for drag and drop

**DevOps**

- Docker + Docker Compose
- GitHub Actions CI/CD
- Docker Hub registry

## 📁 Project Structure

```
├── backend/                   # Express API
│   ├── config/               # Database & JWT config
│   ├── controllers/          # Route handlers
│   ├── models/               # Sequelize models
│   ├── routes/               # API routes
│   └── Task-Manager-API.postman_collection.json
├── frontend/src                 # Next.js app
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── context/              # State management
│   ├── hooks/                # Custom hooks
│   └── lib/
│   └── providers/
│   └── services/
│   └── types/
│   └── utils/
├── docker-compose.yml        # Local development
```

## 🛠️ Local Development

**Prerequisites**: Node.js 18+, Docker

```bash
# Backend
cd backend && npm install
cp .env.example .env
npm run dev

# Frontend
cd frontend && npm install
npm run dev

# Or use Docker
docker-compose up --build
```

## 📚 API Endpoints

### Authentication

```
POST /api/auth/register    # Register user
POST /api/auth/login       # Login user
```

### Tasks

```
GET    /api/tasks          # Get user tasks (paginated)
POST   /api/tasks          # Create task
PATCH  /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task
```

### Testing

- **Postman Collection**: `backend/Task-Manager-API.postman_collection.json`
- **API Documentation**: http://localhost:5000/api-docs

## 🗄️ Database Schema

**User**: uuid, name, email, password, timestamps  
**Task**: uuid, title, description, status, position, userId, timestamps, deletedAt

_Auto-sync enabled - no manual migrations needed_

## 🐳 Docker

**Images on Docker Hub**:

- [omaraldesi/fullstack-backend](https://hub.docker.com/r/omaraldesi/fullstack-backend)
- [omaraldesi/fullstack-frontend](https://hub.docker.com/r/omaraldesi/fullstack-frontend)

```bash
# Pull images
docker pull omaraldesi/fullstack-backend:latest
docker pull omaraldesi/fullstack-frontend:latest

# Run with Docker Compose
docker-compose -f docker-compose.hub.yml up -d
```

## 🚀 CI/CD

GitHub Actions pipeline includes:

- Automated testing
- Docker image building
- Push to Docker Hub
- Code quality checks

## 🔧 Environment Variables

```env
# Backend (.env)
NODE_ENV=production
PORT=5000
DB_HOST=postgres
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-jwt-secret

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📱 Usage

1. **Register/Login** at http://localhost:3000
2. **Create tasks** using the "Add Task" button
3. **Drag tasks** between columns to change status
4. **Edit tasks** by clicking on any task card
5. **Search tasks** using the search bar

## 🧪 Key Implementation Details

- **Drag & Drop**: Maintains position order in database
- **Optimistic Updates**: UI responds immediately, reverts on errors
- **Modern React**: Hooks, Context API, TypeScript
- **Security**: JWT tokens, bcrypt hashing, input validation
- **Performance**: Memoization, lazy loading, SSR
- **Code Quality**: Clean architecture, SOLID principles

## 📋 Assignment Requirements ✅

- ✅ Full-stack with Node.js + React + PostgreSQL
- ✅ JWT authentication system
- ✅ Drag & drop Kanban board
- ✅ Task CRUD operations
- ✅ Modal editing with validation
- ✅ Docker containerization
- ✅ Docker Hub deployment
- ✅ Comprehensive documentation
- ✅ Modern project structure with ORM

## 🚨 Troubleshooting

**Port conflicts**: Update ports in docker-compose.yml  
**Database issues**: Run `docker-compose down -v` and restart  
**Build errors**: Try `docker-compose build --no-cache`

## 📄 License

MIT License - feel free to use this project as a reference.

---

> Built with modern web development best practices for a Senior Full-Stack Developer position.

```

```
