# Deployment Guide

This guide covers deployment options for the Contacts App on various platforms.

## 🚀 Quick Deployment Options

### 1. Vercel (Frontend) + Railway (Backend) - Recommended

#### Frontend on Vercel

1. **Connect Repository**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `frontend` directory as root

2. **Environment Variables**

   ```env
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

3. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `yarn build`
   - Output Directory: `dist`
   - Install Command: `yarn install`

#### Backend on Railway

1. **Connect Repository**

   - Go to [railway.app](https://railway.app)
   - Deploy from GitHub repo
   - Select the `backend` directory

2. **Environment Variables**

   ```env
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

3. **Add MongoDB**
   - Add MongoDB plugin in Railway
   - Use the provided connection string

### 2. Docker Deployment

#### Using Docker Compose

```bash
# Clone repository
git clone <your-repo>
cd contacts_app

# Set environment variables
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env
# Edit .env files with your values

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f
```

#### Manual Docker Build

```bash
# Build backend
cd backend
docker build -t contacts-backend .
docker run -d -p 3000:3000 --env-file .env contacts-backend

# Build frontend
cd frontend
docker build -t contacts-frontend .
docker run -d -p 80:80 contacts-frontend
```

### 3. Self-Hosted Server

#### Prerequisites

- Ubuntu 20.04+ server
- Docker & Docker Compose
- Nginx
- SSL certificate (Let's Encrypt)

#### Setup Steps

1. **Server Preparation**

   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Deploy Application**

   ```bash
   # Clone repository
   git clone <your-repo>
   cd contacts_app

   # Configure environment
   cp backend/env.example backend/.env
   cp frontend/env.example frontend/.env
   # Edit .env files

   # Start services
   docker-compose up -d
   ```

3. **Nginx Configuration**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name your-domain.com;

       ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

       # Frontend
       location / {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Backend API
       location /api/ {
           proxy_pass http://localhost:3000/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **SSL Certificate**

   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx

   # Get certificate
   sudo certbot --nginx -d your-domain.com
   ```

## 🔧 Environment Configuration

### Production Environment Variables

#### Backend (.env)

```env
# Required
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contacts_app
JWT_SECRET=your-64-character-secret-key
JWT_REFRESH_SECRET=your-64-character-refresh-secret

# Security
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Optional: Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@yourdomain.com

# Optional: Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Frontend (.env)

```env
VITE_API_URL=https://your-backend-domain.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_APP_NAME=Contacts App
VITE_APP_VERSION=1.0.0
```

## 🔒 Security Checklist

- [ ] Change default JWT secrets
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable security headers
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up error tracking
- [ ] Test security measures

## 📊 Monitoring & Logging

### Health Checks

- Backend: `GET /health`
- Frontend: `GET /health`

### Logging

- Backend uses structured logging with Pino
- Logs are available in Docker containers
- Consider using external logging services (DataDog, Loggly, etc.)

### Monitoring

- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor application metrics
- Set up alerts for critical issues

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow that:

1. Runs tests and linting
2. Builds the application
3. Runs security audits
4. Deploys to staging/production

### Manual Deployment

```bash
# Build and deploy
yarn build
docker-compose up -d

# Rollback if needed
docker-compose down
docker-compose up -d --force-recreate
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Check CORS_ORIGIN configuration
   - Ensure frontend URL is included

2. **Database Connection**

   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure database is accessible

3. **Build Failures**

   - Check Node.js version (>=18)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

4. **Performance Issues**
   - Monitor memory usage
   - Check database indexes
   - Optimize queries

### Debug Commands

```bash
# Check container logs
docker-compose logs -f [service-name]

# Check application health
curl http://localhost:3000/health

# Check environment variables
docker-compose exec backend env

# Access container shell
docker-compose exec backend sh
```

## 📈 Scaling

### Horizontal Scaling

- Use load balancer (nginx, HAProxy)
- Deploy multiple backend instances
- Use MongoDB Atlas for database scaling

### Vertical Scaling

- Increase container resources
- Optimize application code
- Use caching (Redis)

## 🔄 Backup Strategy

### Database Backup

```bash
# MongoDB backup
mongodump --uri="your-mongodb-uri" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="your-mongodb-uri" /backup/20231201/
```

### Application Backup

- Backup environment files
- Backup SSL certificates
- Backup nginx configuration

## 📞 Support

For deployment issues:

1. Check the logs
2. Verify environment variables
3. Test locally first
4. Check security settings
5. Review monitoring data

---

**Remember**: Always test deployment in a staging environment first!
