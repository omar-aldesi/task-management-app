Perfect! Now I can see this is actually a **Task Management Application** based on the assignment document. Let me create a proper README that matches your actual project structure and requirements.

## Updated README.md for Task Management Application

````markdown
# Task Management Application

A full-stack task management application built with Node.js/Express backend, Next.js frontend, and PostgreSQL database. Features drag-and-drop task boards, real-time updates, and JWT authentication.

![Task Management Dashboard](https://via.placeholder.com/800x400?text=Task+Management+Dashboard)

## 🚀 Quick Start with Docker Hub

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Run from Docker Hub (Recommended)

```bash
# Clone the repository
git clone https://github.com/omaraldesi/task-management-app.git
cd task-management-app

# Create environment file
cp .env.example .env

# Pull and run the application
docker-compose -f docker-compose.hub.yml up -d
```
````

**Access the application:**

- 🎯 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5000
- 🗄️ **Database**: localhost:5432
- 📚 **API Documentation**: http://localhost:5000/api-docs

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Secure password hashing
- Protected routes

### 📋 Task Management

- **Drag & Drop**: Move tasks between columns (Todo, In Progress, Done)
- **Position Tracking**: Maintains task order within columns
- **Real-time Updates**: Optimistic UI updates with error handling
- **Task Editing**: Click any task to edit in modal
- **Search & Filter**: Find tasks by title
- **CRUD Operations**: Create, read, update, delete tasks

### 🎨 User Interface

- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Built with Ant Design components
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **SSR Support**: Server-side rendering for better performance

## 🏗️ Project Structure

```
├── backend/                    # Node.js/Express API
│   ├── config/                # Database and JWT configuration
│   ├── controllers/           # Route controllers
│   ├── docs/                  # Swagger API documentation
│   ├── middlewares/           # Authentication and logging
│   ├── migrations/            # Database migrations
│   ├── models/                # Sequelize models
│   └── routes/                # API routes
├── frontend/                  # Next.js React application
│   ├── app/                   # App Router pages
│   ├── components/            # Reusable UI components
│   ├── context/               # React Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── services/              # API service functions
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper functions
├── docker-compose.yml         # Local development
├── docker-compose.hub.yml     # Docker Hub deployment
└── README.md                  # Project documentation
```

## 🛠️ Local Development Setup

### Backend Setup

```bash
cd backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run migrate

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

### Database Setup

```bash
# Create PostgreSQL database
createdb task_management

# Or using Docker
docker run --name postgres \
  -e POSTGRES_DB=task_management \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 -d postgres:15-alpine
```

## 🐳 Docker Development

### Build and Run Locally

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Database Migrations

```bash
# Run migrations inside container
docker exec -it fullstack_backend npm run migrate

# Or run manually
docker exec -it fullstack_backend npx sequelize-cli db:migrate
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Task Endpoints

#### Get User Tasks (Paginated)

```http
GET /api/tasks?page=1&limit=10&status=todo
Authorization: Bearer <jwt_token>
```

#### Create Task

```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "todo",
  "position": 1
}
```

#### Update Task

```http
PATCH /api/tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "in_progress",
  "position": 2
}
```

#### Delete Task

```http
DELETE /api/tasks/:id
Authorization: Bearer <jwt_token>
```

### Example cURL Commands

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get tasks (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description","status":"todo"}'
```

## 🌍 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-super-secret-jwt-key
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🗄️ Database Schema

### User Entity

- `uuid` (UUID, Primary Key)
- `name` (String, Required)
- `email` (String, Unique, Required)
- `password` (String, Hashed, Required)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Task Entity

- `uuid` (UUID, Primary Key)
- `title` (String, Required)
- `description` (Text, Optional)
- `status` (Enum: 'todo', 'in_progress', 'done')
- `position` (Integer, for drag-and-drop ordering)
- `userId` (UUID, Foreign Key)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- `deletedAt` (DateTime, Soft Delete)

## 🐋 Docker Hub Images

- **Backend**: [omaraldesi/fullstack-backend](https://hub.docker.com/r/omaraldesi/fullstack-backend)
- **Frontend**: [omaraldesi/fullstack-frontend](https://hub.docker.com/r/omaraldesi/fullstack-frontend)

### Pull Images Manually

```bash
docker pull omaraldesi/fullstack-backend:latest
docker pull omaraldesi/fullstack-frontend:latest
```

## 🔧 Tech Stack

### Backend

- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Documentation**: Swagger/OpenAPI
- **Security**: bcrypt, helmet, cors

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Ant Design (ANTD)
- **Drag & Drop**: @dnd-kit/core
- **State Management**: React Context API
- **HTTP Client**: Axios

### DevOps

- **Containerization**: Docker & Docker Compose
- **Registry**: Docker Hub
- **Database**: PostgreSQL (containerized)

## 🎮 Usage Guide

### 1. Register/Login

- Navigate to http://localhost:3000
- Create a new account or login with existing credentials
- You'll be redirected to the task dashboard

### 2. Task Management

- **Create Tasks**: Click "Add Task" button
- **Edit Tasks**: Click on any task to open edit modal
- **Drag & Drop**: Drag tasks between columns or reorder within columns
- **Delete Tasks**: Use delete button in task modal
- **Search**: Use search bar to filter tasks by title

### 3. Task Statuses

- **Todo**: New tasks waiting to be started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks

## 🚨 Troubleshooting

### Port Conflicts

If you encounter port conflicts, update ports in docker-compose.yml:

```yaml
services:
  frontend:
    ports:
      - "3001:3000" # Change to 3001
  backend:
    ports:
      - "5001:5000" # Change to 5001
```

### Database Connection Issues

1. Ensure PostgreSQL container is running
2. Check database credentials in .env
3. Verify database exists
4. Run migrations: `docker exec -it fullstack_backend npm run migrate`

### Migration Errors

```bash
# Reset database (WARNING: This will delete all data)
docker exec -it fullstack_backend npx sequelize-cli db:drop
docker exec -it fullstack_backend npx sequelize-cli db:create
docker exec -it fullstack_backend npx sequelize-cli db:migrate
```

### Docker Issues

```bash
# Clean up Docker
docker-compose down -v
docker system prune -f

# Rebuild containers
docker-compose build --no-cache
docker-compose up
```

## 📊 Performance Features

- **Optimistic Updates**: UI updates immediately, reverts on error
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo for performance
- **Debounced Search**: Efficient search with debouncing
- **Connection Pooling**: Database connection optimization

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **SQL Injection Protection**: Sequelize ORM prevents SQL injection
- **Rate Limiting**: API rate limiting (if implemented)

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation at http://localhost:5000/api-docs
3. Open an issue on GitHub

````

## Supporting Files to Create

### 1. Create `.env.example` in root:
```env
NODE_ENV=production
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_secure_password
JWT_SECRET=your-super-secret-jwt-key-here
````

### 2. Update `docker-compose.hub.yml` with correct database name:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15-alpine
    container_name: fullstack_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_NAME:-task_management} # Changed from 'soof'
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-omar0921}
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  backend:
    image: omaraldesi/fullstack-backend:latest
    container_name: fullstack_backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: ${NODE_ENV:-production}
      PORT: 5000
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: ${DB_NAME:-task_management}
      DB_USER: ${DB_USER:-postgres}
      DB_PASSWORD: ${DB_PASSWORD:-omar0921}
      JWT_SECRET: ${JWT_SECRET:-your-super-secret-jwt-key-here}
    depends_on:
      - postgres
    networks:
      - app-network

  frontend:
    image: omaraldesi/fullstack-frontend:latest
    container_name: fullstack_frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_URL: http://localhost:5000/api
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
    driver: local
```

This README now accurately reflects your task management application with the correct API endpoints, database schema, and feature set from the assignment!
