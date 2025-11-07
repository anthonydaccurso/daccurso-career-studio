import { Compass, Briefcase, LineChart, GraduationCap } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { Helmet } from "react-helmet-async";

export default function CareerAdvice() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>Career Advice | Daccurso Career Studio</title>
        <meta
          name="description"
          content="Practical insights and tips to navigate your career — from resume updates and job searching to skill development and professional growth."
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/career-advice" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content="Career Advice & Tips | Daccurso Career Studio" />
        <meta property="og:description" content="Explore expert articles on job searching, interviewing, and professional development." />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
        />

        {/* Career Strategy Consultation Service Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Career Strategy Consultation",
            "provider": {
              "@type": "Organization",
              "name": "Daccurso Career Studio"
            },
            "description": "Personalized career roadmap sessions for goal setting and job search strategy.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "69.99",
              "availability": "https://schema.org/InStock"
            }
          }
        `}</script>

        {/* FAQ Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How often should I update my resume?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Update your resume after every significant achievement, new skill, or role change. Review it quarterly to ensure it reflects your current capabilities."
                }
              },
              {
                "@type": "Question",
                "name": "Should I include a cover letter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, especially when an application requests one or when you're changing careers. A well-crafted cover letter highlights motivation and unique fit."
                }
              },
              {
                "@type": "Question",
                "name": "How do I explain employment gaps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Be honest and frame gaps positively by emphasizing skills, volunteer work, or personal growth. Focus on readiness for the opportunity ahead."
                }
              },
              {
                "@type": "Question",
                "name": "When should I start looking for my next role?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Begin searching when you've maximized growth in your current role or reached key goals. It's easier to find new opportunities while employed."
                }
              },
              {
                "@type": "Question",
                "name": "How long should my resume be?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For most early to mid-career professionals, one page is ideal. If you have 10+ years of highly relevant experience, two pages is acceptable. Focus on recent, relevant achievements rather than trying to include everything."
                }
              },
              {
                "@type": "Question",
                "name": "Should I negotiate my salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Most employers expect candidates to negotiate and respect those who advocate for themselves professionally. Research market rates thoroughly, wait until you have a written offer, and approach the conversation collaboratively."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      <ParticleBackground isDashboard={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent mb-4">
            Career Advice
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guidance and insights to help you navigate your career journey
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-slide-up animate-delay-100">
            <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Compass className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Career Planning</h3>
            <p className="text-sm text-gray-600">
              Strategic advice for long-term career growth
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-slide-up animate-delay-200">
            <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Briefcase className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Job Search</h3>
            <p className="text-sm text-gray-600">
              Proven strategies to land your dream job
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-slide-up animate-delay-300">
            <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <LineChart className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Career Growth</h3>
            <p className="text-sm text-gray-600">
              Advance faster with insider knowledge
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center hover:shadow-lg transition-shadow animate-slide-up animate-delay-400">
            <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Skill Development</h3>
            <p className="text-sm text-gray-600">
              Build valuable skills that employers value most
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-8 animate-slide-up animate-delay-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Common Career Questions Answered
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How often should I update my resume?
              </h3>
              <p className="text-gray-700">
                Update your resume after every significant achievement, new skill, or role change. At minimum, review it quarterly to ensure it reflects your current capabilities. Keeping it current means you're always ready when opportunities arise.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Should I include a cover letter?
              </h3>
              <p className="text-gray-700">
                Yes, especially when the application explicitly requests one or when you're making a career change. A well-crafted cover letter can set you apart by explaining your motivation and unique fit for the role in ways a resume cannot.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How do I explain employment gaps?
              </h3>
              <p className="text-gray-700">
                Be honest and concise. Frame the gap positively by highlighting any skills development, volunteer work, or personal growth that occurred. Most importantly, focus the conversation on your readiness and enthusiasm for the current opportunity.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                When should I start looking for my next role?
              </h3>
              <p className="text-gray-700">
                Always be open to opportunities, but actively search when you've maximized growth in your current role, when company changes affect your satisfaction, or when you've achieved your key goals. It's easier to find a job when you have one.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How long should my resume be?
              </h3>
              <p className="text-gray-700">
                For most early to mid-career professionals, one page is ideal. If you have 10+ years of highly relevant experience, two pages is acceptable. Focus on recent, relevant achievements rather than trying to include everything. Quality and relevance matter more than length.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Should I negotiate my salary?
              </h3>
              <p className="text-gray-700">
                Absolutely. Most employers expect candidates to negotiate and respect those who advocate for themselves professionally. Research market rates thoroughly, wait until you have a written offer, and approach the conversation collaboratively. The worst they can say is no, but often you'll secure better compensation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}