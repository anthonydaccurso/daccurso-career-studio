import { useState } from 'react';
import { Mail, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Contact Me | Daccurso Career Studio</title>
  <meta name="description" content="Get in touch with Anthony Daccurso for personalized resume services, interview coaching, or career consultations. Responses within 24 hours." />
  <link rel="canonical" href="https://daccursocareerstudio.com/contact-me" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Contact Daccurso Career Studio" />
  <meta property="og:description" content="Reach out for resume rewrites, interview prep, or custom career support packages." />
  <meta property="og:image" content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png" />

   <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": "https://daccursocareerstudio.com/contact",
      "mainEntity": {
        "@type": "Person",
        "name": "Anthony Daccurso",
        "url": "https://daccursocareerstudio.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "areaServed": "US"
        },
        "sameAs": [
          "https://linkedin.com/company/daccursocareerstudio",
          "https://github.com/anthonydaccurso"
        ]
      }
    }
    `}
  </script>
</Helmet>

export default function ContactMe() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!result.success) throw new Error(result.error);

      setFormStatus('success');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <ParticleBackground isDashboard={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-[#2d4a8f] md:from-gray-900 md:via-slate-700 md:to-[#1c336f] bg-clip-text text-transparent mb-4">
            Contact Me
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to take the next step in your career? Let's connect and discuss how I can help you achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center animate-slide-up animate-delay-100">
            <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">221adaccurso1@gmail.com</p>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center animate-slide-up animate-delay-200">
            <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600">Within 24 Hours</p>
          </div>

          <a
            href="https://anthonydaccurso.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-300 rounded-lg p-6 text-center animate-slide-up animate-delay-300 hover:shadow-lg transition-shadow"
          >
            <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">My Portfolio</h3>
            <p className="text-gray-600">Visit anthonydaccurso.com</p>
          </a>
        </div>

        <div className="max-w-5xl mx-auto">
          {formStatus === 'success' ? (
            <div className="bg-white border border-gray-300 rounded-lg p-12 text-center animate-slide-up animate-delay-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Message Sent Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. I'll review your message and get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setFormStatus('idle');
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: '',
                  });
                }}
                className="bg-[#1c336f] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-300 rounded-lg p-8 animate-slide-up animate-delay-400">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Me a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                    >
                      <option value="">Select a service</option>
                      <option value="resume-rewrite">Resume Rewrite</option>
                      <option value="resume-cover-letter">Resume + Cover Letter</option>
                      <option value="mock-interview">Mock Interview</option>
                      <option value="interview-strategy">Interview Strategy</option>
                      <option value="career-consultation">Career Consultation</option>
                      <option value="salary-negotiation">Salary Negotiation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                    rows={6}
                    placeholder="Tell me about your career goals and how I can help..."
                  ></textarea>
                </div>

                {formStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">
                      Failed to send message. Please try again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1c336f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2" size={20} />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}

          <div className="mt-8 bg-[#1c336f] bg-opacity-5 border border-[#1c336f] border-opacity-20 rounded-lg p-6 animate-slide-up animate-delay-500">
            <h3 className="font-bold text-gray-900 mb-3">What Happens Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2 font-bold">1.</span>
                <span>I'll review your message and assess how I can best help you</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2 font-bold">2.</span>
                <span>You'll receive a personalized response within 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2 font-bold">3.</span>
                <span>We'll schedule a consultation to discuss your needs in detail</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#1c336f] mr-2 font-bold">4.</span>
                <span>Together, we'll create a plan to achieve your career goals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}