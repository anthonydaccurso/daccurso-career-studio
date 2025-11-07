import { useState, useEffect } from 'react';
import { LogOut, Users, FileText, MessageSquare, Download, TrendingUp, Calendar } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { supabase } from '../lib/supabase';
import ParticleBackground from '../components/ParticleBackground';

interface ResumeSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  comments: string;
  resume_file_url: string;
  downloadable_file_url: string | null;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
}

interface AIFeedback {
  id: string;
  file_name: string;
  file_data: string;
  ai_feedback: string;
  created_at: string;
}

interface CalendarBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  desired_date: string;
  desired_time: string;
  created_at: string;
}

export default function AdminPanel() {
  const { signOut, user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'resumes' | 'feedback' | 'contacts' | 'calendar'>('resumes');
  const [resumeSubmissions, setResumeSubmissions] = useState<ResumeSubmission[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [aiFeedback, setAIFeedback] = useState<AIFeedback[]>([]);
  const [calendarBookings, setCalendarBookings] = useState<CalendarBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalContacts: 0,
    totalFeedback: 0,
    totalCalendar: 0,
    todayResumes: 0,
    weekResumes: 0
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadResumeSubmissions(),
        loadContactSubmissions(),
        loadAIFeedback(),
        loadCalendarBookings(),
        loadStats()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadResumeSubmissions = async () => {
    const { data, error } = await supabase.from('resume_submissions').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error loading resume submissions:', error);
    else setResumeSubmissions(data || []);
  };

  const loadContactSubmissions = async () => {
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error loading contact submissions:', error);
    else setContactSubmissions(data || []);
  };

  const loadAIFeedback = async () => {
    const { data, error } = await supabase.from('ai_resume_feedback').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error loading AI feedback:', error);
    else setAIFeedback(data || []);
  };

  const loadCalendarBookings = async () => {
    const { data, error } = await supabase.from('booking_submissions').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error loading calendar bookings:', error);
    else setCalendarBookings(data || []);
  };

  const loadStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [resumeCount, contactCount, feedbackCount, calendarCount, todayCount, weekCount] = await Promise.all([
      supabase.from('resume_submissions').select('id', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
      supabase.from('ai_resume_feedback').select('id', { count: 'exact', head: true }),
      supabase.from('booking_submissions').select('id', { count: 'exact', head: true }),
      supabase.from('resume_submissions').select('id', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      supabase.from('resume_submissions').select('id', { count: 'exact', head: true }).gte('created_at', weekAgo.toISOString())
    ]);

    setStats({
      totalResumes: resumeCount.count || 0,
      totalContacts: contactCount.count || 0,
      totalFeedback: feedbackCount.count || 0,
      totalCalendar: calendarCount.count || 0,
      todayResumes: todayCount.count || 0,
      weekResumes: weekCount.count || 0
    });
  };

  const downloadFile = async (url: string, filename: string) => {
    try {
      const { data, error } = await supabase.storage.from('resume-files').download(url.replace(/^.*\/resume-files\//, ''));
      if (error) throw error;
      const blob = new Blob([data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <ParticleBackground isDashboard={false} />

      <header className="bg-gradient-to-br from-[#1c336f] to-[#2d4a8f] text-white py-8 relative">
        <ParticleBackground isDashboard={true} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-100 mt-2">Welcome back, {user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-6 py-3 bg-white text-[#1c336f] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
          {/* Total Resumes */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalResumes}</p>
              </div>
              <FileText className="w-10 h-10" style={{ color: '#1c336f' }} />
            </div>
          </div>

          {/* AI Feedback */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Feedback</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalFeedback}</p>
              </div>
              <Users className="w-10 h-10" style={{ color: '#1c336f' }} />
            </div>
          </div>

          {/* Total Contacts */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalContacts}</p>
              </div>
              <MessageSquare className="w-10 h-10" style={{ color: '#1c336f' }} />
            </div>
          </div>

          {/* Calendar Bookings */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calendar Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCalendar}</p>
              </div>
              <Calendar className="w-10 h-10" style={{ color: '#1c336f' }} />
            </div>
          </div>

          {/* Today */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.todayResumes}</p>
              </div>
              <Calendar className="w-10 h-10" style={{ color: '#1c336f' }} />
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white rounded-lg p-6 border border-gray-300 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.weekResumes}</p>
              </div>
              <TrendingUp className="w-10 h-10" style={{ color: '#1c336f' }} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-300">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              <button
                onClick={() => setActiveTab('resumes')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'resumes'
                    ? 'text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'resumes' ? { borderBottomColor: '#1c336f', color: '#1c336f' } : {}}
              >
                Resume Submissions ({stats.totalResumes})
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'feedback'
                    ? 'text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'feedback' ? { borderBottomColor: '#1c336f', color: '#1c336f' } : {}}
              >
                AI Feedback ({stats.totalFeedback})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'contacts'
                    ? 'text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'contacts' ? { borderBottomColor: '#1c336f', color: '#1c336f' } : {}}
              >
                Contact Messages ({stats.totalContacts})
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'calendar'
                    ? 'text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'calendar' ? { borderBottomColor: '#1c336f', color: '#1c336f' } : {}}
              >
                Calendar Bookings ({calendarBookings.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderBottomColor: '#1c336f' }}></div>
                <p className="text-gray-600 mt-4">Loading data...</p>
              </div>
            ) : (
              <>
                {/* Calendar Tab */}
                {activeTab === 'calendar' && (
                  <div className="space-y-4">
                    {calendarBookings.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No calendar bookings yet</p>
                    ) : (
                      calendarBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-lg">{booking.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{booking.email}</p>
                              <p className="text-sm text-gray-600">{booking.phone}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                  style={{ backgroundColor: '#e8edf7', color: '#1c336f' }}
                                >
                                  {booking.service_type}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(booking.desired_date).toLocaleDateString()} at {booking.desired_time}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{formatDate(booking.created_at)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Resume Tab */}
                {activeTab === 'resumes' && (
                  <div className="space-y-4">
                    {resumeSubmissions.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No resume submissions yet</p>
                    ) : (
                      resumeSubmissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-lg">{submission.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{submission.email}</p>
                              <p className="text-sm text-gray-600">{submission.phone}</p>
                              <div className="flex items-center gap-4 mt-3">
                                <span
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                  style={{ backgroundColor: '#e8edf7', color: '#1c336f' }}
                                >
                                  {submission.service_type}
                                </span>
                                <span className="text-xs text-gray-500">{formatDate(submission.created_at)}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  downloadFile(submission.resume_file_url, `resume-${submission.name}.pdf`)
                                }
                                className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-lg font-semibold transition-colors"
                                style={{ backgroundColor: '#1c336f' }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#152751')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1c336f')}
                              >
                                <Download className="w-4 h-4" />
                                Original
                              </button>
                              {submission.downloadable_file_url && (
                                <button
                                  onClick={() =>
                                    downloadFile(
                                      submission.downloadable_file_url!,
                                      `resume-processed-${submission.name}.pdf`
                                    )
                                  }
                                  className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-lg font-semibold transition-colors"
                                  style={{ backgroundColor: '#1c336f' }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#152751')}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1c336f')}
                                >
                                  <Download className="w-4 h-4" />
                                  Processed
                                </button>
                              )}
                            </div>
                          </div>
                          {submission.comments && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm font-medium text-gray-700 mb-2">Comments:</p>
                              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                                {submission.comments}
                              </p>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* AI Feedback Tab */}
                {activeTab === 'feedback' && (
                  <div className="space-y-4">
                    {aiFeedback.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No AI feedback generated yet</p>
                    ) : (
                      aiFeedback.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                                File: {feedback.file_name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">{formatDate(feedback.created_at)}</span>
                              <button
                                onClick={() => {
                                  const byteCharacters = atob(feedback.file_data);
                                  const byteNumbers = new Array(byteCharacters.length);
                                  for (let i = 0; i < byteCharacters.length; i++) {
                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                  }
                                  const byteArray = new Uint8Array(byteNumbers);
                                  const blob = new Blob([byteArray]);
                                  const link = document.createElement('a');
                                  link.href = window.URL.createObjectURL(blob);
                                  link.download = feedback.file_name;
                                  link.click();
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-lg font-semibold transition-colors"
                                style={{ backgroundColor: '#1c336f' }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#152751')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1c336f')}
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 mt-4 whitespace-pre-wrap leading-relaxed">
                            {feedback.ai_feedback}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Contact Messages Tab */}
                {activeTab === 'contacts' && (
                  <div className="space-y-4">
                    {contactSubmissions.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No contact messages yet</p>
                    ) : (
                      contactSubmissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-lg">{submission.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{submission.email}</p>
                              {submission.phone && (
                                <p className="text-sm text-gray-600">{submission.phone}</p>
                              )}
                              {submission.service && (
                                <span
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2"
                                  style={{ backgroundColor: '#e8edf7', color: '#1c336f' }}
                                >
                                  {submission.service}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">{formatDate(submission.created_at)}</span>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                              {submission.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}