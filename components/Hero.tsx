import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Code2, Cpu, Globe, Smartphone, Cloud, ChevronRight, ChevronLeft, ExternalLink, Quote } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionId } from '../types';
import { TAGLINE, SERVICES, PROJECTS, TESTIMONIALS } from '../constants';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const scrollToContact = () => {
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    // Rotate portfolio projects
    const projectInterval = setInterval(() => {
      setActiveProjectIndex((prev) => {
        const currentFiltered = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
        return (prev + 1) % Math.min(currentFiltered.length, 4);
      });
    }, 5000);

    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
      clearInterval(projectInterval);
      clearInterval(testimonialInterval);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeCategory]);

  const nextProject = () => {
    setActiveProjectIndex((prev) => {
        const currentFiltered = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
        return (prev + 1) % Math.min(currentFiltered.length, 4);
    });
  };
  const prevProject = () => {
    setActiveProjectIndex((prev) => {
        const currentFiltered = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
        return (prev - 1 + Math.min(currentFiltered.length, 4)) % Math.min(currentFiltered.length, 4);
    });
  };

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))].slice(0, 3);
  const filteredProjects = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
  const activeProject = filteredProjects[activeProjectIndex] || filteredProjects[0];

  const nextTestimonial = () => setActiveTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setActiveTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      {/* Optimized Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out will-change-transform"
        style={{ 
          transform: `scale(1.1) translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)` 
        }}
      >
         <picture>
           <source 
             srcSet="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=75&w=640&auto=format&fit=crop&fm=webp 640w, https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop&fm=webp 1200w, https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=85&w=2000&auto=format&fit=crop&fm=webp 2000w" 
             sizes="100vw"
             type="image/webp" 
           />
           <img 
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" 
              alt="Professional software engineer focused on architecting industrial digital systems"
              className="w-full h-full object-cover opacity-100 dark:opacity-40 transition-opacity duration-700 animate-fade-in"
              loading="eager"
              // @ts-ignore - fetchPriority is a valid experimental attribute
              fetchPriority="high"
           />
         </picture>
         
         {/* Noise Texture for Realism */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Heavier Gradient Overlay for Guaranteed Legibility */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/80 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950 pointer-events-none animate-gradient-shift" 
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Decorative Parallax Icons - Deeper depth */}
      <div 
        className="absolute top-[15%] left-[5%] hidden xl:block text-blue-600 dark:text-blue-400 opacity-20 transition-all duration-300 ease-out will-change-transform z-0"
        style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0) rotate(${mousePos.x * 5}deg)` }}
      >
        <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-3xl backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-2xl">
          <Code2 size={64} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 max-w-3xl">
            {/* Badge */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-50/90 dark:bg-blue-900/60 backdrop-blur-md text-blue-800 dark:text-blue-200 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-blue-200 dark:border-blue-700 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
              <Terminal size={18} className="animate-pulse" aria-hidden="true" />
              <span>Dhaka's Premier Engineering Studio</span>
            </div>
            
            {/* Tagline */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-950 dark:text-white leading-[0.95] tracking-tighter mb-8 flex flex-wrap gap-x-4 gap-y-2 drop-shadow-2xl perspective-1000">
              {TAGLINE.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className={`${i < 2 ? 'text-slate-950 dark:text-white drop-shadow-md text-glow' : 'text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 drop-shadow-lg'} inline-block transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-gpu will-change-transform backface-hidden`}
                  style={{ 
                    transitionDelay: `${150 + i * 150}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1) rotateX(0)' : 'translateY(40px) scale(0.9) rotateX(10deg)',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Description */}
            <div 
              className={`relative mb-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full opacity-100 shadow-lg" />
              <p className="text-lg sm:text-xl md:text-2xl text-slate-950 dark:text-slate-100 font-medium max-w-2xl leading-relaxed pl-6 drop-shadow-xl text-glow">
                We architect high-performance digital systems for global disruptors. 
                From strategic consultation to industrial-grade deployment.
              </p>
            </div>

            {/* Core Services Showcase */}
            <div 
              className={`mb-8 grid grid-cols-1 xs:grid-cols-2 gap-3 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '900ms' }}
            >
              {SERVICES.slice(0, 4).map((service, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-slate-950/20 border border-white/50 dark:border-slate-850/60 backdrop-blur-md hover:bg-white/60 dark:hover:bg-slate-950/40 transition-colors group cursor-default shadow-sm">
                  <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-900/50 group-hover:scale-110 transition-transform duration-300">
                    {i === 0 && <Globe size={18} className="text-blue-600 dark:text-sky-400" aria-hidden="true" />}
                    {i === 1 && <Smartphone size={18} className="text-indigo-600 dark:text-sky-400" aria-hidden="true" />}
                    {i === 2 && <Code2 size={18} className="text-purple-600 dark:text-sky-400" aria-hidden="true" />}
                    {i === 3 && <Cloud size={18} className="text-sky-600 dark:text-sky-400" aria-hidden="true" />}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-tight">{service.title}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Snippet */}
            <div 
              className={`mb-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '950ms' }}
            >
              <div className="relative p-6 rounded-2xl bg-white/40 dark:bg-slate-950/20 backdrop-blur-md border border-white/50 dark:border-slate-850/60 shadow-sm overflow-hidden group">
                <Quote size={40} className="absolute -top-2 -right-2 text-blue-500/10 dark:text-blue-400/10 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10">
                  <p className="text-sm md:text-base text-slate-850 dark:text-slate-250 italic mb-4 line-clamp-2 min-h-[2.5rem]">
                    "{TESTIMONIALS[activeTestimonialIndex].content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={TESTIMONIALS[activeTestimonialIndex].avatar} alt={TESTIMONIALS[activeTestimonialIndex].name} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{TESTIMONIALS[activeTestimonialIndex].name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{TESTIMONIALS[activeTestimonialIndex].role}, {TESTIMONIALS[activeTestimonialIndex].company}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={prevTestimonial} className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400" aria-label="Previous testimonial"><ChevronLeft size={16} /></button>
                      <button onClick={nextTestimonial} className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400" aria-label="Next testimonial"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div 
              className={`flex flex-col sm:flex-row items-center gap-5 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                onClick={scrollToContact} 
                className="w-full sm:w-auto relative z-20 font-black tracking-widest text-[10px] tracking-widest uppercase md:text-xs border-2 border-slate-900 dark:border-blue-600 hover:border-slate-855 dark:hover:border-sky-500 ring-2 ring-white/30 dark:ring-blue-900/40 shadow-xl dark:shadow-neon-blue whitespace-nowrap hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Get a quote for your project"
              >
                <div className="flex flex-row items-center gap-2">
                  LEARN MORE <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={16} aria-hidden="true" />
                </div>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToContact} 
                className="w-full sm:w-auto relative z-20 font-black tracking-widest text-[10px] tracking-widest uppercase md:text-xs bg-white/80 dark:bg-slate-950/40 backdrop-blur-xl border-slate-300 dark:border-slate-800/80 text-slate-950 dark:text-white hover:bg-white dark:hover:bg-slate-900/50 shadow-lg transition-all duration-300"
                aria-label="Request a demo consultation"
              >
                REQUEST DEMO
              </Button>
            </div>

            {/* About Us Snippet */}
            <div 
              className={`mt-8 flex items-center gap-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{ transitionDelay: '1100ms' }}
            >
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 text-center">
                Engineering excellence from Dhaka to the world. <br className="sm:hidden" />
                <button onClick={scrollToAbout} className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors ml-1">Discover our story &rarr;</button>
              </p>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>

          {/* Right Column: Portfolio Preview (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 relative h-[500px]">
             <div 
               className={`absolute inset-0 transition-all duration-[1500ms] ease-out transform-gpu ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
               style={{ transitionDelay: '1200ms' }}
             >
                {/* Dynamic Portfolio Card */}
                <div className="relative w-full h-full">
                  {/* Abstract Background Shapes */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                  {/* Card Container */}
                  <div className="relative z-10 w-full bg-white/10 dark:bg-slate-950/40 backdrop-blur-md border border-white/20 dark:border-slate-800/80 rounded-3xl p-6 shadow-2xl transition-all duration-500 hover:border-slate-700/60 dark:glass-card-glow group">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Featured Work</span>
                      </div>
                      <button 
                        onClick={scrollToPortfolio}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        aria-label="View all projects"
                      >
                        View All <ChevronRight size={12} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                      {categories.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setActiveProjectIndex(0); }}
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Project Image */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-slate-200 dark:bg-slate-800 group/image">
                      {filteredProjects.slice(0, 4).map((project, index) => (
                        <div 
                          key={project.id}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeProjectIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover transform transition-transform duration-[5000ms] ease-linear scale-100 group-hover/image:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-80 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      ))}

                      {/* Swipe Arrows */}
                      <button 
                         onClick={(e) => { e.stopPropagation(); prevProject(); }} 
                         className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-30"
                         aria-label="Previous project"
                      >
                         <ChevronLeft size={16} />
                      </button>
                      <button 
                         onClick={(e) => { e.stopPropagation(); nextProject(); }} 
                         className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-30"
                         aria-label="Next project"
                      >
                         <ChevronRight size={16} />
                      </button>
                      
                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-2 py-1 rounded bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-lg transform -translate-x-2 opacity-0 group-hover/image:translate-x-0 group-hover/image:opacity-100 transition-all duration-500 delay-100">
                          {activeProject?.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1 leading-tight drop-shadow-md">
                          {activeProject?.title}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 delay-200">
                          {activeProject?.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex gap-1 mb-4">
                      {filteredProjects.slice(0, 4).map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div 
                            className={`h-full bg-blue-600 transition-all duration-500 ${idx === activeProjectIndex ? 'w-full' : 'w-0'}`}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between group/btn hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300"
                      onClick={scrollToPortfolio}
                      aria-label={`View details for ${activeProject?.title}`}
                    >
                      <span className="font-semibold flex items-center gap-2">
                        Learn More
                        <ExternalLink size={16} className="text-slate-400 group-hover/btn:text-blue-600 transition-colors" aria-hidden="true" />
                      </span>
                    </Button>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Stats Grid - Moved to bottom and refined */}
        <div 
          className={`mt-16 lg:mt-24 pt-8 border-t border-slate-200 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1300ms' }}
        >
            {[
              { val: "150+", label: "Deliveries", color: "bg-blue-600" },
              { val: "50+", label: "Engineers", color: "bg-indigo-600" },
              { val: "98%", label: "Satisfaction", color: "bg-green-600" },
              { val: "24/7", label: "Support", color: "bg-yellow-500" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group cursor-default transition-all duration-1000 transform-gpu ease-out"
                style={{ 
                  transitionDelay: `${1400 + (i * 100)}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0
                }}
              >
                <p className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 drop-shadow-md text-glow">{stat.val}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`w-8 h-1 ${stat.color} rounded-full group-hover:w-12 transition-all duration-500 shadow-sm`} aria-hidden="true" />
                  <p className="text-[10px] md:text-xs text-slate-800 dark:text-slate-300 uppercase tracking-[0.2em] font-bold shadow-black/5">{stat.label}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};