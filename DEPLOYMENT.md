# Deployment Guide

This guide covers multiple deployment options for the TestPrep Pro platform.

## Table of Contents
1. [Vercel Deployment (Recommended)](#vercel-deployment)
2. [Docker Deployment](#docker-deployment)
3. [Traditional VPS Deployment](#vps-deployment)
4. [Environment Variables](#environment-variables)

---

## Vercel Deployment

Vercel is the recommended deployment platform for Next.js applications.

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free)
- PostgreSQL database (use Vercel Postgres or external provider)

### Steps

1. **Push your code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository
- Vercel will auto-detect Next.js

3. **Configure Environment Variables**
Add these in Vercel dashboard under Settings → Environment Variables:
```
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

4. **Set up Database**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy and get environment
vercel env pull

# Push database schema
npx prisma db push

# Seed database (optional)
npm run db:seed
```

5. **Deploy**
- Click "Deploy" in Vercel dashboard
- Your app will be live at `your-app.vercel.app`

### Custom Domain
1. Go to Settings → Domains in Vercel
2. Add your custom domain
3. Configure DNS records as shown

---

## Docker Deployment

Deploy using Docker containers for full control.

### Prerequisites
- Docker installed
- Docker Compose installed
- PostgreSQL database (or use docker-compose)

### Quick Start with Docker Compose

1. **Build and run**
```bash
docker-compose up -d
```

This starts:
- PostgreSQL database on port 5432
- Next.js app on port 3000

2. **Initialize database**
```bash
# Access app container
docker-compose exec app sh

# Push schema
npx prisma db push

# Seed data
npm run db:seed
```

3. **Access application**
Open http://localhost:3000

### Production Docker Deployment

1. **Build image**
```bash
docker build -t testprep-platform .
```

2. **Run container**
```bash
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="your_connection_string" \
  -e NEXTAUTH_SECRET="your_secret" \
  -e NEXTAUTH_URL="https://your-domain.com" \
  --name testprep \
  testprep-platform
```

3. **Using Docker Hub**
```bash
# Tag image
docker tag testprep-platform username/testprep-platform:latest

# Push to Docker Hub
docker push username/testprep-platform:latest

# Pull and run on server
docker pull username/testprep-platform:latest
docker run -d -p 3000:3000 --env-file .env username/testprep-platform:latest
```

---

## VPS Deployment

Deploy on a traditional VPS (DigitalOcean, AWS EC2, Linode, etc.)

### Prerequisites
- Ubuntu 22.04 LTS server
- Root or sudo access
- Domain name (optional)

### Steps

1. **Connect to server**
```bash
ssh user@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PostgreSQL**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE testprep;
CREATE USER testprepuser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE testprep TO testprepuser;
\q
```

4. **Clone and setup application**
```bash
# Clone repository
git clone your-repo-url
cd test-prep-platform

# Install dependencies
npm install

# Create .env file
cp .env.example .env
nano .env
# Add your environment variables

# Build application
npm run build

# Setup database
npx prisma db push
npm run db:seed
```

5. **Setup PM2 for process management**
```bash
# Install PM2
sudo npm install -g pm2

# Start application
pm2 start npm --name "testprep" -- start

# Setup auto-restart on server reboot
pm2 startup
pm2 save
```

6. **Setup Nginx reverse proxy**
```bash
# Install Nginx
sudo apt install nginx

# Create config
sudo nano /etc/nginx/sites-available/testprep
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/testprep /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Setup SSL with Let's Encrypt**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is setup automatically
```

---

## Environment Variables

### Required Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"  # Change to your domain in production
```

### Optional Variables

```env
# Email (for password reset, notifications)
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="noreply@testprep.com"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Feature Flags
NEXT_PUBLIC_ENABLE_SIGNUP="true"
```

### Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## Database Providers

### Vercel Postgres
- Integrated with Vercel
- Automatic backups
- Free tier available
- Get connection string from Vercel dashboard

### Supabase
- Free tier: 500MB database
- Built-in auth & storage
- Dashboard: https://supabase.com
- Connection string format: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### Railway
- Free tier: $5 credit/month
- Easy PostgreSQL setup
- Dashboard: https://railway.app
- One-click database deployment

### Neon
- Serverless Postgres
- Free tier: 3GB storage
- Dashboard: https://neon.tech
- Automatic scaling

---

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Database seeded with sample data (optional)
- [ ] SSL certificate installed
- [ ] Custom domain configured
- [ ] Monitoring setup (optional)
- [ ] Backup strategy in place
- [ ] Error tracking configured (Sentry, etc.)

---

## Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db push --preview-feature
```

### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 PID
```

---

## Monitoring & Maintenance

### Application Logs
```bash
# PM2 logs
pm2 logs testprep

# Docker logs
docker logs testprep

# Vercel logs
vercel logs
```

### Database Backups
```bash
# PostgreSQL backup
pg_dump -h hostname -U username -d testprep > backup.sql

# Restore
psql -h hostname -U username -d testprep < backup.sql
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Rebuild
npm run build

# Restart (PM2)
pm2 restart testprep

# Restart (Docker)
docker-compose restart
```

---

## Support

For deployment issues:
- Check logs first
- Review environment variables
- Verify database connectivity
- Consult platform-specific documentation

Happy deploying! 🚀
