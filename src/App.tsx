import React, { useState, useEffect } from 'react';
import { Product, CaseStudy, CMSBlock, Channel, User } from './types';
import ShowcaseView from './components/ShowcaseView';
import ChatroomView from './components/ChatroomView';
import UserDashboardView from './components/UserDashboardView';
import CMSAdminView from './components/CMSAdminView';
import AuthModal from './components/AuthModal';
import OpsControlTower from './components/OpsControlTower';
import { 
  Building2, MessageSquareLock, ShieldAlert, Cpu, Lock, 
  HelpCircle, UserCheck, Settings, LogOut, LayoutDashboard, KeyRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'showcase' | 'chat' | 'dashboard' | 'cms'>('overview');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Server memory database mirrors
  const [products, setProducts] = useState<Product[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [cmsBlocks, setCmsBlocks] = useState<CMSBlock[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>('chan-general');

  const [loading, setLoading] = useState(true);

  // Fetch initial corporate datasets on load
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resProd, resCs, resCms, resChans] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/case-studies'),
        fetch('/api/cms-blocks'),
        fetch('/api/channels'),
      ]);

      const prodData = await resProd.json();
      const csData = await resCs.json();
      const cmsData = await resCms.json();
      const chansData = await resChans.json();

      setProducts(prodData);
      setCaseStudies(csData);
      setCmsBlocks(cmsData);
      setChannels(chansData);
    } catch (err) {
      console.error('Failed to parse database records from Express endpoints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Recover cached logged-in user from localStorage for continuous authentication
    const cached = localStorage.getItem('ai_innovations_user');
    if (cached) {
      try {
        setCurrentUser(JSON.parse(cached));
      } catch (e) {
        localStorage.removeItem('ai_innovations_user');
      }
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('ai_innovations_user', JSON.stringify(user));
    setShowAuthModal(false);
    
    // Redirect admin user directly to the CMS panel
    if (user.role === 'admin' && activeTab === 'showcase') {
      setActiveTab('cms');
    } else if (activeTab === 'showcase') {
      setActiveTab('chat');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ai_innovations_user');
    setActiveTab('showcase');
  };

  // Channel Creation Trigger Handlers (CMS or Sidebar)
  const handleAddChannel = async (name: string, description: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setChannels(prev => [...prev, data.channel]);
        return true;
      } else {
        alert(data.error || 'Failed to instantiate channel router.');
        return false;
      }
    } catch (err) {
      console.error('API Error adding channel:', err);
      return false;
    }
  };

  // CMS Catalog Item Updates inside Memory Server
  const handleUpdateProduct = async (product: Partial<Product>): Promise<boolean> => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        await fetchData(); // refresh catalogs
        return true;
      }
      return false;
    } catch (err) {
      console.error('API Error updating catalogs:', err);
      return false;
    }
  };

  const handleDeleteProduct = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        await fetchData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('API Error deleting product listing:', err);
      return false;
    }
  };

  // CMS block text copy update
  const handleUpdateCmsBlock = async (block: CMSBlock): Promise<boolean> => {
    try {
      const response = await fetch('/api/cms-blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(block),
      });
      if (response.ok) {
        await fetchData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('API Error updating CMS blocks:', err);
      return false;
    }
  };

  // User details preference update inside Dashboard
  const handleUpdateUser = async (updatedFields: Partial<User>): Promise<boolean> => {
    if (!currentUser) return false;
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser.username,
          ...updatedFields
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setCurrentUser(data.user);
        localStorage.setItem('ai_innovations_user', JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch (err) {
      console.error('API Error updating user settings:', err);
      return false;
    }
  };

  // Security barrier logic for click triggers
  const handleTabClick = (tab: 'overview' | 'showcase' | 'chat' | 'dashboard' | 'cms') => {
    if (tab === 'overview' || tab === 'showcase') {
      setActiveTab(tab);
      return;
    }

    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* HEADER NAVIGATION SHELL */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 active:scale-98 transition-transform group text-left"
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-xs">
              <Cpu className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-850 block leading-none">AI INNOVATIONS</span>
              <span className="text-[9px] font-sans text-blue-600 tracking-wider uppercase block font-bold leading-none mt-1">COGNITIVE PLATFORM</span>
            </div>
          </button>

          {/* Secure status badges from Professional Polish design */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mt-0.5"></div>
              <span className="text-[9.5px] font-semibold text-emerald-700 uppercase">E2E Encryption Active</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-105 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-0.5"></div>
              <span className="text-[9.5px] font-semibold text-blue-700 uppercase font-bold">MONOREPO LIVE</span>
            </div>
          </div>

          {/* Nav pills */}
          <nav className="flex items-center bg-slate-100 p-1 border border-slate-200 rounded-xl overflow-hidden font-sans font-bold shadow-inner">
            <button
              onClick={() => handleTabClick('overview')}
              className={`text-[9.5px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'overview' 
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/55' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              OPS CONTROL TOWER
            </button>
            <button
              onClick={() => handleTabClick('showcase')}
              className={`text-[9.5px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'showcase' 
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/55' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              DIRECTORY SHOWCASE
            </button>
            <button
              onClick={() => handleTabClick('chat')}
              className={`text-[9.5px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'chat' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              <MessageSquareLock className="w-3.5 h-3.5 shrink-0" />
              SECURE CHAT
            </button>
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`text-[9.5px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/55' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              IDENTITY
            </button>
            <button
              onClick={() => handleTabClick('cms')}
              className={`text-[9.5px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'cms' 
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/55' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              CMS PANEL
            </button>
          </nav>

          {/* User controls */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-slate-800 block leading-none">{currentUser.username}</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold block mt-1">{currentUser.role} node</span>
                </div>
                <img src={currentUser.avatar} alt="identity avatar" className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 hidden sm:block" />
                <button
                  onClick={handleLogout}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                  title="Logout Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-sans font-bold px-3.5 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 shadow-xs shadow-blue-105"
              >
                <KeyRound className="w-3.5 h-3.5" />
                Authenticate
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER PANEL */}
      <main className="flex-1 bg-[#F1F5F9] relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-32 space-y-4">
            <RefreshSpinner />
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block animate-pulse">Initializing Database Kernels...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto py-4"
            >
              {activeTab === 'overview' && (
                <OpsControlTower
                  currentUser={currentUser}
                  products={products}
                  caseStudies={caseStudies}
                  cmsBlocks={cmsBlocks}
                  channels={channels}
                  onNavigate={handleTabClick}
                  onOpenAuth={() => setShowAuthModal(true)}
                />
              )}

              {activeTab === 'showcase' && (
                <ShowcaseView 
                  products={products}
                  caseStudies={caseStudies}
                  cmsBlocks={cmsBlocks}
                  onTriggerDemo={(room) => {
                    setActiveRoomId(room);
                    handleTabClick('chat');
                  }}
                />
              )}

              {activeTab === 'chat' && currentUser && (
                <ChatroomView
                  currentUser={currentUser}
                  channels={channels}
                  onAddChannel={handleAddChannel}
                  activeRoomId={activeRoomId}
                  onChangeRoom={(id) => setActiveRoomId(id)}
                />
              )}

              {activeTab === 'dashboard' && currentUser && (
                <UserDashboardView
                  currentUser={currentUser}
                  onUpdateUser={handleUpdateUser}
                />
              )}

              {activeTab === 'cms' && (
                <CMSAdminView
                  currentUser={currentUser}
                  products={products}
                  caseStudies={caseStudies}
                  cmsBlocks={cmsBlocks}
                  channels={channels}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onUpdateCmsBlock={handleUpdateCmsBlock}
                  onAddChannel={handleAddChannel}
                  onTriggerAuthRedirect={() => setShowAuthModal(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* GLOBAL AUTHORIZATION POPUP OVERLAY MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md"
            >
              <AuthModal 
                onSuccess={handleAuthSuccess}
                onClose={() => setShowAuthModal(false)}
              />
              
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-xs font-mono text-slate-500 hover:text-slate-300 bg-slate-950/40 p-1 rounded-md border border-slate-850"
              >
                ESC
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SWISS MODERN FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center mt-12 overflow-hidden shrink-0 text-slate-600 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-slate-505 font-mono space-y-4 md:space-y-0">
          <div className="flex items-center gap-2 select-none">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping shrink-0" />
            <span className="text-slate-600 font-semibold">Nodes Online: Port 3000 AES-256 Verified TLS</span>
          </div>

          <div className="space-x-4 text-slate-500 font-medium">
            <span className="hover:text-slate-800 transition-colors cursor-pointer select-none">Corporate Directory</span>
            <span>·</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer select-none">Privacy & HSM Audits</span>
            <span>·</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer select-none">SecureNet Central</span>
          </div>

          <div className="text-[11px] select-none text-slate-400">
            SYSTEM_TIME_ESTABLISHED_UTC: {new Date().toISOString().substring(0, 10)}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Beautiful simple custom SVG spinning indicator
function RefreshSpinner() {
  return (
    <svg className="animate-spin h-8 w-8 text-indigo-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}
