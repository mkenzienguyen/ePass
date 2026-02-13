# Quick Start Guide

Get TestPrep Pro up and running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm or yarn

## Installation Steps

### 1. Clone and Install

```bash
# Navigate to project directory
cd test-prep-platform

# Install dependencies
npm install
```

### 2. Setup Database

```bash
# Start PostgreSQL (if not running)
# On macOS with Homebrew:
brew services start postgresql

# On Ubuntu:
sudo systemctl start postgresql

# On Windows, start PostgreSQL from Services
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings
nano .env
```

Minimum required configuration:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/testprep?schema=public"
NEXTAUTH_SECRET="run-openssl-rand-base64-32-to-generate"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database schema
npx prisma db push

# Seed with sample data (optional but recommended)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Demo Account

After seeding the database, you can use:
- **Email**: demo@testprep.com
- **Password**: password123

## Next Steps

1. **Create Your Account**: Sign up at `/signup`
2. **Explore Dashboard**: View your stats and progress
3. **Start Practicing**: Choose SAT or IELTS practice
4. **Take a Test**: Try a full-length practice test

## Common Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# View database in browser
npx prisma studio

# Run database migrations
npx prisma db push

# Seed database
npm run db:seed

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### Port 3000 Already in Use
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

- Use Prisma Studio to view/edit database: `npx prisma studio`
- Check logs in terminal for API errors
- Use React DevTools browser extension
- Enable TypeScript strict mode for better type safety

## File Structure Overview

```
src/
├── app/              # Next.js 14 pages & routes
├── components/       # Reusable React components
├── lib/             # Utility functions & configs
├── server/          # Backend tRPC routers
└── utils/           # Helper utilities

Key files:
- prisma/schema.prisma - Database models
- src/app/page.tsx - Home page
- src/app/dashboard/page.tsx - User dashboard
- src/lib/auth.ts - Authentication config
```

## Need Help?

- 📖 Read the [full README](README.md)
- 🚀 Check [deployment guide](DEPLOYMENT.md)
- 💬 Open an issue on GitHub
- 📧 Contact: support@testprep.com

Happy coding! 🎉
