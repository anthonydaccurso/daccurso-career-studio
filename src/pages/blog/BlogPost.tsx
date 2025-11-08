import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { Helmet } from 'react-helmet-async';
import { posts } from '../../posts/postsData';
import ParticleBackground from '../../components/ParticleBackground';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 relative">
        <ParticleBackground isDashboard={false} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#1c336f] font-semibold hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>{post.title} | Daccurso Career Studio</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://daccursocareerstudio.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Daccurso Career Studio`} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:image"
          content="https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
        />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Anthony Daccurso" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Anthony Daccurso"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Daccurso Career Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
              }
            },
            "description": post.excerpt,
            "url": `https://daccursocareerstudio.com/blog/${post.slug}`
          })}
        </script>
      </Helmet>

      <ParticleBackground isDashboard={false} />

      <main className="max-w-3xl mx-auto px-4 relative z-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#1c336f] font-semibold hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <article className="bg-white border border-gray-300 rounded-lg p-8 md:p-12">
          <div className="mb-6">
            <div className="text-[#1c336f] text-sm font-semibold mb-2">{post.category}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <Markdown
              options={{
                forceBlock: true,
                overrides: {
                  h2: {
                    props: {
                      className:
                        'text-3xl font-bold mt-12 mb-6 border-b pb-3 border-gray-200 text-gray-900'
                    }
                  },
                  h3: {
                    props: { className: 'text-xl font-semibold mt-6 mb-3 text-gray-900' }
                  },
                  p: {
                    props: { className: 'text-gray-700 leading-relaxed mb-6' }
                  },
                  a: {
                    props: {
                      className: 'text-[#1c336f] font-semibold hover:underline',
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    }
                  },
                  strong: {
                    props: { className: 'font-bold text-gray-900' }
                  },
                  ul: {
                    props: { className: 'my-6 list-disc pl-6 text-gray-700' }
                  },
                  li: {
                    props: { className: 'mb-2' }
                  },
                  hr: {
                    props: { className: 'my-10 border-gray-200' }
                  },
                  blockquote: {
                    props: {
                      className:
                        'border-l-4 border-[#1c336f] pl-4 italic text-gray-600 my-6'
                    }
                  }
                }
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </article>
      </main>
    </div>
  );
}