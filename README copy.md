# TestPrep Pro - SAT & IELTS Test Preparation Platform

A modern, full-stack test preparation platform built with the latest technologies to help students master SAT and IELTS exams.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with server-side rendering
- **React 18** - UI library
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Reusable component library
- **Framer Motion** - Animation library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **tRPC** - End-to-end typesafe APIs
- **Prisma** - Modern ORM for database access
- **PostgreSQL** - Relational database
- **NextAuth.js** - Authentication solution

### State Management
- **TanStack Query** (React Query) - Server state management
- **Zustand** - Client state management

## ✨ Features

- 🎯 **Comprehensive Question Bank**: 10,000+ practice questions for SAT and IELTS
- 📊 **Performance Analytics**: Track progress with detailed statistics and insights
- 🧪 **Full-Length Practice Tests**: Simulate real exam conditions
- 📚 **Section-Specific Practice**: Focus on individual test sections
- 🔖 **Bookmark System**: Save questions for later review
- 📈 **Progress Tracking**: Monitor improvement over time
- 🎨 **Modern UI/UX**: Clean, responsive design inspired by OnePrep
- 🔐 **Secure Authentication**: Email/password authentication with NextAuth
- ⚡ **Fast Performance**: Optimized with caching and server components
- 📱 **Fully Responsive**: Works seamlessly on all devices

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd test-prep-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your values:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/testprep?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

To generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

4. **Set up the database**
```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to your database
npx prisma db push

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

5. **Seed the database (optional)**
Create a seed file at `prisma/seed.ts` to populate initial data, then run:
```bash
npx prisma db seed
```

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
test-prep-platform/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js 14 app directory
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Dashboard page
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── navigation.tsx    # Navigation component
│   │   ├── footer.tsx        # Footer component
│   │   └── providers.tsx     # Context providers
│   ├── lib/
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── prisma.ts         # Prisma client
│   │   └── utils.ts          # Utility functions
│   ├── server/
│   │   ├── routers/          # tRPC routers
│   │   ├── context.ts        # tRPC context
│   │   └── trpc.ts           # tRPC initialization
│   └── utils/
│       └── trpc.ts           # tRPC client utilities
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔑 Key Features Breakdown

### Authentication
- Secure email/password authentication
- Session-based authentication with JWT
- Protected routes with middleware
- User profile management

### Question Bank
- Filter by test type (SAT/IELTS)
- Filter by section (Reading, Writing, Math, etc.)
- Filter by difficulty (Easy, Medium, Hard)
- Random question selection
- Bookmark functionality

### Practice Tests
- Create full-length practice tests
- Section-specific practice
- Timer functionality
- Automatic scoring
- Detailed explanations

### Progress Tracking
- Overall accuracy tracking
- Section-wise performance
- Historical data visualization
- Strength/weakness analysis
- Study streak tracking

## 🎨 UI/UX Features

- Modern gradient designs
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Loading states and skeletons
- Error handling with user-friendly messages
- Accessible components (WCAG compliant)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```bash
# Build the image
docker build -t testprep-platform .

# Run the container
docker run -p 3000:3000 testprep-platform
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (add test scripts as needed)
npm test
```

## 📚 API Documentation

The API is built with tRPC, providing end-to-end type safety. Main routers include:

- **question**: Question CRUD operations, filtering, and submission
- **test**: Test attempt management and scoring
- **progress**: User progress tracking and analytics
- **user**: User profile and dashboard statistics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from [OnePrep.xyz](https://oneprep.xyz)
- UI components from Shadcn/UI
- Icons from Lucide React

## 📧 Support

For support, email support@testprep.com or open an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
