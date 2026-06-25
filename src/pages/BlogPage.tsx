import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Skincare', 'Bridal', 'Haircare', 'Salon Spotlight', 'Beauty Tech'];

const featuredPost = {
  title: "The Rise of AI in Personalized Skincare Routines",
  excerpt: "How artificial intelligence is revolutionizing the way we understand our skin and creating hyper-personalized daily regimens that actually work.",
  category: "Beauty Tech",
  date: "Oct 24, 2024",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200&h=600",
  author: "Dr. Ananya Iyer",
  authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150"
};

const posts = [
  {
    id: 1,
    title: "5 Pre-Bridal Treatments Every Chennai Bride Needs",
    excerpt: "From traditional Ubtan to modern laser facials, prepare your skin for the big day with these expert-recommended treatments.",
    category: "Bridal",
    date: "Oct 22, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: 2,
    title: "Taming Chennai Frizz: Haircare Guide for Coastal Climates",
    excerpt: "Humidity is the enemy of a good hair day. Learn which serums, masks, and treatments are proven to keep your hair smooth.",
    category: "Haircare",
    date: "Oct 20, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: 3,
    title: "Salon Spotlight: Elegance Studio Anna Nagar",
    excerpt: "We sit down with Priya Rajan to discuss how she grew her boutique salon into one of the most sought-after beauty destinations in the city.",
    category: "Salon Spotlight",
    date: "Oct 18, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: 4,
    title: "Understanding Your Glow Score",
    excerpt: "Demystifying GlowAI's proprietary rating system. Here is what your score means and how you can improve it over time.",
    category: "Beauty Tech",
    date: "Oct 15, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: 5,
    title: "The Ultimate Guide to Chemical Peels",
    excerpt: "AHA, BHA, or TCA? Break down the jargon and find out which chemical peel is best suited for your specific skin concerns.",
    category: "Skincare",
    date: "Oct 12, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    id: 6,
    title: "Post-Diwali Skin Detox",
    excerpt: "Late nights, heavy makeup, and sweets can take a toll on your skin. Refresh your complexion with this simple 3-day recovery plan.",
    category: "Skincare",
    date: "Oct 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600&h=400",
  },
];

export function BlogPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden bg-gray-50/50 dark:bg-gray-950/50">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-medium mb-6"
          >
            <Bookmark className="w-4 h-4" />
            Beauty & Wellness
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            The GlowAI <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Expert tips, salon spotlights, and the latest trends in beauty technology to help you glow from the inside out.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-3 hide-scrollbar justify-center">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all ${
                index === 0 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <Link to="/blog/1" className="group block relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-rose-500/10 transition-all border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 h-64 md:h-full min-h-[400px] overflow-hidden relative">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
              
              <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-bold uppercase tracking-wider rounded-full">
                    Featured
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Tag className="w-4 h-4" />
                    {featuredPost.category}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-rose-500 transition-colors line-clamp-3">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-10 h-10 rounded-full object-cover border-2 border-rose-200 dark:border-rose-900/50" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{featuredPost.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{featuredPost.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Latest Posts Grid */}
        <div className="mb-12 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Articles</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group h-full flex flex-col bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/20 dark:shadow-none hover:shadow-xl hover:border-rose-200 dark:hover:border-rose-900/50 transition-all">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-500 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-500 text-gray-900 dark:text-white font-bold rounded-xl transition-colors shadow-sm">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
