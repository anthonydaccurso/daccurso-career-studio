import { ArrowLeft, Clock } from 'lucide-react';

interface BlogPostProps {
  post: {
    title: string;
    category: string;
    readTime: string;
    content: string[];
  };
  onBack: () => void;
}

export default function BlogPost({ post, onBack }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center text-[#1c336f] font-semibold hover:underline mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Career Advice
        </button>

        <article className="bg-white border border-gray-300 rounded-lg p-8 md:p-12">
          <div className="mb-6">
            <div className="text-[#1c336f] text-sm font-semibold mb-2">
              {post.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                Need Personalized Career Guidance?
              </h3>
              <p className="text-gray-100 mb-6">
                Get one-on-one coaching tailored to your unique situation and career goals.
              </p>
              <button
                onClick={onBack}
                className="bg-white text-[#1c336f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Our Services
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
