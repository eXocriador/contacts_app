# Contacts App - Full Stack Application

A modern contacts management application built with Node.js/Express/TypeScript backend and React/TypeScript frontend.

## 🚀 Features

- **User Authentication**: JWT-based authentication with refresh tokens
- **Contact Management**: CRUD operations for contacts
- **File Upload**: Image upload support with Cloudinary
- **Google OAuth**: Social login integration
- **Responsive Design**: Modern UI with Tailwind CSS
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**: Rate limiting, CORS, Helmet, input validation
- **Docker Support**: Containerized deployment
- **CI/CD**: GitHub Actions pipeline

## 🏗️ Architecture

```
contacts_app/
├── backend/          # Node.js/Express API
├── frontend/         # React/Vite application
├── docker-compose.yml
└── README.md
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Refresh Tokens
- **File Upload**: Multer + Cloudinary
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting

### Frontend

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios + React Query
- **Routing**: React Router DOM
- **UI Components**: Lucide React Icons

## 📋 Prerequisites

- Node.js >= 18.0.0
- Yarn package manager
- MongoDB (local or cloud)
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd contacts_app
   ```

2. **Start with Docker Compose**

   ```bash
   # Production
   docker-compose up -d

   # Development
   docker-compose --profile dev up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - API Docs: http://localhost:3000/api-docs

### Option 2: Local Development

1. **Backend Setup**

   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your configuration
   yarn install
   yarn dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   cp env.example .env
   # Edit .env with your configuration
   yarn install
   yarn dev
   ```

## 🔧 Environment Variables

### Backend (.env)

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/contacts_app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Optional: Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🐳 Docker Deployment

### Production Build

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Build

```bash
# Start development services
docker-compose --profile dev up -d

# View logs
docker-compose logs -f backend_dev frontend_dev
```

## 📚 API Documentation

The API documentation is automatically generated using Swagger/OpenAPI and is available at:

- **Development**: http://localhost:3000/api-docs
- **Production**: https://your-domain.com/api-docs

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing protection
- **Helmet**: Security headers
- **Input Validation**: Request validation with Joi
- **SQL Injection Protection**: MongoDB with parameterized queries
- **XSS Protection**: Content Security Policy headers

## 🧪 Testing

```bash
# Backend tests
cd backend
yarn test

# Frontend tests
cd frontend
yarn test
```

## 📦 Build for Production

### Backend

```bash
cd backend
yarn build
yarn start:prod
```

### Frontend

```bash
cd frontend
yarn build
# Serve with nginx or any static file server
```

## 🚀 Deployment

### Vercel (Frontend)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Railway/Render (Backend)

1. Connect your repository
2. Set environment variables
3. Deploy automatically

### Self-hosted

1. Build Docker images
2. Deploy to your server with docker-compose
3. Set up reverse proxy (nginx) for SSL

## 🔧 Development Scripts

### Backend

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn build-docs   # Build API documentation
```

### Frontend

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn lint         # Run ESLint
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Express middlewares
│   ├── models/         # MongoDB models
│   ├── routers/        # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── validation/     # Request validation
├── docs/              # API documentation
└── uploads/           # File uploads

frontend/
├── src/
│   ├── api/           # API client
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── store/         # State management
│   └── types/         # TypeScript types
└── public/            # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the API documentation
- Review the logs for debugging

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow that:

- Runs linting and type checking
- Builds the application
- Runs security audits
- Builds and pushes Docker images (on main branch)

## 📊 Monitoring

- Health check endpoints available
- Structured logging with Pino
- Error tracking and monitoring
- Performance metrics

---

**Note**: Remember to change default secrets and passwords in production!
