import { useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

function StorePage() {
  useEffect(() => {
    // Redirect to your Fourthwall store after a brief moment
    const timer = setTimeout(() => {
      // TODO: Replace with your actual Fourthwall store URL
      // Check your Fourthwall dashboard for the correct URL
      window.location.href = 'https://daccursocareerstudio.fourthwall.com';
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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