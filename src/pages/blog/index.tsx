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
        <title>Blog Posts | Daccurso Career Studio</title>
        <meta
          name="description"
          content="Practical insights and tips to navigate your career — from resume updates and job searching to skill development and professional growth."
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Career Tips & Insights | Daccurso Career Studio" />
        <meta
          property="og:description"
          content="Expert career advice on job searching, interviewing, and professional development."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Career Tips & Insights",
            "description": "Career advice and professional development insights from Daccurso Career Studio.",
            "publisher": {
              "@type": "Organization",
              "name": "Daccurso Career Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
              }
            },
            "blogPost": posts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "datePublished": post.date,
              "url": `https://daccursocareerstudio.com/blog/${post.slug}`
            }))
          })}
        </script>
      </Helmet>

      <ParticleBackground isDashboard={false} />

      <main className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header — matches Pricing */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] bg-clip-text text-transparent mb-4 leading-tight">
            Career Tips & Insights
          </h1>
          <p className="text-lg text-gray-600">
            Practical insights for building your career and professional growth
          </p>
        </div>

        {/* Posts grid — staggered by row w/ slight fade and timing offset */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => {
            // Determine row (2 per row)
            const row = Math.floor(index / 2);
            // Fade + delay class per row
            const delayClass =
              row === 0
                ? 'animate-slide-up animate-delay-100'
                : row === 1
                ? 'animate-slide-up animate-delay-300'
                : row === 2
                ? 'animate-slide-up animate-delay-500'
                : 'animate-slide-up animate-delay-700';

            return (
              <div
                key={post.slug}
                className={`bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition ${delayClass}`}
                style={{
                  opacity: 0,
                  animationFillMode: 'forwards',
                  animationDuration: '0.5s',
                  animationTimingFunction: 'ease-out',
                  animationName: 'fadeInSlideUp',
                }}
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

      {/* Inline animation for subtle fade + slide */}
      <style>{`
        @keyframes fadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}