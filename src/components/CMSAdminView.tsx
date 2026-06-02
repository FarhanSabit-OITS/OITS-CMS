import React, { useState } from 'react';
import { Product, CaseStudy, CMSBlock, Channel, User } from '../types';
import { 
  Lock, LayoutGrid, FileEdit, Plus, Trash2, ShieldAlert, Check, 
  RefreshCw, Layers, Sparkles, Sliders, Settings, Hash
} from 'lucide-react';
import { motion } from 'motion/react';

interface CMSAdminViewProps {
  currentUser: User | null;
  products: Product[];
  caseStudies: CaseStudy[];
  cmsBlocks: CMSBlock[];
  channels: Channel[];
  onUpdateProduct: (product: Partial<Product>) => Promise<boolean>;
  onDeleteProduct: (id: string) => Promise<boolean>;
  onUpdateCmsBlock: (block: CMSBlock) => Promise<boolean>;
  onAddChannel: (name: string, desc: string) => Promise<boolean>;
  onTriggerAuthRedirect: () => void;
}

export default function CMSAdminView({
  currentUser,
  products,
  caseStudies,
  cmsBlocks,
  channels,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateCmsBlock,
  onAddChannel,
  onTriggerAuthRedirect,
}: CMSAdminViewProps) {
  
  const isAdmin = currentUser?.role === 'admin';

  // CMS state hooks
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [blockContent, setBlockContent] = useState('');

  // Product state hooks for edit / creation
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodTitle, setProdTitle] = useState('');
  const [prodCat, setProdCat] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodMetricLab, setProdMetricLab] = useState('');
  const [prodMetricVal, setProdMetricVal] = useState('');
  const [prodStatus, setProdStatus] = useState<'Live & Production' | 'MVP Complete' | 'Demo Only'>('Demo Only');

  // Channel state hooks
  const [chanName, setChanName] = useState('');
  const [chanDesc, setChanDesc] = useState('');
  
  // Status states
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCmsBlockSelect = (block: CMSBlock) => {
    setSelectedBlockId(block.id);
    setBlockContent(block.content);
  };

  const handleCMSBlockSubmit = async (e: React.FormEvent, block: CMSBlock) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    const success = await onUpdateCmsBlock({
      ...block,
      content: blockContent
    });
    setSaving(false);
    if (success) {
      setSuccessMsg('Website block content updated successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
      setSelectedBlockId(null);
    }
  };

  const handleProductEditSelect = (prod: Product) => {
    setEditingProductId(prod.id);
    setProdTitle(prod.title);
    setProdCat(prod.category);
    setProdDesc(prod.description);
    setProdMetricLab(prod.metricLabel);
    setProdMetricVal(prod.metricValue);
    setProdStatus(prod.status);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);

    const payload: Partial<Product> = {
      title: prodTitle,
      category: prodCat,
      description: prodDesc,
      metricLabel: prodMetricLab,
      metricValue: prodMetricVal,
      status: prodStatus,
    };

    if (editingProductId && editingProductId !== 'new') {
      payload.id = editingProductId;
    }

    const success = await onUpdateProduct(payload);
    setSaving(false);
    if (success) {
      setSuccessMsg(editingProductId === 'new' ? 'New AI Solution Catalog created.' : 'AI Solution Catalog listing updated.');
      setTimeout(() => setSuccessMsg(null), 3000);
      setEditingProductId(null);
    }
  };

  const handleDeleteProductClick = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this AI solution listing? This is irreversible.')) return;
    setSaving(true);
    const success = await onDeleteProduct(id);
    setSaving(false);
    if (success) {
      setSuccessMsg('Solution listing successfully expunged.');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleChannelCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chanName.trim()) return;

    setSaving(true);
    const success = await onAddChannel(chanName.trim(), chanDesc.trim());
    setSaving(false);
    if (success) {
      setSuccessMsg(`Secure Channel #${chanName} successfully instantiated.`);
      setTimeout(() => setSuccessMsg(null), 3000);
      setChanName('');
      setChanDesc('');
    }
  };

  // Guard Clause of Admin access denied panel
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center select-none">
        <div className="bg-slate-900 border border-slate-850 rounded-2xl p-8 space-y-6">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans text-slate-100 tracking-tight">Access Control Restrictions</h2>
            <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto mt-2 leading-relaxed">
              Website CMS edits require corporate administrative privileges. Authenticate your session using the proper directory seat.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 max-w-sm mx-auto text-left space-y-1">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">CLINICAL DIRECTORY NOTE:</span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Log out and log back in as <strong className="text-indigo-400 font-mono">admin</strong> / password <strong className="text-indigo-400 font-mono">admin123</strong> to bypass this restriction securely.
            </p>
          </div>

          <button
            onClick={onTriggerAuthRedirect}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
          >
            Open Credentials Terminal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 select-none">
      
      {/* CMS header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-850 pb-5">
        <div>
          <span className="text-[10px] uppercase font-mono text-indigo-400 tracking-widest block mb-1">CMS ADMIN PORTAL</span>
          <h1 className="text-3xl font-bold font-sans text-slate-100 tracking-tight">Enterprise CMS & Inventory</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">Manage global product catalogs, channel routers, and system ethical parameters</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/5 px-2.5 py-1 rounded-full border border-emerald-400/25 uppercase font-bold tracking-wider flex items-center gap-1.5 leading-none">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            Admin session active
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: EDITING SOLUTIONS LIST */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SOLUTIONS MANAGEMENT GRID CARD */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-sm font-bold font-sans text-slate-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> AI Solutions Catalog Index ({products.length})
              </h3>
              <button
                onClick={() => {
                  setEditingProductId('new');
                  setProdTitle('');
                  setProdCat('');
                  setProdDesc('');
                  setProdMetricLab('');
                  setProdMetricVal('');
                  setProdStatus('Demo Only');
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> ADD NEW
              </button>
            </div>

            {/* Editing state drawer */}
            {editingProductId && (
              <form onSubmit={handleProductSubmit} className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-4">
                <h4 className="text-xs font-bold text-slate-200">
                  {editingProductId === 'new' ? 'Instantiate New Catalog Record' : 'Edit Technical Specifications'}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">Solution name</label>
                    <input
                      type="text"
                      value={prodTitle}
                      onChange={(e) => setProdTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 text-slate-200 outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">Strategic category / Vertical</label>
                    <input
                      type="text"
                      value={prodCat}
                      onChange={(e) => setProdCat(e.target.value)}
                      placeholder="e.g. Healthcare, Fintech"
                      className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 text-slate-200 outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">Architecture details & value proposition</label>
                  <textarea
                    rows={3}
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 text-slate-200 outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">KPI label</label>
                    <input
                      type="text"
                      value={prodMetricLab}
                      onChange={(e) => setProdMetricLab(e.target.value)}
                      placeholder="e.g. Reductions"
                      className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 text-slate-200 outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">KPI target value</label>
                    <input
                      type="text"
                      value={prodMetricVal}
                      onChange={(e) => setProdMetricVal(e.target.value)}
                      placeholder="e.g. 85%"
                      className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 text-slate-200 outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">Launch status</label>
                    <select
                      value={prodStatus}
                      onChange={(e) => setProdStatus(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 text-slate-300 outline-none focus:border-indigo-500"
                    >
                      <option value="Live & Production">Live & Production</option>
                      <option value="MVP Complete">MVP Complete</option>
                      <option value="Demo Only">Demo Only</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingProductId(null)}
                    className="text-[10px] font-mono px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="text-[10px] font-mono font-bold px-4 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    {saving ? 'SAVING...' : 'COMMIT CHANGES'}
                  </button>
                </div>
              </form>
            )}

            {/* List products for edits */}
            <div className="space-y-3">
              {products.map(prod => (
                <div key={prod.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-850/60 hover:border-slate-800 transition-colors gap-3">
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{prod.title}</span>
                      <span className="text-[8px] font-mono uppercase bg-slate-900 px-1.5 py-0.5 rounded text-indigo-400 leading-none">{prod.category}</span>
                    </div>
                    <span className="block text-[10px] text-slate-500 mt-1 truncate max-w-md">{prod.description}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleProductEditSelect(prod)}
                      className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-400/5 px-2.5 py-1.5 rounded-lg border border-indigo-400/10 hover:border-indigo-400/40 transition-colors"
                    >
                      EDIT SPEC
                    </button>
                    <button
                      onClick={() => handleDeleteProductClick(prod.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-full transition-colors"
                      title="Decommission listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* WEBSITE MARKETING CMS CONTROLS card */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-sans text-slate-200 border-b border-slate-850 pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" /> Website Layout Copy CMS Blocks
            </h3>

            <div className="space-y-4">
              {cmsBlocks.map(block => {
                const isSelected = selectedBlockId === block.id;
                return (
                  <div key={block.id} className="bg-slate-950/40 p-4 border border-slate-850 rounded-xl text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 block leading-none">KEY LABEL: {block.key}</span>
                        <span className="text-xs font-bold text-slate-300 block mt-1">{block.title}</span>
                      </div>
                      <span className="text-[8px] font-mono uppercase bg-indigo-500/5 text-indigo-400 px-2 py-0.5 border border-indigo-500/10 rounded-full">{block.category}</span>
                    </div>

                    {isSelected ? (
                      <form onSubmit={(e) => handleCMSBlockSubmit(e, block)} className="space-y-2 pt-2">
                        <textarea
                          rows={3}
                          value={blockContent}
                          onChange={(e) => setBlockContent(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs rounded-xl p-2.5 text-slate-100 outline-none leading-relaxed font-sans"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedBlockId(null)}
                            className="text-[9px] font-mono px-3 py-1 rounded bg-slate-900 hover:bg-slate-805 text-slate-400"
                          >
                            CANCEL
                          </button>
                          <button
                            type="submit"
                            disabled={saving}
                            className="text-[9px] font-mono font-bold px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                          >
                            {saving ? 'UPDATING...' : 'COMMIT'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xl">{block.content}</p>
                        <button
                          onClick={() => handleCmsBlockSelect(block)}
                          className="text-[9px] font-mono font-bold text-indigo-400 shrink-0"
                        >
                          EDIT VALUE
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ADDITIONAL UTILITIES (CHANNEL SETUP, SYSTEM LOGS) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* INSTANTIATE SECURE CHANNELS OVERLAY */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-sans text-slate-200 border-b border-slate-850 pb-3 flex items-center gap-2">
              <Hash className="w-4.5 h-4.5 text-indigo-400" /> Dispatch Router Setup
            </h3>
            
            <p className="text-[10.5px] text-slate-400 font-sans leading-relaxed">
              Create secure, on-demand WebSocket channels and link them to clinical or financial partitions.
            </p>

            <form onSubmit={handleChannelCreateSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">Router Handle Key</label>
                <input
                  type="text"
                  value={chanName}
                  onChange={(e) => setChanName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'))}
                  placeholder="e.g. quantum-crypto-talk"
                  className="w-full bg-slate-950 border border-slate-850 text-xs rounded-xl px-3 py-2 text-slate-200 font-mono focus:border-indigo-500 hover:border-slate-800 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-1">Scope explanation</label>
                <input
                  type="text"
                  value={chanDesc}
                  onChange={(e) => setChanDesc(e.target.value)}
                  placeholder="Clinical diagnostic triage sync..."
                  className="w-full bg-slate-950 border border-slate-850 text-xs rounded-xl px-3 py-2 text-slate-300 focus:border-indigo-500 hover:border-slate-800 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving || !chanName}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono py-2 rounded-xl transition-all font-bold tracking-wider"
              >
                {saving ? 'INJECTING PORT...' : 'LAUNCH SECURE PORT'}
              </button>
            </form>
          </div>

          {/* ACTIVE DISPATCH PORTS LIST */}
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold font-sans text-slate-200 border-b border-slate-850 pb-2">Operational Channels ({channels.length})</h3>
            <div className="space-y-2 font-mono text-[10px]">
              {channels.map(chan => (
                <div key={chan.id} className="flex justify-between items-center p-2 bg-slate-950/40 border border-slate-850/50 rounded-lg">
                  <span className="text-slate-300 font-bold">#{chan.name}</span>
                  <span className="text-[8px] text-indigo-400 bg-indigo-400/5 px-2 border border-indigo-400/15 rounded uppercase">
                    {chan.isStatic ? 'Permanent' : 'Dynamic'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
