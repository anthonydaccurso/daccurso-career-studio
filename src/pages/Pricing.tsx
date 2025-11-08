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
        <title>Pricing | Daccurso Career Studio</title>
        <meta
          name="description"
          content="Transparent pricing for resume writing, interview coaching, and professional branding services by Daccurso Career Studio."
        />
        <link rel="canonical" href="https://daccursocareerstudio.com/pricing/" />
      </Helmet>

      <ParticleBackground isDashboard={false} />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header with slide-up animation */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] bg-clip-text text-transparent mb-4 leading-tight">
            My Pricing
          </h1>
          <p className="text-lg text-gray-600">
            Transparent, competitive pricing for professional career services
          </p>
        </div>

        {/* ===== Resume Services ===== */}
        {/* Grid with slide-up and delay */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up animate-delay-100">
          {/* AI Resume Review */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              AI Resume Review
            </h2>
            <div className="text-4xl font-bold text-[#1c336f] mb-2">Free</div>
            <p className="text-gray-600 mb-6">
              Get instant AI-powered feedback on your resume.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Instant automated analysis',
                'Format and content feedback',
                'Keyword optimization tips',
                'PDF or DOCX accepted',
                'Unlimited revisions',
              ].map((item) => (
                <li key={item} className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 mt-0.5 flex-shrink-0" size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="w-full block bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 text-center"
            >
              Start Free
            </Link>
          </div>

          {/* Resume Rewrite */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-8 hover:shadow-lg transition relative animate-slide-up animate-delay-200">
            <div className="absolute top-0 right-0 bg-[#1c336f] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
              Popular
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Resume Rewrite
            </h2>
            <div className="text-4xl font-bold text-[#1c336f] mb-2">$89</div>
            <p className="text-gray-600 mb-6">
              Professional resume writing with expert review.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Complete resume rewrite',
                'ATS-optimized formatting',
                'Personalized consultation',
                '1–2 business day delivery',
                'One round of revisions',
              ].map((item) => (
                <li key={item} className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 mt-0.5 flex-shrink-0" size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="w-full block bg-[#1c336f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] text-center"
            >
              Get Started
            </Link>
          </div>

          {/* Professional Branding */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 hover:shadow-lg transition animate-slide-up animate-delay-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Professional Branding
            </h2>
            <div className="text-4xl font-bold text-[#1c336f] mb-2">$169</div>
            <p className="text-gray-600 mb-6">
              Full resume, cover letter, and LinkedIn optimization.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Everything in Resume Rewrite',
                'Custom cover letter template',
                'LinkedIn profile changes',
                '3–4 business day delivery',
                'One round of revisions',
              ].map((item) => (
                <li key={item} className="flex items-start text-gray-700">
                  <Check className="text-[#1c336f] mr-2 mt-0.5 flex-shrink-0" size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="w-full block bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 text-center"
            >
              Upgrade Now
            </Link>
          </div>
        </div>

        {/* ===== Interview & Career Services ===== */}
        {/* Apply slide-up and delay here as well */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 mb-16 animate-slide-up animate-delay-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Interview & Career Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Mock Interview Session',
                price: 49,
                description: '15–30 minute realistic interview with tailored feedback.',
                features: [
                  'Industry-specific questions',
                  'Recorded for review',
                  'Detailed written feedback',
                ],
              },
              {
                title: 'Interview Strategy Session',
                price: 39,
                description: 'Coaching to develop a winning interview approach.',
                features: [
                  'Company research techniques',
                  'STAR method coaching',
                  'Follow-up strategies',
                ],
              },
              {
                title: 'Career Strategy Consultation',
                price: 69,
                description: 'Personalized guidance for planning your career path.',
                features: [
                  'Career path planning',
                  'Industry transition advice',
                  '30–45 minute consultation',
                ],
              },
              {
                title: 'Salary Negotiation Coaching',
                price: 59,
                description: 'Learn to confidently negotiate salary & benefits.',
                features: [
                  'Market research insights',
                  'Negotiation scripts and phrases',
                  'Counter-offer strategies',
                ],
              },
            ].map((service) => (
              <div
                key={service.title}
                className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-[#1c336f]">
                    ${service.price}
                  </span>
                  <span className="text-gray-600 ml-2">/ session</span>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start text-gray-700">
                      <Check className="text-[#1c336f] mr-2 mt-0.5 flex-shrink-0" size={18} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleBookSession(service.title)}
                  className="w-full bg-[#1c336f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
                >
                  Book {service.title.replace('Session', '').trim()}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Custom Package Section with slide-up and delay */}
        <div className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white rounded-lg p-8 text-center animate-slide-up animate-delay-600">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="mr-2" size={28} />
            <h2 className="text-3xl font-bold">Need a Custom Package?</h2>
          </div>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Looking for ongoing support or a combination of services? Contact me to create a
            personalized package that fits your needs and budget.
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#1c336f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Contact Me
          </Link>
        </div>
      </main>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType={selectedService}
      />
    </div>
  );
}