import { useState } from 'react';
import { Upload, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ParticleBackground from '../components/ParticleBackground';
import { Helmet } from "react-helmet-async";

export default function ResumeServices() {
  const [selectedService, setSelectedService] = useState<'manual' | 'ai' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
      setAiFeedback('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (selectedService === 'manual' && (!name || !email)) {
      setErrorMessage('Name and email are required for manual service');
      setUploadStatus('error');
      return;
    }

    setUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');
    setAiFeedback('');

    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resume-files')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('resume-files')
        .getPublicUrl(filePath);

      let feedback = null;

      if (selectedService === 'ai') {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/parse-and-analyze-resume`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to analyze resume');
        }

        const data = await response.json();
        feedback = data.feedback;
        setAiFeedback(feedback);
      }

      if (selectedService === 'manual') {
        const fileArrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(fileArrayBuffer);
        let binaryString = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binaryString += String.fromCharCode(uint8Array[i]);
        }
        const fileBase64 = btoa(binaryString);

        const submitResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-resume`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
              name: name,
              email: email,
              phone: phone,
              file_name: file.name,
              file_url: filePath,
              file_data: fileBase64,
              file_size: file.size,
              comments: comments,
            }),
          }
        );

        const submitResult = await submitResponse.json();
        if (!submitResult.success) throw new Error(submitResult.error);
      }

      setUploadStatus('success');

      if (selectedService === 'manual') {
        setFile(null);
        setName('');
        setEmail('');
        setPhone('');
        setComments('');
      }
    } catch (error) {
      console.error('Error submitting resume:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <Helmet>
        <title>Resume Services | Daccurso Career Studio</title>
        <meta name="description" content="Get expert resume rewrites or instant AI-powered feedback. ATS-optimized, professionally formatted resumes tailored for your industry." />
        <link rel="canonical" href="https://daccursocareerstudio.com/resume-services" />

        <meta property="og:type" content="service" />
        <meta property="og:title" content="Resume Writing & AI Feedback | Daccurso Career Studio" />
        <meta property="og:description" content="Professional resume services with AI or manual expert review. Fast turnaround and tailored career feedback." />
        <meta property="og:image" content="https://bvevrurqtidadhfsuoee.supabase.co/storage/v1/object/public/media/dcs-apple-touch-icon.png" />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Resume Writing",
            "provider": {
              "@type": "Organization",
              "name": "Daccurso Career Studio"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            },
            "description": "Professional resume rewriting and optimization service for students and professionals.",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "89.99",
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
            Resume Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose between professional manual resume building or instant AI-powered feedback
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            className={`bg-white border-2 rounded-lg p-8 cursor-pointer transition-all animate-slide-up animate-delay-100 ${
              selectedService === 'manual'
                ? 'border-[#1c336f] shadow-lg'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => {
              setSelectedService('manual');
              setUploadStatus('idle');
              setAiFeedback('');
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center">
                <Upload className="text-white" size={24} />
              </div>
              {selectedService === 'manual' && (
                <CheckCircle className="text-[#1c336f]" size={24} />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Professional Resume Building
            </h3>
            <p className="text-gray-600 mb-4">
              Upload your resume as a DOCX file and receive personalized, hands-on service from a young professional. I'll rebuild or refine your resume to perfection.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>Complete resume review and rewrite</span>
              </li>
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>Personalized feedback and consultation</span>
              </li>
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>ATS-optimized formatting</span>
              </li>
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>1-2 business day turnaround</span>
              </li>
            </ul>
            <div className="text-[#1c336f] font-bold text-xl">
              See Pricing Page
            </div>
          </div>

          <div
            className={`bg-white border-2 rounded-lg p-8 cursor-pointer transition-all animate-slide-up animate-delay-200 ${
              selectedService === 'ai'
                ? 'border-[#1c336f] shadow-lg'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => {
              setSelectedService('ai');
              setUploadStatus('idle');
              setAiFeedback('');
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-[#1c336f] w-12 h-12 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              {selectedService === 'ai' && (
                <CheckCircle className="text-[#1c336f]" size={24} />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              AI Resume Feedback
            </h3>
            <p className="text-gray-600 mb-4">
              Get instant AI-powered analysis of your resume. Upload your DOCX or PDF file and receive comprehensive feedback on formatting, content, and optimization.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>Instant automated feedback</span>
              </li>
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>Content and formatting analysis</span>
              </li>
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>Keyword optimization suggestions</span>
              </li>
              <li className="flex items-start text-gray-700">
                <CheckCircle className="text-[#1c336f] mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span>DOCX or PDF accepted</span>
              </li>
            </ul>
            <div className="text-[#1c336f] font-bold text-xl">
              Free
            </div>
          </div>
        </div>

        {selectedService && (
          <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg p-8 animate-slide-up animate-delay-300">
            {aiFeedback ? (
              <>
                <div className="flex items-start mb-6">
                  <Sparkles className="text-[#1c336f] mr-3 flex-shrink-0 mt-1" size={32} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">AI Analysis Complete</h2>
                    <p className="text-gray-600 mt-1">
                      Here's your personalized resume feedback
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                    {aiFeedback}
                  </pre>
                </div>
                <button
                  onClick={() => {
                    setAiFeedback('');
                    setFile(null);
                    setUploadStatus('idle');
                  }}
                  className="w-full bg-[#1c336f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors"
                >
                  Analyze Another Resume
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedService === 'manual' ? 'Upload Your Resume' : 'Get AI Feedback'}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Resume File
                      {selectedService === 'manual' ? ' (DOCX only)' : ' (DOCX or PDF)'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1c336f] transition-colors">
                      <input
                        type="file"
                        accept={selectedService === 'manual' ? '.docx' : '.docx,.pdf'}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="text-gray-400 mb-2" size={48} />
                        <span className="text-gray-600 mb-1">
                          {file ? file.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {selectedService === 'manual' ? 'DOCX files only' : 'DOCX or PDF files'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {selectedService === 'manual' && (
                    <>
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c336f]"
                      rows={4}
                      placeholder="Any specific areas you'd like us to focus on?"
                    ></textarea>
                  </div>

                  {uploadStatus === 'success' && !aiFeedback && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
                      <CheckCircle className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-blue-800 font-medium">
                          Resume uploaded successfully!
                        </p>
                        <p className="text-blue-700 text-sm mt-1">
                          We'll review your resume and get back to you within 1-2 business days.
                        </p>
                      </div>
                    </div>
                  )}

                  {uploadStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                      <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-red-800 font-medium">Upload failed</p>
                        <p className="text-red-700 text-sm-700 text-sm mt-1">
                      {errorMessage || 'Please try again or contact support if the problem persists.'}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || uploading}
                className="w-full bg-[#1c336f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a8f] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    {selectedService === 'ai' ? 'Analyzing...' : 'Uploading...'}
                  </>
                ) : (
                  selectedService === 'ai' ? 'Get AI Feedback' : 'Submit Resume'
                )}
              </button>
            </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}