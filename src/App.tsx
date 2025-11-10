import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResumeServices from './pages/ResumeServices';
import InterviewGuidance from './pages/InterviewGuidance';
import CareerAdvice from './pages/CareerAdvice';
import AboutMe from './pages/AboutMe';
import Pricing from './pages/Pricing';
import ContactMe from './pages/ContactMe';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import BlogIndex from './pages/blog/index';
import BlogPost from './pages/blog/BlogPost';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';

function AdminRoute() {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin onLoginSuccess={() => window.location.href = '/admin-panel'} />;
  }

  return <AdminPanel />;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<><Navigation /><Home /></>} />
        <Route path="/resume-services" element={<><Navigation /><ResumeServices /></>} />
        <Route path="/interview-guidance" element={<><Navigation /><InterviewGuidance /></>} />
        <Route path="/career-advice" element={<><Navigation /><CareerAdvice /></>} />
        <Route path="/about" element={<><Navigation /><AboutMe /></>} />
        <Route path="/pricing" element={<><Navigation /><Pricing /></>} />
        <Route path="/contact" element={<><Navigation /><ContactMe /></>} />
        <Route path="/blog" element={<><Navigation /><BlogIndex /></>} />
        <Route path="/blog/:slug" element={<><Navigation /><BlogPost /></>} />
        <Route path="/admin-panel" element={<AdminRoute />} />
        <Route path="*" element={<><Navigation /><Home /></>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  );
}

export default App;
