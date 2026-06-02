import React, { useState } from 'react';
import { Product, CaseStudy, CMSBlock } from '../types';
import { 
  Activity, Stethoscope, MessageSquare, FileSpreadsheet, Wallet, 
  BarChart3, GraduationCap, PieChart, ArrowUpRight, CheckCircle2, 
  Sparkles, Award, Shield, Cpu, RefreshCw, Layers
} from 'lucide-react';
import { motion } from 'motion/react';

interface ShowcaseViewProps {
  products: Product[];
  caseStudies: CaseStudy[];
  cmsBlocks: CMSBlock[];
  onTriggerDemo: (room: string) => void;
}

// Icon helper mapping strings to Lucide icon components
export const IconMapper: Record<string, React.ComponentType<any>> = {
  Activity,
  Stethoscope,
  MessageSquare,
  FileSpreadsheet,
  Wallet,
  BarChart3,
  GraduationCap,
  PieChart,
  Cpu,
};

export default function ShowcaseView({ products, caseStudies, cmsBlocks, onTriggerDemo }: ShowcaseViewProps) {
  const [selectedDomain, setSelectedDomain] = useState<'All' | 'Healthcare' | 'FinTech' | 'Conversational' | 'PropTech'>('All');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Filter products by domain categories
  const filteredProducts = products.filter(p => {
    if (selectedDomain === 'All') return true;
    if (selectedDomain === 'Healthcare') return p.category.includes('Healthcare');
    if (selectedDomain === 'FinTech') return p.category.includes('Fintech') || p.category.includes('Wallet');
    if (selectedDomain === 'Conversational') return p.category.includes('Conversational');
    if (selectedDomain === 'PropTech') return p.category.includes('PropTech') || p.category.includes('Business');
    return true;
  });

  // Fetch CMS strings
  const getCmsContent = (key: string, fb: string) => {
    return cmsBlocks.find(b => b.key === key)?.content || fb;
  };

  const getCmsTitle = (key: string, fb: string) => {
    return cmsBlocks.find(b => b.key === key)?.title || fb;
  };

  const topStats = [
    { label: 'Telehealth Waiting Wait Times', value: '85% Reduction', desc: 'Compressed from 3 weeks to under 24 hours in Labaid Care clinical trials.' },
    { label: 'Early Malignant Detection', value: '+40% Clinical Rate', desc: 'Powered by 3D Convolutional prescription models.' },
    { label: 'Consumer Call Auto-Deflection', value: '70% Deflected', desc: 'Through Bangla & Banglish dialectic speech engines.' },
    { label: 'Banking Document Audits', value: '95.6% OCR Pass', desc: 'Maker-checker flow with on-prem data protection compliance.' }
  ];

  return (
    <div className="space-y-16 py-6 pb-16">
      {/* Dynamic Jumbotron Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full text-blue-705 text-xs font-sans font-semibold mb-6 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-600" />
          <span>PROPRIETARY COGNITIVE INFRASTRUCTURE · FINTECH & MEDICINE</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-slate-900 leading-none"
        >
          {getCmsContent('hero_title', 'Enterprise AI Engineering. Crafted for Scale.')}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-base sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
        >
          {getCmsContent('hero_subtitle', 'We design, deploy, and maintain world-class autonomous intelligence systems across Healthcare Providers, Fintech Platforms, and Commercial Analytics.')}
        </motion.p>

        {/* Dynamic Launch Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <button 
            onClick={() => onTriggerDemo('chan-general')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-100 hover:-translate-y-0.5 active:translate-y-0"
          >
            Launch Encrypted Chatroom
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <a 
            href="#solutions-map"
            className="flex items-center bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-sans text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-xs hover:bg-slate-50/80"
          >
            Explore Solution Maps
          </a>
        </motion.div>
      </section>

      {/* Corporate Impact Metrics Board */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {topStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:scale-101 hover:shadow-sm hover:border-slate-300 transition-all group"
          >
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider font-bold block mb-2">{stat.label}</span>
              <h3 className="text-2xl font-bold font-sans text-blue-600 tracking-tight group-hover:text-blue-700 transition-colors">{stat.value}</h3>
            </div>
            <p className="text-[11px] text-slate-550 font-sans mt-3 border-t border-slate-100 pt-3 leading-relaxed">{stat.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Interactive Domain Explorer Mapping Engine */}
      <section id="solutions-map" className="max-w-7xl mx-auto px-4 space-y-8 scroll-mt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-5">
          <div>
            <span className="text-[10px] uppercase font-mono text-blue-600 tracking-widest block mb-1 font-bold">INTERACTIVE FRAMEWORK</span>
            <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Active Solutions Directory</h2>
            <p className="text-xs text-slate-500 font-sans mt-1 font-medium">Select an operational domain sector to isolate proprietary modules</p>
          </div>
          
          {/* Filtering Pillars */}
          <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0 bg-white p-1 border border-slate-200 rounded-xl shadow-xs">
            {(['All', 'Healthcare', 'FinTech', 'Conversational', 'PropTech'] as const).map(domain => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`text-[9.5px] font-sans font-bold tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedDomain === domain 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-805 hover:bg-slate-50/50'
                }`}
              >
                {domain.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        {/* Modular Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const CurrentIcon = IconMapper[product.icon] || Cpu;
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-sm p-6 rounded-2xl flex flex-col justify-between group relative transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-xs">
                        <CurrentIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </div>
                      <div>
                        <span className="text-[9px] font-sans font-bold text-blue-600 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-bold font-sans text-slate-850 mt-1.5 group-hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`text-[8.5px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 ${
                      product.status === 'Live & Production' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : product.status === 'MVP Complete' 
                        ? 'bg-amber-50 text-amber-700 border-amber-100' 
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-4 leading-relaxed font-sans line-clamp-3">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                        {product.metricLabel}
                      </span>
                      <span className="text-lg font-extrabold font-sans text-slate-800 tracking-tight block mt-0.5">
                        {product.metricValue}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                        Key KPI Milestones
                      </span>
                      {product.impactMetrics?.slice(0, 2).map((im, i) => (
                        <div key={i} className="flex justify-between text-[10px] font-mono leading-none">
                          <span className="text-slate-500 truncate max-w-[100px]">{im.label}</span>
                          <span className="text-blue-600 font-bold">{im.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      const demoRoom = product.category.includes('Healthcare') 
                        ? 'chan-healthcare' 
                        : product.category.includes('Fintech') || product.category.includes('Wallet')
                        ? 'chan-fintech'
                        : 'chan-general';
                      onTriggerDemo(demoRoom);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-700 text-slate-600 text-xs font-sans font-bold py-2.5 rounded-xl transition-all shadow-xs"
                  >
                    CONNECT LIVE DISPATCH
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Case Studies Accordion & Multi-Domain Results */}
      <section className="bg-white border-y border-slate-200 py-12 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center">
            <span className="text-[10px] uppercase font-mono text-blue-600 tracking-widest block mb-1 font-bold">PROVEN DEPLOYMENTS</span>
            <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Enterprise Success Paradigms</h2>
            <p className="text-xs text-slate-550 max-w-md mx-auto mt-1 font-sans font-medium">Empirical records validating early stage diagnostic screening and fintech compliance speeds</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => {
              return (
                <div 
                  key={caseStudy.id}
                  className="bg-slate-50/50 border border-slate-200 hover:border-slate-350 hover:bg-white p-6 rounded-2xl flex flex-col justify-between transition-all shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between pointer-events-none mb-3">
                      <span className="text-[9px] font-sans tracking-wider font-bold text-emerald-700 uppercase px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                        {caseStudy.status}
                      </span>
                      <span className="text-[10px] font-sans font-bold text-slate-400">
                        Duration: {caseStudy.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-sans text-slate-800 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-[11px] font-sans text-blue-600 font-bold">
                      Client: {caseStudy.client}
                    </p>
                    
                    {/* Accordion Detail Panel */}
                    <div className="space-y-4 mt-6">
                      <div>
                        <h4 className="text-[10px] uppercase font-sans tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5ClassName bg-transparent">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> Operational Challenge
                        </h4>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 font-sans">
                          {caseStudy.challenge?.map((ch, i) => <li key={i}>{ch}</li>)}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[10px] uppercase font-sans tracking-wider text-blue-600 font-bold mb-2 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-500" /> Coengineered Solution
                        </h4>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-slate-650 font-sans">
                          {caseStudy.solution?.map((sol, i) => <li key={i}>{sol}</li>)}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <h4 className="text-[10px] uppercase font-sans tracking-widest text-slate-800 font-bold mb-2 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> Measured Outcomes
                        </h4>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-emerald-700 font-sans font-bold">
                          {caseStudy.results?.map((res, i) => <li key={i}>{res}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance & Mandate static widget with CMS controls */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="inline-flex w-10 h-10 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full items-center justify-center shadow-xs">
          <Shield className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold font-sans text-slate-800 tracking-tight">
          {getCmsTitle('ethics_compliance', 'Ethics, Privacy & Regulatory Compliance')}
        </h3>
        <p className="text-xs text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto font-medium">
          {getCmsContent('ethics_compliance', 'Ethics Guidelines: All AI Innovations platforms are engineered with strict respect for data privacy and clinical data guidelines. We implement enterprise AES-256 TLS networks, human-in-the-loop validation checkpoints, and locally sovereign database storage options.')}
        </p>
      </section>
    </div>
  );
}
