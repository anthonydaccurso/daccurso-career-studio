import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import BookingModal from '../components/BookingModal';
import { Helmet } from 'react-helmet-async';

export default function Pricing() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ type: string; price: string } | null>(null);

  const handleBookSession = (serviceType: string, price: string) => {
    setSelectedService({ type: serviceType, price });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>Pricing | Daccurso Career Studio</title>
        <meta
          name="description"
          content="Transparent, competitive pricing for resume rewrites, interview coaching, and professional branding services by Daccurso Career Studio."
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/pricing/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://daccursocareerstudio.com/pricing/" />
        <meta property="og:title" content="Pricing | Daccurso Career Studio" />
        <meta
          property="og:description"
          content="Compare plans for resume rewrites, AI reviews, interview strategy, and professional branding — all designed to help you stand out."
        />
        <meta
          property="og:image"
          content="https://nkrnbtythzdnogvtdizv.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png"
        />

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
        {/* PAGE HEADER */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] bg-clip-text text-transparent mb-4">
            Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, competitive pricing for professional career services
          </p>
        </div>

        {/* === RESUME SERVICES === */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* AI Resume Review */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow animate-slide-up animate-delay-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Resume Review</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-[#1c336f]">Free</span>
            </div>
            <p className="text-gray-600 mb-4">Get instant AI-powered feedback on your resume.</p>
            <ul className="space-y-3 mb-8">
              {[
                'Instant automated analysis',
                'Format and content feedback',
                'Keyword optimization tips',
                'PDF or DOCX accepted',
                'Unlimited revisions',
              ].map((item, i) => (
                <li key={i} className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/resume-services"
              className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block text-center"
            >
              Start Free
            </Link>
          </div>

          {/* Resume Rewrite */}
          <div className="bg-white border-2 border-[#1c336f] rounded-lg p-8 hover:shadow-lg transition-shadow relative animate-slide-up animate-delay-200">
            <div className="absolute top-0 right-0 bg-[#1c336f] text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Resume Rewrite</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-[#1c336f]">$89</span>
            </div>
            <p className="text-gray-600 mb-4">
              Professional resume rewriting and optimization.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Complete resume rewrite',
                'ATS-optimized formatting',
                'Personalized consultation',
                '1-2 business day delivery',
                'One revision included',
              ].map((item, i) => (
                <li key={i} className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/resume-services"
              className="w-full bg-[#1c336f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors inline-block text-center"
            >
              Get Started
            </Link>
          </div>

          {/* Professional Branding */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow animate-slide-up animate-delay-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Branding</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-[#1c336f]">$169</span>
            </div>
            <p className="text-gray-600 mb-4">
              Resume rewrite, cover letter, and LinkedIn optimization.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Everything in Resume Rewrite',
                'Custom cover letter',
                'LinkedIn profile updates',
                '3-4 day delivery',
                'One revision included',
              ].map((item, i) => (
                <li key={i} className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/resume-services"
              className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block text-center"
            >
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* === INTERVIEW & CAREER SERVICES === */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 mb-8 animate-slide-up animate-delay-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Interview & Career Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              title="Mock Interview Session"
              price="$49"
              description="15–30 minute realistic interview with tailored feedback."
              features={[
                'Industry-specific questions',
                'Recorded for review',
                'Detailed written feedback',
              ]}
              onBook={() => handleBookSession('Mock Interview Session', '$49')}
            />

            <ServiceCard
              title="Interview Strategy Session"
              price="$39"
              description="Coaching to develop a winning interview approach."
              features={[
                'Company research techniques',
                'STAR method coaching',
                'Follow-up strategies',
              ]}
              onBook={() => handleBookSession('Interview Strategy Session', '$39')}
            />

            <ServiceCard
              title="Career Strategy Consultation"
              price="$69"
              description="Personalized guidance for planning your career path."
              features={[
                'Career path planning',
                'Industry transition advice',
                '30–45 minute consultation',
              ]}
              onBook={() => handleBookSession('Career Strategy Consultation', '$69')}
            />

            <ServiceCard
              title="Salary Negotiation Coaching"
              price="$59"
              description="Learn to confidently negotiate salary & benefits."
              features={[
                'Market research insights',
                'Negotiation scripts and phrases',
                'Counter-offer strategies',
              ]}
              onBook={() => handleBookSession('Salary Negotiation Coaching', '$59')}
            />
          </div>
        </div>

        {/* === CUSTOM PACKAGE === */}
        <div className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white rounded-lg p-8 text-center animate-slide-up animate-delay-500">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="mr-2" size={28} />
            <h2 className="text-3xl font-bold">Need a Custom Package?</h2>
          </div>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Looking for ongoing support or a combination of services? Contact me to create a
            personalized package that fits your goals and budget.
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#1c336f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Contact Me
          </Link>
        </div>
      </div>

      {/* === BOOKING MODAL === */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType={selectedService?.type || ''}
        price={selectedService?.price || ''}
      />
    </div>
  );
}

/* === Subcomponent for service cards === */
function ServiceCard({
  title,
  price,
  description,
  features,
  onBook,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  onBook: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="flex items-baseline mb-4">
        <span className="text-3xl font-bold text-[#1c336f]">{price}</span>
        <span className="text-gray-600 ml-2">/ session</span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start text-gray-700">
            <Check className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onBook}
        className="w-full bg-[#1c336f] text-white py-2 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}