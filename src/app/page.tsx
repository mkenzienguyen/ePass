import Link from 'next/link'
import { ArrowRight, BookOpen, Target, TrendingUp, Award, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="flex-1 pt-20 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 py-20">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Free Digital Test Prep Platform
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Master SAT & IELTS
              <br />
              <span className="gradient-primary bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Access thousands of practice questions, personalized study plans, and detailed analytics to achieve your target score
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/signup">
                <Button size="lg" className="gradient-primary text-white px-8 py-6 text-lg">
                  Start Free Practice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <div className="flex gap-8 justify-center items-center pt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>50,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>10,000+ Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools and resources for SAT and IELTS preparation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 card-hover border-2">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Extensive Question Bank</h3>
              <p className="text-gray-600">
                Access over 10,000 authentic practice questions for both SAT and IELTS, organized by topic and difficulty
              </p>
            </Card>
            
            <Card className="p-8 card-hover border-2">
              <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Adaptive Practice</h3>
              <p className="text-gray-600">
                AI-powered adaptive learning that adjusts to your skill level and focuses on areas needing improvement
              </p>
            </Card>
            
            <Card className="p-8 card-hover border-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
              <p className="text-gray-600">
                Track your progress with detailed analytics, score predictions, and personalized insights
              </p>
            </Card>
            
            <Card className="p-8 card-hover border-2">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Timed Practice Tests</h3>
              <p className="text-gray-600">
                Simulate real exam conditions with full-length practice tests and section-specific drills
              </p>
            </Card>
            
            <Card className="p-8 card-hover border-2">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Explanations</h3>
              <p className="text-gray-600">
                Every question comes with detailed explanations and solving strategies from test prep experts
              </p>
            </Card>
            
            <Card className="p-8 card-hover border-2">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Study Groups</h3>
              <p className="text-gray-600">
                Join study groups, share notes, and learn collaboratively with peers preparing for the same test
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Test Type Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Test
            </h2>
            <p className="text-xl text-gray-600">
              Specialized preparation for SAT and IELTS exams
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 card-hover border-2 bg-white">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl font-bold text-white">SAT</span>
                </div>
                <h3 className="text-2xl font-bold">SAT Preparation</h3>
                <p className="text-gray-600">
                  Complete prep for all SAT sections: Reading, Writing and Language, Math (Calculator & No Calculator)
                </p>
                <ul className="text-left space-y-2 text-gray-700 pt-4">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>4,000+ practice questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Full-length practice tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Section-specific drills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Score prediction algorithm</span>
                  </li>
                </ul>
                <Link href="/dashboard?test=SAT">
                  <Button className="gradient-primary text-white w-full mt-4">
                    Start SAT Practice
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="p-8 card-hover border-2 bg-white">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">IELTS</span>
                </div>
                <h3 className="text-2xl font-bold">IELTS Preparation</h3>
                <p className="text-gray-600">
                  Master all IELTS sections: Listening, Reading, Writing, and Speaking with authentic practice materials
                </p>
                <ul className="text-left space-y-2 text-gray-700 pt-4">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>6,000+ practice questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Speaking test simulator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Writing task feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Band score calculator</span>
                  </li>
                </ul>
                <Link href="/dashboard?test=IELTS">
                  <Button className="gradient-secondary text-white w-full mt-4">
                    Start IELTS Practice
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary">
        <div className="max-w-4xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Ready to Achieve Your Target Score?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of students who have improved their scores with our platform
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
