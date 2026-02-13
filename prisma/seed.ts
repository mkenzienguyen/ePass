import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create a demo user
  const hashedPassword = await bcrypt.hash('password123', 10)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@testprep.com' },
    update: {},
    create: {
      email: 'demo@testprep.com',
      name: 'Demo User',
      password: hashedPassword,
      role: 'STUDENT',
    },
  })

  console.log('Created demo user:', demoUser.email)

  // Sample SAT Reading Questions
  const satReadingQuestions = [
    {
      testType: 'SAT',
      section: 'Reading',
      difficulty: 'MEDIUM',
      passage:
        'The industrial revolution brought about significant changes in the way people lived and worked. Prior to this period, most goods were produced by hand in small workshops or at home. With the advent of machinery and factories, production became faster and more efficient, leading to the growth of cities as people moved from rural areas to find work in urban centers.',
      question:
        'According to the passage, what was a major consequence of the industrial revolution?',
      options: JSON.stringify([
        'A decrease in production efficiency',
        'The growth of cities',
        'A return to handmade goods',
        'The decline of rural populations',
      ]),
      correctAnswer: 'The growth of cities',
      explanation:
        'The passage explicitly states that the industrial revolution led to "the growth of cities as people moved from rural areas to find work in urban centers."',
      tags: ['history', 'industrial-revolution', 'social-change'],
    },
    {
      testType: 'SAT',
      section: 'Reading',
      difficulty: 'EASY',
      passage:
        'Photosynthesis is the process by which plants convert light energy into chemical energy. During this process, plants absorb carbon dioxide from the air and water from the soil, using sunlight to transform these into glucose and oxygen.',
      question: 'What do plants produce during photosynthesis?',
      options: JSON.stringify([
        'Carbon dioxide and water',
        'Glucose and oxygen',
        'Sunlight and nutrients',
        'Chlorophyll and energy',
      ]),
      correctAnswer: 'Glucose and oxygen',
      explanation:
        'The passage clearly states that plants use sunlight to transform carbon dioxide and water into "glucose and oxygen."',
      tags: ['science', 'biology', 'photosynthesis'],
    },
  ]

  // Sample SAT Math Questions
  const satMathQuestions = [
    {
      testType: 'SAT',
      section: 'Math',
      difficulty: 'MEDIUM',
      question: 'If 3x + 7 = 22, what is the value of x?',
      options: JSON.stringify(['3', '5', '7', '9']),
      correctAnswer: '5',
      explanation:
        'To solve: 3x + 7 = 22. Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5.',
      tags: ['algebra', 'linear-equations'],
    },
    {
      testType: 'SAT',
      section: 'Math',
      difficulty: 'HARD',
      question:
        'A circle has a radius of 5. What is the area of the circle? (Use π ≈ 3.14)',
      options: JSON.stringify(['15.7', '31.4', '78.5', '157']),
      correctAnswer: '78.5',
      explanation:
        'Area = πr². With r = 5: Area = π × 5² = π × 25 ≈ 3.14 × 25 = 78.5',
      tags: ['geometry', 'circles', 'area'],
    },
  ]

  // Sample IELTS Reading Questions
  const ieltsReadingQuestions = [
    {
      testType: 'IELTS',
      section: 'Reading',
      difficulty: 'MEDIUM',
      passage:
        'Climate change is one of the most pressing issues facing our planet today. Rising global temperatures have led to melting ice caps, rising sea levels, and more frequent extreme weather events. Scientists agree that human activities, particularly the burning of fossil fuels, are the primary drivers of these changes.',
      question: 'What do scientists identify as the main cause of climate change?',
      options: JSON.stringify([
        'Natural weather patterns',
        'Solar activity',
        'Human activities and fossil fuels',
        'Ocean currents',
      ]),
      correctAnswer: 'Human activities and fossil fuels',
      explanation:
        'The passage states that "Scientists agree that human activities, particularly the burning of fossil fuels, are the primary drivers of these changes."',
      tags: ['environment', 'climate-change', 'science'],
    },
  ]

  // Sample IELTS Listening Questions
  const ieltsListeningQuestions = [
    {
      testType: 'IELTS',
      section: 'Listening',
      difficulty: 'EASY',
      question:
        'You hear: "The library opens at 9 AM and closes at 6 PM on weekdays." What time does the library close on weekdays?',
      options: JSON.stringify(['5 PM', '6 PM', '7 PM', '8 PM']),
      correctAnswer: '6 PM',
      explanation: 'The speaker clearly states the library closes at 6 PM on weekdays.',
      tags: ['time', 'schedule', 'daily-life'],
    },
  ]

  // Combine all questions
  const allQuestions = [
    ...satReadingQuestions,
    ...satMathQuestions,
    ...ieltsReadingQuestions,
    ...ieltsListeningQuestions,
  ]

  // Insert questions
  for (const question of allQuestions) {
    await prisma.question.create({
      data: question as any,
    })
  }

  console.log(`Created ${allQuestions.length} sample questions`)

  console.log('Database seed completed!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
