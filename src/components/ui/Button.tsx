import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-black tracking-tight transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.96] overflow-hidden relative group/btn-ui transform-gpu will-change-transform";
  
  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-900 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/30 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:shadow-blue-600/40 border border-transparent shadow-md",
    secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200 hover:scale-[1.02] dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    outline: "border-2 border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-transparent backdrop-blur-sm text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 hover:scale-[1.02] shadow-sm",
    ghost: "hover:bg-slate-100 text-slate-800 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-11 px-6 text-sm",
    md: "h-14 px-10 text-base",
    lg: "h-[3.75rem] px-12 text-sm md:text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn-ui:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};