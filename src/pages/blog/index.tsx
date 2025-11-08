import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { posts } from '../../posts/postsData';
import ParticleBackground from '../../components/ParticleBackground';
import { Helmet } from 'react-helmet-async';

export default function BlogIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        {/* ... your helmet content ... */}
      </Helmet>

      <ParticleBackground isDashboard={false} />

      {/* Add the animation classes here for the main container */}
      <main className="max-w-5xl mx-auto px-4 relative z-10 animate-slide-up">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent">
          Career Tips & Insights
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => {
            const isEven = index % 2 === 0;
            const animationClass = isEven ? 'animate-slide-in-left' : 'animate-slide-in-right';
            const delayClass = `animate-delay-${(index + 1) * 100}`;

            return (
              <div
                key={post.slug}
                className={`bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-all ${animationClass} ${delayClass}`}
              >
                <div className="text-[#1c336f] text-sm font-semibold mb-2">
                  {post.category}
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-[#1c336f] font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}