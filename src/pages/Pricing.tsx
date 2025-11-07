import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import BookingModal from '../components/BookingModal';
import { Helmet } from 'react-helmet-async';

export default function Pricing() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleBookSession = (serviceType: string) => {
    setSelectedService(serviceType);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>Pricing | Resume Writing, Coaching & Career Services</title>
        <meta
          name="description"
          content="Transparent, competitive pricing for resume rewrites, interview coaching, and professional branding services by Daccurso Career Studio."
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/pricing/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://daccursocareerstudio.com/pricing/" />
        <meta property="og:title" content="Pricing | Resume Writing, Coaching & Career Services" />
        <meta
          property="og:description"
          content="Compare plans for resume rewrites, AI reviews, interview strategy, and professional branding — all designed to help you stand out."
        />
        <meta
          property="og:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
        />
        <meta property="og:site_name" content="Daccurso Career Studio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing | Resume Writing, Coaching & Career Services" />
        <meta
          name="twitter:description"
          content="Transparent pricing for resume, interview, and career services by Daccurso Career Studio."
        />
        <meta
          name="twitter:image"
          content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
        />

        {/* Structured Data (ProductGroup + Offers) */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            "name": "Career Services Pricing",
            "description": "Pricing plans for resume writing, interview preparation, and professional branding services.",
            "brand": {
              "@type": "Organization",
              "name": "Daccurso Career Studio",
              "url": "https://daccursocareerstudio.com"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Career Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "name": "AI Resume Review",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Instant AI-powered resume feedback with keyword optimization tips."
                },
                {
                  "@type": "Offer",
                  "name": "Resume Rewrite",
                  "price": "89",
                  "priceCurrency": "USD",
                  "description": "Complete resume rewrite with ATS-optimized formatting and expert review."
                },
                {
                  "@type": "Offer",
                  "name": "Professional Branding Package",
                  "price": "169",
                  "priceCurrency": "USD",
                  "description": "Full branding package including resume rewrite, cover letter, and LinkedIn optimization."
                },
                {
                  "@type": "Offer",
                  "name": "Mock Interview Session",
                  "price": "49",
                  "priceCurrency": "USD",
                  "description": "15-30 minute session with personalized feedback and interview recording."
                },
                {
                  "@type": "Offer",
                  "name": "Interview Strategy Session",
                  "price": "39",
                  "priceCurrency": "USD",
                  "description": "One-on-one consultation covering research, question prep, and follow-up strategy."
                },
                {
                  "@type": "Offer",
                  "name": "Career Strategy Consultation",
                  "price": "69",
                  "priceCurrency": "USD",
                  "description": "Career path planning and industry transition guidance."
                },
                {
                  "@type": "Offer",
                  "name": "Salary Negotiation Coaching",
                  "price": "59",
                  "priceCurrency": "USD",
                  "description": "Coaching on salary research, negotiation scripts, and counter-offer strategies."
                }
              ]
            }
          }
          `}
        </script>
      </Helmet>

      <ParticleBackground isDashboard={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent mb-4">
            Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, competitive pricing for professional career services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow animate-slide-up animate-delay-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                AI Resume Review
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#1c336f]">Free</span>
              </div>
              <p className="text-gray-600">
                Get instant AI-powered feedback on your resume
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Instant automated analysis</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Format and content feedback</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Keyword optimization tips</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>PDF or DOCX accepted</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Unlimited Revisions</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block text-center"
            >
              Start Free
            </Link>
          </div>

          <div className="bg-white border-2 border-[#1c336f] rounded-lg p-8 hover:shadow-lg transition-shadow relative animate-slide-up animate-delay-200">
            <div className="absolute top-0 right-0 bg-[#1c336f] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
              Popular
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Resume Rewrite
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#1c336f]">$89</span>
              </div>
              <p className="text-gray-600">
                Professional resume building service with expert review
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Complete resume rewrite</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>ATS-optimized formatting</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Personalized consultation</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>1-2 business day delivery</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>One round of revisions</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="w-full bg-[#1c336f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors inline-block text-center"
            >
              Get Started
            </Link>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow animate-slide-up animate-delay-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Professional Branding
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#1c336f]">$169</span>
              </div>
              <p className="text-gray-600">
                Complete application package for maximum impact
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Everything in Resume Rewrite</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>Custom cover letter template</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>LinkedIn Profile Changes</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>3-4 business day delivery</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span>One round of revisions</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block text-center"
            >
              Upgrade Now
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-8 mb-8 animate-slide-up animate-delay-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Interview & Career Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Mock Interview Session
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-[#1c336f]">$49</span>
                <span className="text-gray-600 ml-2">/ session</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>15-30 minute one-on-one session</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Industry-specific questions</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Recording provided for review</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Detailed written feedback</span>
                </li>
              </ul>
              <button
                onClick={() => handleBookSession('Mock Interview Session')}
                className="w-full bg-[#1c336f] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
              >
                Book Mock Interview
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Interview Strategy Session
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-[#1c336f]">$39</span>
                <span className="text-gray-600 ml-2">/ session</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>15-30 minute consultation</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Company research guidance</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Question preparation framework</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Follow-up strategy</span>
                </li>
              </ul>
              <button
                onClick={() => handleBookSession('Interview Strategy Session')}
                className="w-full bg-[#1c336f] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
              >
                Book Strategy Session
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Career Strategy Consultation
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-[#1c336f]">$69</span>
                <span className="text-gray-600 ml-2">/ session</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>30-45 minute in-depth consultation</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Career path planning</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Industry transition advice</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Personalized action plan</span>
                </li>
              </ul>
              <button
                onClick={() => handleBookSession('Career Strategy Consultation')}
                className="w-full bg-[#1c336f] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
              >
                Book Career Consulation
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Salary Negotiation Coaching
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-[#1c336f]">$59</span>
                <span className="text-gray-600 ml-2">/ session</span>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>30-45 minute coaching session</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Market research guidance</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Negotiation scripts and phrases</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>Counter-offer strategies</span>
                </li>
              </ul>
              <button
                onClick={() => handleBookSession('Salary Negotiation Coaching')}
                className="w-full bg-[#1c336f] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
              >
                Book Coaching Session
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white rounded-lg p-8 text-center animate-slide-up animate-delay-500">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="mr-2" size={28} />
            <h2 className="text-3xl font-bold">
              Need a Custom Package?
            </h2>
          </div>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Looking for ongoing support or a combination of services? Contact me to create a personalized package that fits your needs and budget.
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#1c336f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Contact Me
          </Link>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType={selectedService}
      />
    </div>
  );
}