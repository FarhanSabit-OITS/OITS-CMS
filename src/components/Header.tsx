import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, ChevronDown, ArrowRight, Mail, Briefcase, Folder, Zap, Info, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';

const IconMap: Record<string, any> = {
  Home,
  Briefcase,
  Folder,
  Zap,
  Info
};

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const BrandLogo = () => (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center shrink-0 overflow-hidden" aria-hidden="true">
        {/* We use an image if available, fallback to refined SVG logo matching OITS identity */}
        <img 
          src="/oits_logo_hq.png" 
          alt="" 
          className="w-full h-full object-contain" 
          onError={(e) => {
            const target = e.target as any;
            if (target.src.includes('oits_logo_hq')) {
              target.src = '/oits_logo.png';
            } else {
              target.style.display = 'none';
              target.nextSibling.style.display = 'block';
            }
          }}
        />
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm hidden">
          <defs>
            <linearGradient id="header-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#header-logo-gradient)" />
          <text x="50" y="65" textAnchor="middle" fill="white" fontSize="40" fontWeight="900" fontFamily="sans-serif">IT</text>
        </svg>
      </div>
    </div>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-950/75 backdrop-blur-md border-b border-slate-200 dark:border-slate-900/60 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
      role="banner"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link 
          to="/"
          className="group hover:opacity-90 transition-opacity min-w-0" 
          aria-label={`${COMPANY_NAME} homepage`}
        >
          <BrandLogo />
        </Link>
 
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6" aria-label="Main site navigation">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link 
                to={item.href}
                className={`px-3 xl:px-4 py-2.5 rounded-full text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 hover:bg-blue-50/80 dark:hover:bg-slate-900/40 transition-all duration-300 flex items-center gap-2.5 ${location.pathname === item.href ? 'bg-blue-50 dark:bg-slate-900/40 text-blue-700 dark:text-sky-400' : ''}`}
              >
                {item.icon && IconMap[item.icon] ? (
                  <span className="text-blue-600 dark:text-sky-400 opacity-90 transition-transform group-hover:scale-110">
                    {React.createElement(IconMap[item.icon], { size: 18 })}
                  </span>
                ) : item.label === 'Home' ? (
                  <Home size={18} className="text-blue-600 dark:text-sky-400 opacity-90 transition-transform group-hover:scale-110" />
                ) : null}
                <span>{item.label}</span>
                {item.children && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
              </Link>
              
              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800/60 p-2 animate-in fade-in slide-in-from-top-2">
                  {item.children.map(child => (
                    <Link 
                      key={child.label} 
                      to={child.href} 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-900/60 hover:text-blue-700 dark:hover:text-sky-400 rounded-xl transition-all"
                    >
                      {(child as any).icon && IconMap[(child as any).icon] && (
                        <span className="text-blue-600/70 dark:text-sky-400/70">
                          {React.createElement(IconMap[(child as any).icon], { size: 16 })}
                        </span>
                      )}
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link 
            to="/contact"
            className="px-3 xl:px-4 py-2.5 rounded-full text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 hover:bg-blue-50/80 dark:hover:bg-slate-900/40 transition-all duration-300 flex items-center gap-2.5 text-sm font-bold"
            aria-label="Contact Us"
          >
            <Mail size={18} className="text-blue-600 dark:text-sky-400 opacity-90" />
            <span>Contact</span>
          </Link>
          
          <div className="ml-2 pl-4 border-l border-slate-200 dark:border-slate-700 flex items-center gap-3">
             <button
               onClick={() => window.location.href = '/workspace'}
               className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-all hover:text-blue-600 dark:hover:text-sky-400"
               aria-label="Access Account Workspace"
             >
               <UserCircle size={22} strokeWidth={2.5} />
             </button>
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-all active:rotate-12"
              aria-label={theme === 'dark' ? 'Switch to light visual mode' : 'Switch to dark visual mode'}
             >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation"
          className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 md:hidden p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation overlay"
        >
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link 
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-lg font-bold text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-3"
                >
                  {item.icon && IconMap[item.icon] ? (
                    React.createElement(IconMap[item.icon], { size: 20, className: "text-blue-600" })
                  ) : item.label === 'Home' ? (
                    <Home size={20} className="text-blue-600" />
                  ) : null}
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 pt-1 flex flex-col gap-1 border-l-2 border-blue-100 dark:border-slate-800 ml-6">
                    {item.children.map(child => (
                      <Link 
                        key={child.label} 
                        to={child.href} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="px-4 py-2.5 text-md font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-3 hover:text-blue-600 transition-colors"
                      >
                        {(child as any).icon && IconMap[(child as any).icon] && (
                          <span className="text-blue-500/60">
                            {React.createElement(IconMap[(child as any).icon], { size: 16 })}
                          </span>
                        )}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
