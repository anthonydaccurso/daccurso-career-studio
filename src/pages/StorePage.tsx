import { useEffect, useState } from 'react';
import { ShoppingBag, AlertCircle } from 'lucide-react';

function StorePage() {
  const [error, setError] = useState(false);

  useEffect(() => {
    // Redirect to your Fourthwall store after a brief moment
    const timer = setTimeout(() => {
      // Replace with your actual Fourthwall store URL from your dashboard
      const storeUrl = 'daccurso-career-studio-shop.fourthwall.com'; // Update this!
      
      // Check if URL is reachable (this is a simple check)
      fetch(storeUrl, { mode: 'no-cors' })
        .then(() => {
          window.location.href = storeUrl;
        })
        .catch(() => {
          setError(true);
        });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Store Coming Soon!
          </h2>
          <p className="text-slate-600 mb-6">
            We're currently setting up our store. Please check back soon or contact us for immediate assistance.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-[#1c336f] text-white rounded-lg font-semibold hover:bg-[#152847] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated shopping bag icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-blue-600 animate-bounce" />
          </div>
        </div>

        {/* Loading spinner */}
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        
        {/* Text */}
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Taking you to the store...
        </h2>
        <p className="text-slate-600">
          You'll be redirected in just a moment
        </p>
      </div>
    </div>
  );
}

export default StorePage;