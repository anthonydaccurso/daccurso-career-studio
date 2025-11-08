import { useState } from 'react';
import { Video, BookOpen, Target, MessageSquare } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import BookingModal from '../components/BookingModal';
import { Helmet } from "react-helmet-async";

export default function InterviewGuidance() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>Interview Guidance | Daccurso Career Studio</title>
        <meta name="description" content="Mock interviews, strategy sessions, and salary negotiation coaching designed to help you walk into your next interview with confidence." />
        <link rel="canonical" href="https://daccursocareerstudio.com/interview-guidance/" />

        <meta property="og:type" content="service" />
        <meta property="og:title" content="Interview Guidance | Daccurso Career Studio" />
        <meta property="og:description" content="One-on-one mock interviews, strategy coaching, and negotiation guidance to help you land the job you deserve." />
        <meta property="og:image" content="https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png" />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Interview Coaching",
            "provider": {
              "@type": "Organization",
              "name": "Daccurso Career Studio"
            },
            "description": "One-on-one interview strategy sessions to improve confidence and communication.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "49.99",
              "availability": "https://schema.org/InStock"
            }
          }
          `}
        </script>
      </Helmet>

      <ParticleBackground isDashboard={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent mb-4">
            Interview Guidance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the interview process with insider insights from a young professional involved in the hiring process
          </p>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-8 mb-8 animate-slide-up animate-delay-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Makes Our Interview Prep Different?
          </h2>
          <p className="text-gray-700 mb-4">
            As someone who has conducted dozens of interviews across various industries, I know exactly what hiring managers are looking for. I'll share the insider perspective that most candidates never get to see.
          </p>
          <p className="text-gray-700">
            From common pitfalls to standout strategies, you'll learn how to present yourself confidently and authentically in any interview setting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-gray-300 rounded-lg p-8 animate-slide-up animate-delay-200">
            <div className="bg-[#1c336f] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Video className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Mock Interviews
            </h3>
            <p className="text-gray-600 mb-4">
              Practice makes perfect. Schedule a one-on-one mock interview session where we simulate real interview scenarios and provide immediate, actionable feedback.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>15-30 minute sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Industry-specific questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Recorded for review</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Detailed written feedback</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-8 animate-slide-up animate-delay-300">
            <div className="bg-[#1c336f] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Interview Strategy Sessions
            </h3>
            <p className="text-gray-600 mb-4">
              Develop a winning strategy tailored to your specific role and company. Learn how to research, prepare, and position yourself as the ideal candidate.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Company research techniques</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Question preparation framework</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>STAR method coaching</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Follow-up strategies</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-8 animate-slide-up animate-delay-400">
            <div className="bg-[#1c336f] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Interview Question Bank
            </h3>
            <p className="text-gray-600 mb-4">
              Access a comprehensive collection of real interview questions organized by role, industry, and difficulty level, complete with sample answers and evaluation criteria.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>100+ real interview questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Sample answers and templates</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Behavioral and technical questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Regular updates</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-8 animate-slide-up animate-delay-500">
            <div className="bg-[#1c336f] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Salary Negotiation Coaching
            </h3>
            <p className="text-gray-600 mb-4">
              Don't leave money on the table. Learn how to confidently negotiate your salary and benefits package with proven strategies that work in your favor.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Market research techniques</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Negotiation scripts and phrases</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Benefits package evaluation</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2">•</span>
                <span>Counter-offer strategies</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white rounded-lg p-8 text-center animate-slide-up animate-delay-600">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Schedule your personalized interview preparation session today and walk into your next interview with confidence
          </p>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-white text-[#1c336f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book a Session
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType="Interview Guidance"
      />
    </div>
  );
}