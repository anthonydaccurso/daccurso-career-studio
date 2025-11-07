import { Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import { Helmet } from "react-helmet-async";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>Anthony Daccurso | Daccurso Career Studio</title>
        <meta
          name="description"
          content="Learn about Anthony Daccurso — digital marketer, web developer, and founder of Daccurso Career Studio. Dedicated to helping students and professionals succeed."
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/about/" />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://daccursocareerstudio.com/about/" />
        <meta property="og:title" content="Anthony Daccurso | Daccurso Career Studio" />
        <meta
          property="og:description"
          content="Driven to help students and emerging professionals navigate their career paths with confidence. Learn more about Anthony Daccurso's story."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp"
        />
        <meta property="og:site_name" content="Daccurso Career Studio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anthony Daccurso | Daccurso Career Studio" />
        <meta
          name="twitter:description"
          content="Anthony Daccurso is a career strategist and digital marketer helping young professionals succeed through resume and interview mastery."
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp"
        />

        {/* Person + Organization Schema */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Anthony Daccurso",
            "jobTitle": "Founder & Career Coach",
            "image": "https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/anthony-daccurso-fcp.webp",
            "url": "https://daccursocareerstudio.com/about",
            "description": "Digital marketer and web developer helping students and professionals build impactful careers through resume writing and coaching.",
            "worksFor": {
              "@type": "Organization",
              "name": "Daccurso Career Studio",
              "url": "https://daccursocareerstudio.com"
            },
            "sameAs": [
              "https://linkedin.com/in/anthony-daccurso",
              "https://github.com/anthonydaccurso"
            ]
          }
          `}
        </script>
      </Helmet>

      <ParticleBackground isDashboard={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driven to help students and emerging professionals navigate their career paths with confidence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 bg-white border border-gray-300 rounded-lg px-8 py-6 animate-slide-up animate-delay-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              My Story
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                I've reviewed hundreds of resumes and conducted dozens of interviews. Through this journey, I've noticed a consistent pattern: so many skilled, capable people were being passed over, not because they lacked experience, but because they didn’t know how to show it.
              </p>
              <p>
                That’s what led me to start Daccurso Career Studio. I wanted to change that. I’ve seen it firsthand while working in digital marketing and web development, presentation matters. The same way a strong website can boost visibility, a well-crafted resume or confident interview can change a career.
              </p>
              <p>
               What sets my approach apart is that I’ve actually been in those hiring conversations. I know what stands out, what feels authentic, and what gets ignored. My goal is to help others, especially students and young professionals, feel confident presenting their value, not just hoping it’s noticed.
              </p>
              <p>
               Early in my own career, I learned that opportunities rarely come to those who wait, they come to those who know how to position themselves. In digital marketing, I studied how strategy, storytelling, and design can influence perception. I realized those same principles apply to personal branding and career growth. A resume isn’t just a list of jobs, it’s your professional story.
              </p>
              <p>
              Through Daccurso Career Studio, I bring together that blend of creative storytelling and data-driven insight to help others move forward. I’ve helped peers land internships and transition into new industries, not by reinventing who they are, but by amplifying what already makes them valuable.
              </p>
              <p>
                Now, my mission is simple: to level the playing field for job seekers and early-career professionals. Whether it’s through a standout resume, a confident interview performance, or a strategic career plan, I’m here to help you present your best professional self authentically and effectively.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden animate-slide-up animate-delay-200">
              <img
                src="https://jvibdwrogfxavxmjcctn.supabase.co/storage/v1/object/public/images/anthony-daccurso-portrait.jpg"
                alt="Anthony Daccurso"
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6 animate-slide-up animate-delay-300">
              <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100+ Resumes</h3>
              <p className="text-gray-600">
                Reviewed and provided feedback on hundreds of professional resumes
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-8 mb-8 animate-slide-up animate-delay-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            My Approach
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Target className="text-[#1c336f] mr-2" size={20} />
                Personalized & Strategic
              </h3>
              <p className="text-gray-700">
                No cookie-cutter templates here. Every resume, every piece of advice is tailored to your unique background, goals, and target industry. I take the time to understand your story and help you tell it effectively.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Target className="text-[#1c336f] mr-2" size={20} />
                Honest & Direct
              </h3>
              <p className="text-gray-700">
                I provide candid feedback that will actually help you improve. If something on your resume isn't working, I'll tell you why and show you how to fix it. My goal is your success, not just making you feel good.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Target className="text-[#1c336f] mr-2" size={20} />
                Industry Insight
              </h3>
              <p className="text-gray-700">
                I stay current with hiring trends, ATS systems, and what companies are looking for today. You get advice based on what's actually working right now, not outdated strategies from years ago.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Target className="text-[#1c336f] mr-2" size={20} />
                Results-Driven
              </h3>
              <p className="text-gray-700">
                My success is measured by yours. Whether it's landing interviews, getting job offers, or negotiating better compensation, I focus on outcomes that matter to your career.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white rounded-lg p-8 text-center animate-slide-up animate-delay-500">
          <h2 className="text-3xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Ready to take your career to the next level? I'm here to help you every step of the way.
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#1c336f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}