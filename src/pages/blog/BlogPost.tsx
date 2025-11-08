import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ParticleBackground from '../components/ParticleBackground';
import { posts } from '../posts/postsData';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>Blog | Daccurso Career Studio</title>
        <meta
          name="description"
          content="Career advice, job search strategies, and professional development tips from Daccurso Career Studio."
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/blog/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | Daccurso Career Studio" />
        <meta
          property="og:description"
          content="Expert career advice and insights to help you succeed in your professional journey."
        />
        <meta
          property="og:image"
          content="https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
        />
      </Helmet>

      <ParticleBackground isDashboard={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent mb-4">
            Career Insights & Advice
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guidance on resumes, interviews, and professional growth
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-up animate-delay-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-[#1c336f] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#1c336f]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow animate-slide-up"
              style={{ animationDelay: `${(index % 6) * 100}ms` }}
            >
              <div className="p-6">
                <div className="text-[#1c336f] text-sm font-semibold mb-2">
                  {post.category}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#1c336f] font-semibold hover:underline"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts found in this category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}