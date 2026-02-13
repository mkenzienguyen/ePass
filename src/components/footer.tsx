import Link from 'next/link'
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white text-xl">TestPrep Pro</span>
            </div>
            <p className="text-sm">
              Your comprehensive platform for SAT and IELTS test preparation with expert guidance and practice materials.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tests */}
          <div>
            <h3 className="font-semibold text-white mb-4">Tests</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard?test=SAT" className="hover:text-white transition-colors">
                  SAT Preparation
                </Link>
              </li>
              <li>
                <Link href="/dashboard?test=IELTS" className="hover:text-white transition-colors">
                  IELTS Preparation
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-white transition-colors">
                  Practice Questions
                </Link>
              </li>
              <li>
                <Link href="/tests" className="hover:text-white transition-colors">
                  Full-Length Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/study-guides" className="hover:text-white transition-colors">
                  Study Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/tips" className="hover:text-white transition-colors">
                  Test-Taking Tips
                </Link>
              </li>
              <li>
                <Link href="/resources/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} TestPrep Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
