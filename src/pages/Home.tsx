import { FileText, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <main className="relative">
      <Helmet>
        <title>Daccurso Career Studio | Resume & Career Coaching</title>
        <meta 
          name="description" 
          content="Career coaching, resume building, and interview prep for students and young professionals. Work directly with Anthony Daccurso to elevate your career strategy." 
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://daccursocareerstudio.com/" />
        <meta property="og:title" content="Daccurso Career Studio | Resume & Career Coaching" />
        <meta property="og:description" content="Career coaching, resume building, and interview prep for students and young professionals." />
        <meta property="og:image" content="https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Daccurso Career Studio | Resume & Career Coaching" />
        <meta name="twitter:description" content="Career coaching, resume building, and interview prep for students and young professionals." />
        <meta name="twitter:image" content="https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png" />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Daccurso Career Studio",
            "url": "https://daccursocareerstudio.com",
            "logo": "https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png",
            "founder": {
              "@type": "Person",
              "name": "Anthony Daccurso",
              "jobTitle": "Digital Marketer & Career Coach"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "areaServed": "US"
            },
            "sameAs": [
              "https://linkedin.com/company/daccursocareerstudio",
              "https://github.com/anthonydaccurso"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Freehold",
              "addressRegion": "NJ",
              "postalCode": "07728",
              "addressCountry": "US"
            }
          }
          `}
        </script>
      </Helmet>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white py-20 relative">
        <ParticleBackground isDashboard={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-slide-up">
          <h1 className="text-5xl font-bold mb-6">
            Empower Your Career Journey
          </h1>
          <p className="text-xl mb-8 text-gray-100 max-w-3xl mx-auto">
            As a young professional involved in the hiring process, I bring a fresh perspective to what employers today are really looking for. I’ll help you stand out with tailored career guidance, a professional resume, and practical interview preparation.
          </p>
          <div className="flex justify-center">
            <Link
              to="/pricing"
              className="bg-white text-[#1c336f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white relative">
        <ParticleBackground isDashboard={false} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent mb-4">
              Why Choose Daccurso Career Studio?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real-world experience to help you succeed in your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow animate-slide-up animate-delay-100 relative z-10 bg-white">
              <div className="bg-[#1c336f] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Resume Services
              </h3>
              <p className="text-gray-600 mb-4">
                Professional resume building and review services. Get personalized feedback or let us craft your perfect resume.
              </p>
              <Link
                to="/resume-services"
                className="text-[#1c336f] font-semibold flex items-center hover:underline"
              >
                Learn More About Resume Services <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* CARD 2 */}
            <div className="border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow animate-slide-up animate-delay-200 relative z-10 bg-white">
              <div className="bg-[#1c336f] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Interview Preparation
              </h3>
              <p className="text-gray-600 mb-4">
                Master your interviews with personalized coaching, mock interviews, and insider tips from a young professional's perspective.
              </p>
              <Link
                to="/interview-guidance"
                className="text-[#1c336f] font-semibold flex items-center hover:underline"
              >
                Explore Interview Guidance <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* CARD 3 */}
            <div className="border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow animate-slide-up animate-delay-300 relative z-10 bg-white">
              <div className="bg-[#1c336f] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Career Strategy
              </h3>
              <p className="text-gray-600 mb-4">
                Navigate your career path with confidence. Get strategic advice on career transitions, salary negotiations, and professional growth.
              </p>
              <Link
                to="/career-advice"
                className="text-[#1c336f] font-semibold flex items-center hover:underline"
              >
                Read Career Advice Articles <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white border border-gray-300 rounded-lg p-12 text-center animate-slide-up animate-delay-100 relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of professionals who have landed their dream jobs with our expert guidance
            </p>
            <Link
              to="/contact"
              className="bg-[#1c336f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors inline-block"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}