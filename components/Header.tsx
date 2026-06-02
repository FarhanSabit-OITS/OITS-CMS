import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';

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
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="header-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#header-logo-gradient)" strokeWidth="7" />
          <path d="M38 32 H48 V68 H38 Z" fill="url(#header-logo-gradient)" />
          <path d="M54 32 H84 V41 H74 V68 H64 V41 H54 Z" fill="url(#header-logo-gradient)" />
        </svg>
      </div>
      <span className="text-base xs:text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-200 filter drop-shadow-sm">
        {COMPANY_NAME}
      </span>
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
        <nav className="hidden md:flex items-center gap-1 xl:gap-2" aria-label="Main site navigation">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link 
                to={item.href}
                className={`px-3 xl:px-4 py-2 rounded-full text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-400 hover:bg-blue-50/80 dark:hover:bg-slate-900/40 transition-all duration-300 flex items-center gap-1 ${location.pathname === item.href ? 'text-blue-600' : ''}`}
              >
                {item.label === 'Home' ? <Home size={18} /> : item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>
              
              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-800/60 p-2 animate-in fade-in slide-in-from-top-2">
                  {item.children.map(child => (
                    <Link key={child.label} to={child.href} className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-900/40 rounded-lg">{child.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center gap-2">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-all active:rotate-12"
              aria-label={theme === 'dark' ? 'Switch to light visual mode' : 'Switch to dark visual mode'}
             >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <Link
               to="/contact"
               className="inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 rounded-full text-[10px] tracking-widest font-black text-white bg-blue-600 hover:bg-sky-500 hover:shadow-neon-blue active:scale-95 transition-all duration-300 uppercase"
               aria-label="Get a quote for your project"
             >
               Get a Quote <ArrowRight size={14} aria-hidden="true" />
             </Link>
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
                  className="px-4 py-3 rounded-lg text-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all block"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 flex flex-col gap-1">
                    {item.children.map(child => (
                      <Link key={child.label} to={child.href} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-md text-slate-600 dark:text-slate-400">{child.label}</Link>
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
