import React, { useState, useEffect } from 'react';
import { 
  supabase, 
  isSupabaseConfigured, 
  getNewsList, 
  upsertNewsItem, 
  deleteNewsItem,
  getProjectsList,
  upsertProjectItem,
  deleteProjectItem,
  getServicesList,
  upsertServiceItem,
  deleteServiceItem,
  getTestimonialsList,
  upsertTestimonialItem,
  deleteTestimonialItem,
  getInquiriesList,
  updateInquiryStatus,
  deleteInquiryItem,
  uploadMediaImage
} from '../lib/supabase';
import { 
  Shield, 
  KeyRound, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  FileText, 
  Layers, 
  RefreshCw, 
  Search, 
  ArrowLeft,
  Inbox,
  Wrench,
  Star,
  Clock,
  Mail,
  Phone,
  Building2,
  Tag,
  Check,
  ChevronRight,
  TrendingUp,
  Sliders,
  Send,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminPage({ onNavigateHome }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'news' | 'services' | 'testimonials' | 'inquiries' | 'settings'

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Content states
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Modal / Editing states
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'project' | 'news' | 'service' | 'testimonial' | 'inquiry_view'
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Check Auth state on mount
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch all CMS content
  const refreshAllData = async () => {
    setContentLoading(true);
    try {
      const [projRes, newsRes, servRes, testRes, inqRes] = await Promise.all([
        getProjectsList(true),
        getNewsList(true),
        getServicesList(),
        getTestimonialsList(),
        getInquiriesList()
      ]);
      setProjects(projRes.data || []);
      setNews(newsRes.data || []);
      setServices(servRes.data || []);
      setTestimonials(testRes.data || []);
      setInquiries(inqRes.data || []);
    } catch (err) {
      console.error('Error refreshing content:', err);
    } finally {
      setContentLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, [session]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Auth handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setAuthError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      setAuthLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setSession(data.session);
      showNotification('Logged into CloudAxis CMS successfully!');
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    showNotification('Logged out successfully.');
  };

  // Image upload handler
  const handleFileUpload = async (e, targetField = 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupabaseConfigured) {
      showNotification('Supabase Storage requires live connection in .env', 'error');
      return;
    }

    try {
      setUploadingImage(true);
      const publicUrl = await uploadMediaImage(file, 'media');
      setEditingItem(prev => ({ 
        ...prev, 
        [targetField]: publicUrl,
        ...(targetField === 'image' ? { cover_image_url: publicUrl } : {})
      }));
      showNotification('Image uploaded successfully to Supabase Storage!');
    } catch (err) {
      console.error(err);
      showNotification(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // CRUD Handlers
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      setContentLoading(true);
      await upsertProjectItem(editingItem);
      showNotification('Project saved successfully!');
      setModalType(null);
      setEditingItem(null);
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to save project', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      setContentLoading(true);
      await deleteProjectItem(id);
      showNotification('Project deleted.');
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to delete project', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    try {
      setContentLoading(true);
      await upsertNewsItem(editingItem);
      showNotification('News article saved successfully!');
      setModalType(null);
      setEditingItem(null);
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to save news', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      setContentLoading(true);
      await deleteNewsItem(id);
      showNotification('Article deleted.');
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to delete news', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      setContentLoading(true);
      await upsertServiceItem(editingItem);
      showNotification('Service saved successfully!');
      setModalType(null);
      setEditingItem(null);
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to save service', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      setContentLoading(true);
      await deleteServiceItem(id);
      showNotification('Service deleted.');
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to delete service', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    try {
      setContentLoading(true);
      await upsertTestimonialItem(editingItem);
      showNotification('Testimonial saved successfully!');
      setModalType(null);
      setEditingItem(null);
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to save testimonial', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      setContentLoading(true);
      await deleteTestimonialItem(id);
      showNotification('Testimonial deleted.');
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to delete testimonial', 'error');
    } finally {
      setContentLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      showNotification(`Inquiry marked as ${newStatus}.`);
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await deleteInquiryItem(id);
      showNotification('Inquiry deleted.');
      await refreshAllData();
    } catch (err) {
      showNotification(err.message || 'Failed to delete inquiry', 'error');
    }
  };

  // Metrics
  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const publishedProjectsCount = projects.filter(p => p.published !== false).length;
  const publishedNewsCount = news.filter(n => n.published !== false).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
        <div className="flex items-center gap-3 font-mono text-sm text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E51A1A]" />
          Loading CloudAxis Control Center...
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#E51A1A 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px'
          }}
        />

        <button 
          onClick={onNavigateHome}
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-mono tracking-wider uppercase z-20 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Live Website
        </button>

        <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#E51A1A]/10 border border-[#E51A1A]/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#E51A1A]">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
              CloudAxis <span className="text-[#E51A1A]">CMS Admin</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized Personnel Portal • Engineering Content Management
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Setup Mode Active
              </div>
              Supabase credentials not yet detected in <code className="bg-black/40 px-1 py-0.5 rounded font-mono">.env</code>.
              <button 
                onClick={() => setSession({ user: { email: 'admin@cloudaxis.com (Demo Mode)' } })}
                className="mt-2.5 w-full py-1.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded text-xs font-mono font-medium transition cursor-pointer"
              >
                Enter CMS in Demo/Preview Mode &rarr;
              </button>
            </div>
          )}

          {authError && (
            <div className="mb-4 p-3 rounded bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cloudaxis.com"
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A] transition"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full mt-2 py-3 px-4 bg-[#E51A1A] hover:bg-[#c91515] active:scale-[0.99] text-white text-sm font-semibold tracking-wide rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#E51A1A]/20 transition disabled:opacity-50 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 font-mono">
            Protected by CloudAxis Engineering IAM • 256-bit SSL
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN CMS DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-[#111827] border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#E51A1A] flex items-center justify-center font-bold text-white font-mono text-sm">
                CA
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white text-sm tracking-wide font-mono">
                  CLOUDAXIS <span className="text-[#E51A1A]">CMS</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Central Engineering Control
                </div>
              </div>
            </div>

            <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
              isSupabaseConfigured 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {isSupabaseConfigured ? 'Supabase Live' : 'Demo Mode'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              View Live Website
            </button>

            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-white truncate max-w-[180px]">
                {session?.user?.email}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Admin Session</div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-lg shadow-2xl border flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-3 ${
          notification.type === 'error' 
            ? 'bg-red-950/95 border-red-500/40 text-red-200' 
            : 'bg-[#111827]/95 border-emerald-500/40 text-emerald-300'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#E51A1A] text-white shadow-lg shadow-[#E51A1A]/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#E51A1A] text-white shadow-lg shadow-[#E51A1A]/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
              activeTab === 'news'
                ? 'bg-[#E51A1A] text-white shadow-lg shadow-[#E51A1A]/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            News & Press ({news.length})
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#E51A1A] text-white shadow-lg shadow-[#E51A1A]/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            Services ({services.length})
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-[#E51A1A] text-white shadow-lg shadow-[#E51A1A]/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            Testimonials ({testimonials.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer relative ${
              activeTab === 'inquiries'
                ? 'bg-[#E51A1A] text-white shadow-lg shadow-[#E51A1A]/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            RFP Inbox ({inquiries.length})
            {newInquiriesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#E51A1A] text-white shadow-lg shadow-[#E51A1A]/20'
                : 'bg-[#111827] text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Database
          </button>

          <div className="ml-auto">
            <button
              onClick={refreshAllData}
              title="Refresh All Content"
              disabled={contentLoading}
              className="p-2 bg-[#111827] border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg transition cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${contentLoading ? 'animate-spin text-[#E51A1A]' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: OVERVIEW DASHBOARD
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div 
                onClick={() => setActiveTab('inquiries')}
                className="bg-[#111827] border border-slate-800 hover:border-[#E51A1A]/40 rounded-xl p-5 shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-mono uppercase">Incoming Inquiries & RFPs</span>
                  <Inbox className="w-5 h-5 text-[#E51A1A]" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">
                  {inquiries.length}
                </div>
                <div className="mt-2 text-xs flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {newInquiriesCount} New Unread
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('projects')}
                className="bg-[#111827] border border-slate-800 hover:border-[#E51A1A]/40 rounded-xl p-5 shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-mono uppercase">Projects & Case Studies</span>
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">
                  {projects.length}
                </div>
                <div className="mt-2 text-xs text-slate-400 font-mono">
                  {publishedProjectsCount} Published Live
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('news')}
                className="bg-[#111827] border border-slate-800 hover:border-[#E51A1A]/40 rounded-xl p-5 shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-mono uppercase">News & Articles</span>
                  <FileText className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">
                  {news.length}
                </div>
                <div className="mt-2 text-xs text-slate-400 font-mono">
                  {publishedNewsCount} Published Articles
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('services')}
                className="bg-[#111827] border border-slate-800 hover:border-[#E51A1A]/40 rounded-xl p-5 shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-mono uppercase">Services & Solutions</span>
                  <Wrench className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold font-mono text-white">
                  {services.length}
                </div>
                <div className="mt-2 text-xs text-slate-400 font-mono">
                  Turnkey Capabilities
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-mono uppercase text-slate-300 font-bold mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#E51A1A]" />
                Quick Content Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setEditingItem({
                      title: '',
                      industry: 'Industrial Automation',
                      category: 'Factory Automation',
                      description: '',
                      tech_stack: [],
                      tags: [],
                      metric: '',
                      duration: '4 Weeks',
                      status: 'Completed',
                      published: true,
                      deliverables: []
                    });
                    setModalType('project');
                  }}
                  className="px-4 py-2.5 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono font-bold uppercase rounded-lg flex items-center gap-2 transition cursor-pointer shadow-md shadow-[#E51A1A]/20"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>

                <button
                  onClick={() => {
                    setEditingItem({
                      title: '',
                      category: 'Company Life',
                      excerpt: '',
                      content: '',
                      author: 'CloudAxis Engineering',
                      read_time: '3 min read',
                      published: true,
                      date: new Date().toISOString().split('T')[0]
                    });
                    setModalType('news');
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold uppercase rounded-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  New Article
                </button>

                <button
                  onClick={() => {
                    setEditingItem({
                      title: '',
                      short_desc: '',
                      detailed_desc: '',
                      icon_name: 'Cpu',
                      featured: false,
                      order_index: services.length + 1,
                      deliverables: []
                    });
                    setModalType('service');
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold uppercase rounded-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  New Service
                </button>

                <button
                  onClick={() => {
                    setEditingItem({
                      client_name: '',
                      designation: '',
                      company: '',
                      rating: 5,
                      quote: '',
                      tag: 'Turnkey Automation'
                    });
                    setModalType('testimonial');
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold uppercase rounded-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  New Testimonial
                </button>
              </div>
            </div>

            {/* Recent Inquiries Quick Preview */}
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono uppercase text-white font-bold flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-[#E51A1A]" />
                  Recent Client Inquiries & RFP Quotes
                </h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs text-[#E51A1A] hover:underline font-mono flex items-center gap-1 cursor-pointer"
                >
                  View All &rarr;
                </button>
              </div>

              {inquiries.length > 0 ? (
                <div className="divide-y divide-slate-800">
                  {inquiries.slice(0, 5).map((inq) => (
                    <div key={inq.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm truncate">{inq.sender_name}</span>
                          <span className="text-xs text-slate-400">({inq.organization || inq.email})</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            inq.status === 'new' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                              : inq.status === 'contacted'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {inq.subject || inq.service}: {inq.message}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(inq);
                            setModalType('inquiry_view');
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded font-mono cursor-pointer"
                        >
                          Read
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs font-mono text-slate-500">
                  No inquiries received yet. Submissions from the website Contact Form & RFP modal will appear here instantly.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PROJECTS & CASE STUDIES MANAGER
           ======================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search projects by title, sector, tech..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#111827] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E51A1A] w-64 sm:w-80"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingItem({
                    title: '',
                    industry: 'Industrial Automation',
                    category: 'Factory Automation',
                    description: '',
                    objective: '',
                    tech_stack: [],
                    tags: [],
                    metric: '',
                    duration: '4 Weeks',
                    status: 'Completed',
                    published: true,
                    deliverables: []
                  });
                  setModalType('project');
                }}
                className="px-4 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 shadow-md shadow-[#E51A1A]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Case Study
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || p.industry?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((proj) => (
                  <div key={proj.id} className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group">
                    <div className="relative h-44 bg-slate-900 overflow-hidden">
                      {proj.image || proj.cover_image_url ? (
                        <img 
                          src={proj.image || proj.cover_image_url} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-mono text-slate-600">
                          No Image Uploaded
                        </div>
                      )}
                      
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-[#E51A1A] text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded shadow">
                          {proj.category || 'Project'}
                        </span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded shadow font-semibold ${
                          proj.status === 'In Progress' 
                            ? 'bg-amber-500 text-black' 
                            : 'bg-emerald-600 text-white'
                        }`}>
                          {proj.status || 'Completed'}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        {proj.published !== false ? (
                          <span className="bg-emerald-500/90 text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Live
                          </span>
                        ) : (
                          <span className="bg-slate-800/90 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                            <EyeOff className="w-3 h-3" /> Draft
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-slate-400 mb-1">
                          Sector: <span className="text-slate-200">{proj.industry || proj.sector || 'Industrial'}</span>
                        </div>
                        <h4 className="font-bold text-white text-base leading-snug mb-2 line-clamp-2">
                          {proj.title}
                        </h4>
                        {proj.metric && (
                          <div className="text-xs text-emerald-400 font-mono font-semibold mb-2">
                            {proj.metric}
                          </div>
                        )}
                        <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                          {proj.description || proj.objective}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...proj,
                              tech_stack: Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : (Array.isArray(proj.tags) ? proj.tags.join(', ') : ''),
                              deliverables: Array.isArray(proj.deliverables) ? proj.deliverables.join('\n') : (proj.deliverables || '')
                            });
                            setModalType('project');
                          }}
                          className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer flex items-center gap-1 text-xs font-mono"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="px-2.5 py-1 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded transition cursor-pointer flex items-center gap-1 text-xs font-mono"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: NEWS & PRESS RELEASES MANAGER
           ======================================================== */}
        {activeTab === 'news' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#111827] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E51A1A] w-64 sm:w-80"
                />
              </div>

              <button
                onClick={() => {
                  setEditingItem({
                    title: '',
                    category: 'Company Life',
                    excerpt: '',
                    content: '',
                    author: 'Engineering Board',
                    read_time: '3 min read',
                    published: true,
                    date: new Date().toISOString().split('T')[0]
                  });
                  setModalType('news');
                }}
                className="px-4 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 shadow-md shadow-[#E51A1A]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news
                .filter(n => n.title?.toLowerCase().includes(searchTerm.toLowerCase()) || n.category?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item) => (
                  <div key={item.id} className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group">
                    <div className="relative h-44 bg-slate-900 overflow-hidden">
                      {item.image || item.cover_image_url ? (
                        <img 
                          src={item.image || item.cover_image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-mono text-slate-600">
                          No Image
                        </div>
                      )}
                      
                      <div className="absolute top-3 left-3 bg-[#E51A1A] text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded shadow">
                        {item.category || 'News'}
                      </div>

                      <div className="absolute top-3 right-3">
                        {item.published !== false ? (
                          <span className="bg-emerald-500/90 text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Live
                          </span>
                        ) : (
                          <span className="bg-slate-800/90 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                            <EyeOff className="w-3 h-3" /> Draft
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                          <span>{item.date || '2026'}</span>
                          <span>{item.author || 'CloudAxis'}</span>
                        </div>
                        <h4 className="font-bold text-white text-base leading-snug mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                          {item.excerpt || item.content}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingItem({ ...item });
                            setModalType('news');
                          }}
                          className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer flex items-center gap-1 text-xs font-mono"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="px-2.5 py-1 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded transition cursor-pointer flex items-center gap-1 text-xs font-mono"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: SERVICES & SOLUTIONS MANAGER
           ======================================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-lg font-mono">Services & Solutions Grid</h3>
                <p className="text-xs text-slate-400">Manage turnkey engineering offerings, deliverables, and display order.</p>
              </div>

              <button
                onClick={() => {
                  setEditingItem({
                    title: '',
                    short_desc: '',
                    detailed_desc: '',
                    icon_name: 'Cpu',
                    featured: false,
                    order_index: services.length + 1,
                    deliverables: []
                  });
                  setModalType('service');
                }}
                className="px-4 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 shadow-md shadow-[#E51A1A]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc, idx) => (
                <div key={svc.id || idx} className="bg-[#111827] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E51A1A]/10 border border-[#E51A1A]/30 flex items-center justify-center text-[#E51A1A]">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        {svc.featured && (
                          <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded text-[10px] font-mono">
                            Featured
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-500">
                          #{svc.order_index ?? idx + 1}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-white text-base mb-2">{svc.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4">{svc.short_desc || svc.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingItem({
                          ...svc,
                          deliverables: Array.isArray(svc.deliverables) ? svc.deliverables.join('\n') : (svc.deliverables || '')
                        });
                        setModalType('service');
                      }}
                      className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer flex items-center gap-1 text-xs font-mono"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(svc.id)}
                      className="px-2.5 py-1 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded transition cursor-pointer flex items-center gap-1 text-xs font-mono"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: CLIENT TESTIMONIALS MANAGER
           ======================================================== */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-lg font-mono">Client Testimonials & Feedback</h3>
                <p className="text-xs text-slate-400">Manage client quotes, plant director reviews, and ratings.</p>
              </div>

              <button
                onClick={() => {
                  setEditingItem({
                    client_name: '',
                    designation: '',
                    company: '',
                    rating: 5,
                    quote: '',
                    tag: 'Turnkey Automation'
                  });
                  setModalType('testimonial');
                }}
                className="px-4 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 shadow-md shadow-[#E51A1A]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div key={t.id || idx} className="bg-[#111827] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {t.tag || 'Client'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic mb-5 leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t.client_name || t.author}</div>
                      <div className="text-[10px] text-slate-400">{t.designation || t.role} • {t.company}</div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingItem({ ...t });
                          setModalType('testimonial');
                        }}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="p-1 text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: INQUIRIES & RFP INBOX
           ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-lg font-mono flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-[#E51A1A]" />
                  Incoming Client Inquiries & RFP Quotes ({inquiries.length})
                </h3>
                <p className="text-xs text-slate-400">Review incoming submissions from the Contact Form and RFP Modal.</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-[#111827] border border-slate-800 p-1 rounded-lg text-xs font-mono">
                {['all', 'new', 'contacted', 'closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded capitalize transition cursor-pointer ${
                      statusFilter === st 
                        ? 'bg-[#E51A1A] text-white font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              {inquiries
                .filter(i => statusFilter === 'all' || i.status === statusFilter)
                .map((inq) => (
                  <div key={inq.id} className="p-5 border-b border-slate-800/80 hover:bg-slate-900/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-sm">{inq.sender_name}</span>
                        {inq.organization && (
                          <span className="text-xs text-slate-400 font-mono">({inq.organization})</span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          inq.status === 'new'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : inq.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {inq.status}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 font-medium">
                        Service: <span className="text-[#E51A1A]">{inq.service || inq.subject}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" /> {inq.email}</span>
                        {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-500" /> {inq.phone}</span>}
                      </div>

                      <p className="text-xs text-slate-300 pt-1 line-clamp-2 max-w-3xl">
                        {inq.message}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(inq);
                          setModalType('inquiry_view');
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded font-mono transition cursor-pointer"
                      >
                        Read Full
                      </button>

                      {inq.status !== 'contacted' && (
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'contacted')}
                          className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs rounded font-mono transition cursor-pointer"
                        >
                          Mark Contacted
                        </button>
                      )}

                      {inq.status !== 'closed' && (
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'closed')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded font-mono transition cursor-pointer"
                        >
                          Close
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 transition cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

              {inquiries.length === 0 && (
                <div className="py-16 text-center text-xs font-mono text-slate-500">
                  Inbox is empty. Submissions from visitors on the live site will automatically appear here.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: DATABASE & SYSTEM CONFIGURATION
           ======================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-[#111827] border border-slate-800 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <Database className="w-5 h-5 text-[#E51A1A]" />
                Supabase Backend Configuration
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Your database is powered by Supabase (PostgreSQL + Auth + Storage).
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${
              isSupabaseConfigured 
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
            }`}>
              <div className="font-semibold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Active Database: {isSupabaseConfigured ? 'Supabase Cloud PostgreSQL' : 'Local Fallback'}
              </div>
              <p className="text-xs mt-1 text-slate-300">
                All changes made across Projects, News, Services, Testimonials, and Inquiries are synced deterministically.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#0B0F19] border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-slate-400">Active Tables:</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded">public.projects</span>
                <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded">public.news</span>
                <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded">public.services</span>
                <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded">public.testimonials</span>
                <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded">public.inquiries</span>
                <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded">storage.buckets (media)</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          MODAL: ADD / EDIT PROJECT
         ======================================================== */}
      {modalType === 'project' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-2xl rounded-xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => { setModalType(null); setEditingItem(null); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#E51A1A]" />
              {editingItem.id ? 'Edit Case Study Project' : 'Create New Project'}
            </h2>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Smart Factory PLC & SCADA Architecture Modernization"
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Industry / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.industry || editingItem.sector || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value, sector: e.target.value })}
                    placeholder="e.g. FMCG Bottling"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  >
                    <option value="Factory Automation">Factory Automation</option>
                    <option value="Control Panels">Control Panels</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Industrial IoT">Industrial IoT</option>
                    <option value="Airport Systems">Airport Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Status
                  </label>
                  <select
                    value={editingItem.status || 'Completed'}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Performance Metric (Highlight)
                  </label>
                  <input
                    type="text"
                    value={editingItem.metric || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, metric: e.target.value })}
                    placeholder="Zero Downtime Cutover • +28% Throughput"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingItem.duration || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    placeholder="e.g. 6 Weeks"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Project Cover Image (URL or Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editingItem.image || editingItem.cover_image_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value, cover_image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                  />
                  <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, 'image')} 
                      className="hidden" 
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Technical Specifications / Tech Stack (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingItem.tech_stack || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, tech_stack: e.target.value, tags: e.target.value })}
                  placeholder="Siemens TIA Portal, Ignition SCADA, Profinet, Sick Sensors"
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Scope of Work & Technical Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || editingItem.objective || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value, objective: e.target.value })}
                  placeholder="Describe client requirements, machinery architecture, and execution..."
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.deliverables || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, deliverables: e.target.value })}
                  placeholder={"Siemens fail-safe PLC architecture\nCentral SCADA visualization with OEE\nEPLAN electrical schematics"}
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="project_published"
                  checked={editingItem.published !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="rounded border-slate-700 text-[#E51A1A] focus:ring-[#E51A1A]"
                />
                <label htmlFor="project_published" className="text-xs font-mono text-slate-300">
                  Publish Live Immediately (uncheck to save as draft)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setModalType(null); setEditingItem(null); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={contentLoading}
                  className="px-5 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider rounded-lg transition font-bold shadow-md shadow-[#E51A1A]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT NEWS ARTICLE
         ======================================================== */}
      {modalType === 'news' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-2xl rounded-xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => { setModalType(null); setEditingItem(null); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#E51A1A]" />
              {editingItem.id ? 'Edit News Article' : 'Create New News Article'}
            </h2>

            <form onSubmit={handleSaveNews} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. CloudAxis Launches Modular Control Systems"
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  >
                    <option value="Company Life">Company Life</option>
                    <option value="Projects">Projects</option>
                    <option value="Smart Tech">Smart Tech</option>
                    <option value="Airport Systems">Airport Systems</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Awards">Awards</option>
                    <option value="Accreditation">Accreditation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingItem.author}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    placeholder="Engineering Board"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Cover Photo (URL or Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editingItem.image || editingItem.cover_image_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value, cover_image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                  />
                  <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, 'image')} 
                      className="hidden" 
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  placeholder="Concise overview for the news card..."
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Full Article Body
                </label>
                <textarea
                  rows={5}
                  value={editingItem.content || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  placeholder="Detailed press release or article content..."
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="news_published"
                  checked={editingItem.published !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                  className="rounded border-slate-700 text-[#E51A1A] focus:ring-[#E51A1A]"
                />
                <label htmlFor="news_published" className="text-xs font-mono text-slate-300">
                  Publish Article Live Immediately
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setModalType(null); setEditingItem(null); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={contentLoading}
                  className="px-5 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider rounded-lg transition font-bold shadow-md shadow-[#E51A1A]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT SERVICE
         ======================================================== */}
      {modalType === 'service' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-xl rounded-xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => { setModalType(null); setEditingItem(null); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#E51A1A]" />
              {editingItem.id ? 'Edit Service' : 'Add New Service Offering'}
            </h2>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Industrial Automation & PLC/SCADA"
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Icon Style
                  </label>
                  <select
                    value={editingItem.icon_name || 'Cpu'}
                    onChange={(e) => setEditingItem({ ...editingItem, icon_name: e.target.value })}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  >
                    <option value="Cpu">Cpu (Automation / PLC)</option>
                    <option value="Zap">Zap (Electrical / Panels)</option>
                    <option value="Wrench">Wrench (Mechanical / Fabrication)</option>
                    <option value="Boxes">Boxes (IoT / Smart Tech)</option>
                    <option value="Layers">Layers (Servo Motion)</option>
                    <option value="ShieldCheck">ShieldCheck (Process Control)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={editingItem.order_index ?? 0}
                    onChange={(e) => setEditingItem({ ...editingItem, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>
              </div>

              {/* Service Cover Image */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Service Photo (URL or Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editingItem.image_url || editingItem.image || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  />
                  <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, 'image_url')} 
                      className="hidden" 
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Short Description (For Cards)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.short_desc || editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, short_desc: e.target.value })}
                  placeholder="Intelligent deterministic control architectures..."
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Key Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.deliverables || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, deliverables: e.target.value })}
                  placeholder={"IEC 61131-3 logic programming\nISA-101 high-performance HMI\nProfinet & Ethernet/IP"}
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="service_featured"
                  checked={Boolean(editingItem.featured)}
                  onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                  className="rounded border-slate-700 text-[#E51A1A]"
                />
                <label htmlFor="service_featured" className="text-xs font-mono text-slate-300">
                  Highlight as Featured Turnkey Solution
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setModalType(null); setEditingItem(null); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={contentLoading}
                  className="px-5 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider rounded-lg transition font-bold shadow-md shadow-[#E51A1A]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT TESTIMONIAL
         ======================================================== */}
      {modalType === 'testimonial' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-lg rounded-xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => { setModalType(null); setEditingItem(null); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              {editingItem.id ? 'Edit Testimonial' : 'Add Client Testimonial'}
            </h2>

            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.client_name || editingItem.author || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, client_name: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingItem.rating || 5}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.designation || editingItem.role || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                    placeholder="VP of Operations"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.company || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    placeholder="Apex Beverage Group"
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Client Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  placeholder="CloudAxis re-architected our legacy control panels in a 36-hour weekend window with zero production loss..."
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#E51A1A]"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setModalType(null); setEditingItem(null); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={contentLoading}
                  className="px-5 py-2 bg-[#E51A1A] hover:bg-[#c91515] text-white text-xs font-mono uppercase tracking-wider rounded-lg transition font-bold shadow-md shadow-[#E51A1A]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: VIEW FULL INQUIRY DETAILS
         ======================================================== */}
      {modalType === 'inquiry_view' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-xl rounded-xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => { setModalType(null); setEditingItem(null); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-mono mb-4 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#E51A1A]" />
              Inquiry / RFP Ticket
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4 bg-[#0B0F19] p-4 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 uppercase block">Sender Name:</span>
                  <span className="text-white font-bold text-sm">{editingItem.sender_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block">Organization:</span>
                  <span className="text-slate-200">{editingItem.organization || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block">Email Address:</span>
                  <a href={`mailto:${editingItem.email}`} className="text-[#E51A1A] underline">{editingItem.email}</a>
                </div>
                <div>
                  <span className="text-slate-500 uppercase block">Phone / WhatsApp:</span>
                  <span className="text-slate-200">{editingItem.phone || 'Not provided'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 uppercase font-semibold">Service Required / Subject:</span>
                <div className="mt-1 p-2 bg-[#0B0F19] rounded border border-slate-800 text-white font-semibold">
                  {editingItem.service || editingItem.subject}
                </div>
              </div>

              <div>
                <span className="text-slate-400 uppercase font-semibold">Full Client Scope & Message:</span>
                <div className="mt-1 p-3 bg-[#0B0F19] rounded border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {editingItem.message}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleUpdateInquiryStatus(editingItem.id, 'contacted');
                      setModalType(null);
                    }}
                    className="px-3 py-1.5 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 rounded cursor-pointer"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateInquiryStatus(editingItem.id, 'closed');
                      setModalType(null);
                    }}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded cursor-pointer"
                  >
                    Close Ticket
                  </button>
                </div>

                <button
                  onClick={() => { setModalType(null); setEditingItem(null); }}
                  className="px-4 py-1.5 bg-[#E51A1A] hover:bg-[#c91515] text-white rounded font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
