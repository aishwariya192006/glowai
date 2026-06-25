import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function BlogPostPage() {
  const { id } = useParams();

  // In a real app, you would fetch the post data based on the ID.
  const post = {
    title: "The Rise of AI in Personalized Skincare Routines",
    category: "Beauty Tech",
    date: "Oct 24, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200&h=600",
    author: "Dr. Ananya Iyer",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150",
    content: `
      <p class="lead text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        Artificial intelligence is no longer just a buzzword; it's actively revolutionizing the way we understand our skin and creating hyper-personalized daily regimens that actually work.
      </p>
      
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">The Problem with "One Size Fits All"</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        For decades, the beauty industry has relied on broad categorizations—oily, dry, combination, or sensitive. But human skin is vastly more complex. Factors like local climate (hello, Chennai humidity!), stress levels, diet, and micro-variations in genetics mean that a moisturizer that works miracles for your best friend might cause a breakout for you.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Enter AI Face Analysis</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        With the advent of advanced computer vision and machine learning, platforms like GlowAI can now analyze thousands of data points from a simple selfie. This technology looks beyond the surface, identifying:
      </p>
      <ul class="list-disc pl-6 mb-8 text-gray-700 dark:text-gray-300 space-y-2">
        <li>Micro-pigmentation and sun damage</li>
        <li>Fine lines and structural aging</li>
        <li>Pore depth and sebum distribution</li>
        <li>Hydration levels based on skin texture</li>
      </ul>

      <div class="p-8 my-10 bg-rose-50 dark:bg-rose-950/30 rounded-3xl border border-rose-100 dark:border-rose-900/50">
        <p class="text-lg font-medium text-rose-800 dark:text-rose-300 italic text-center">
          "The future of beauty isn't about covering up; it's about giving your skin exactly what it needs, when it needs it. AI takes the guesswork out of skincare."
        </p>
      </div>

      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Dynamic Routines</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        The true power of AI isn't just in the initial analysis—it's in adaptation. As the seasons change or as you travel, your AI-powered routine adjusts. It tracks your progress over weeks and months, recommending when to introduce a stronger active ingredient or when to dial it back and focus on barrier repair.
      </p>
      
      <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        As this technology becomes more accessible through platforms like GlowAI, we're entering an era where everyone can have a virtual dermatologist in their pocket.
      </p>
    `
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-rose-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-gray-200 dark:border-gray-800 py-6 mb-12">
            <div className="flex items-center gap-4">
              <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{post.author}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-rose-100 hover:text-rose-500 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-rose-100 hover:text-rose-500 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl overflow-hidden mb-16 shadow-2xl"
        >
          <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[600px]" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert prose-rose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Tags & Sharing */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">AI</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">Skincare</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">Trends</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 mr-2">Share article:</span>
            <button className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
