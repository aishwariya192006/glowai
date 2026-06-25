import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function JobDetailsPage() {
  const { id } = useParams();

  // In a real app, you would fetch job details based on ID
  const job = {
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Chennai (Hybrid)',
    type: 'Full-time',
    description: 'We are looking for an experienced Senior Full Stack Engineer to help build the future of our AI-powered beauty marketplace. You will be responsible for architecting and developing core features across our Next.js frontend and Node.js backend services.',
    responsibilities: [
      'Lead the development of complex, scalable web applications using React, TypeScript, and Node.js.',
      'Architect and implement secure, high-performance APIs and microservices.',
      'Mentor junior engineers and drive engineering best practices across the team.',
      'Collaborate closely with Product and Design teams to translate requirements into technical solutions.',
      'Optimize application performance and ensure a seamless user experience.'
    ],
    requirements: [
      '5+ years of professional software engineering experience.',
      'Deep expertise in modern JavaScript/TypeScript, React, and Node.js.',
      'Experience designing and building RESTful or GraphQL APIs.',
      'Strong understanding of relational databases (PostgreSQL) and caching (Redis).',
      'Experience with cloud platforms (AWS, GCP) and containerization (Docker).',
      'Excellent problem-solving skills and a product-minded approach to engineering.'
    ],
    benefits: [
      'Competitive salary and equity package.',
      'Comprehensive health insurance for you and your family.',
      'Flexible working hours and hybrid work model.',
      'Annual learning and development stipend.',
      'Generous paid time off and mental health days.'
    ]
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-rose-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all open roles
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-rose-500" />
                  {job.department}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-rose-500" />
                  {job.type}
                </span>
              </div>
            </div>
            <button className="shrink-0 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg transition-colors w-full md:w-auto">
              Apply for this role
            </button>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-8" />

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Role</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {job.description}
            </p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You'll Do</h3>
            <ul className="space-y-3 mb-8">
              {job.responsibilities.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">{req}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What We're Looking For</h3>
            <ul className="space-y-3 mb-8">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">{req}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benefits & Perks</h3>
            <ul className="space-y-3 mb-12">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 text-center">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to join us?</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Take the next step in your career and help us build the future.</p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all">
              Submit Application
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
