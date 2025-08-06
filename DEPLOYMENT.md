# 🚀 Deployment Guide

## Production Deployment Checklist

### 1. Environment Setup

#### Required Environment Variables

Create `.env` files for both backend and frontend:

**Backend (.env)**

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Database
MONGODB_URI=mongodb://your-mongodb-uri
MONGO_ROOT_USERNAME=your-mongo-username
MONGO_ROOT_PASSWORD=your-secure-mongo-password

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@yourdomain.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Security
SESSION_SECRET=your-session-secret-key
```

**Frontend (.env)**

```env
VITE_API_URL=https://your-backend-domain.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_APP_NAME=Contacts App
VITE_APP_VERSION=1.0.0
```

### 2. Security Checklist

- [ ] Change all default passwords
- [ ] Use strong, unique secrets for JWT
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Configure file upload restrictions
- [ ] Set up monitoring and logging

### 3. Database Setup

#### MongoDB Atlas (Recommended)

1. Create MongoDB Atlas cluster
2. Set up database user with proper permissions
3. Configure network access (IP whitelist)
4. Get connection string
5. Update `MONGODB_URI` in environment variables

#### Local MongoDB

```bash
# Install MongoDB
sudo apt-get install mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database user
mongo
use admin
db.createUser({
  user: "admin",
  pwd: "secure-password",
  roles: ["root"]
})
```

### 4. Docker Deployment

#### Production Build

```bash
# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Environment Variables for Docker

Create `.env` file in root directory:

```env
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your-secure-password
```

### 5. Manual Deployment

#### Backend Deployment

```bash
# Install dependencies
cd backend
yarn install --production

# Build application
yarn build

# Start production server
yarn start:prod
```

#### Frontend Deployment

```bash
# Install dependencies
cd frontend
yarn install

# Build for production
yarn build

# Serve with nginx or any static file server
```

### 6. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7. SSL Certificate Setup

#### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 8. Monitoring Setup

#### Health Checks

```bash
# Backend health check
curl https://your-domain.com/api/health

# Frontend health check
curl https://your-domain.com/
```

#### Log Monitoring

```bash
# View application logs
docker-compose logs -f backend

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 9. Backup Strategy

#### Database Backup

```bash
# MongoDB backup
mongodump --uri="mongodb://username:password@host:port/database" --out=/backup/path

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGODB_URI" --out="/backups/$DATE"
```

#### File Backup

```bash
# Backup uploads directory
tar -czf /backups/uploads_$(date +%Y%m%d).tar.gz /path/to/uploads
```

### 10. Troubleshooting

#### Common Issues

1. **CORS Errors**

   - Check CORS_ORIGIN configuration
   - Ensure frontend URL is included

2. **Database Connection Issues**

   - Verify MongoDB URI
   - Check network connectivity
   - Ensure proper authentication

3. **File Upload Failures**

   - Check Cloudinary configuration
   - Verify file size limits
   - Check file type restrictions

4. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration settings
   - Ensure proper token refresh flow

#### Performance Optimization

1. **Enable Gzip Compression**
2. **Set up CDN for static assets**
3. **Configure database indexes**
4. **Implement caching strategy**
5. **Monitor and optimize slow queries**

### 11. Maintenance

#### Regular Tasks

- [ ] Monitor application logs
- [ ] Check database performance
- [ ] Update dependencies
- [ ] Review security settings
- [ ] Backup verification
- [ ] SSL certificate renewal

#### Update Process

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Verify deployment
curl https://your-domain.com/api/health
```

---

**⚠️ Important Notes:**

1. Never commit `.env` files to version control
2. Use strong, unique passwords for all services
3. Regularly update dependencies for security patches
4. Monitor application performance and logs
5. Keep backups in multiple locations
6. Test deployment process regularly
