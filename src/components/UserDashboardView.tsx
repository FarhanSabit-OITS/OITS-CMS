import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { generateDummyKeyPair } from './EncryptionHelper';
import { 
  ShieldCheck, ShieldAlert, Key, UserCheck2, RefreshCw, 
  ToggleLeft, ToggleRight, Check, KeyRound, Mail, HelpCircle, Eye, EyeOff, 
  UserX, Plus, BellRing, BarChart2, Calendar, Shield, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, BarChart, Bar, Legend, LineChart, Line 
} from 'recharts';

interface UserDashboardViewProps {
  currentUser: User | null;
  onUpdateUser: (updatedFields: Partial<User>) => Promise<boolean>;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=150&q=80'
];

export default function UserDashboardView({ currentUser, onUpdateUser }: UserDashboardViewProps) {
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  
  // Blocked users state
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [blockInput, setBlockInput] = useState('');

  // Simulated MFA states
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [mfaSecret, setMfaSecret] = useState('');
  
  // RSA key states
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [keyPairLoading, setKeyPairLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mfaError, setMfaError] = useState<string | null>(null);

  // Chart view tab
  const [activeChartTab, setActiveChartTab] = useState<'chat' | 'security'>('chat');

  // Initialize fields
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || '');
      setAvatar(currentUser.avatar || '');
      setMfaEnabled(currentUser.mfaEnabled || false);
      setMfaSecret(currentUser.mfaSecret || 'PRECISION2FAKEYSECRET654');
      setPushEnabled(currentUser.pushEnabled !== undefined ? currentUser.pushEnabled : true);
      setBlockedUsers(currentUser.blockedUsers || []);
    }
  }, [currentUser]);

  // Load RSA keypair
  useEffect(() => {
    setKeyPairLoading(true);
    generateDummyKeyPair()
      .then(keys => {
        setPublicKey(keys.publicKey);
        setPrivateKey(keys.privateKey);
      })
      .finally(() => setKeyPairLoading(false));
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setSaving(true);
    setSaveSuccess(false);

    const success = await onUpdateUser({
      email,
      avatar,
      mfaEnabled,
      pushEnabled,
      blockedUsers
    });

    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleMfaSetupToggle = () => {
    if (mfaEnabled) {
      onUpdateUser({ mfaEnabled: false });
      setMfaEnabled(false);
      setShowMfaSetup(false);
    } else {
      setShowMfaSetup(true);
    }
  };

  const handleVerifyMfaConfirm = async () => {
    if (verificationCode.length !== 6) {
      setMfaError('Code must be exactly 6 digits');
      return;
    }
    
    setMfaError(null);
    setSaving(true);

    const success = await onUpdateUser({
      mfaEnabled: true,
    });

    setSaving(false);
    if (success) {
      setMfaEnabled(true);
      setShowMfaSetup(false);
      setVerificationCode('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setMfaError('MFA Verification failed, please check inputs.');
    }
  };

  const handleBlockUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = blockInput.trim().toLowerCase();
    if (!target) return;
    if (target === currentUser?.username) {
      alert("You cannot add your own cryptographic signature to the block registry.");
      return;
    }
    if (blockedUsers.includes(target)) {
      setBlockInput('');
      return;
    }
    const updatedList = [...blockedUsers, target];
    setBlockedUsers(updatedList);
    setBlockInput('');
    await onUpdateUser({ blockedUsers: updatedList });
  };

  const handleUnblockUser = async (target: string) => {
    const updatedList = blockedUsers.filter(u => u !== target);
    setBlockedUsers(updatedList);
    await onUpdateUser({ blockedUsers: updatedList });
  };

  // Recharts 30-day mock dataset
  const chatActivityMetrics = [
    { name: 'Day 5', PacketsShared: 42, DecryptedSessions: 25 },
    { name: 'Day 10', PacketsShared: 85, DecryptedSessions: 62 },
    { name: 'Day 15', PacketsShared: 148, DecryptedSessions: 110 },
    { name: 'Day 20', PacketsShared: 112, DecryptedSessions: 95 },
    { name: 'Day 25', PacketsShared: 194, DecryptedSessions: 160 },
    { name: 'Day 30', PacketsShared: 255, DecryptedSessions: 212 },
  ];

  const securityEventsMetrics = [
    { name: 'Day 5', MFA_Logins: 4, KeypairGenerations: 2, SecurityAlerts: 1 },
    { name: 'Day 10', MFA_Logins: 9, KeypairGenerations: 1, SecurityAlerts: 0 },
    { name: 'Day 15', MFA_Logins: 16, KeypairGenerations: 3, SecurityAlerts: 2 },
    { name: 'Day 20', MFA_Logins: 12, KeypairGenerations: 1, SecurityAlerts: 1 },
    { name: 'Day 25', MFA_Logins: 24, KeypairGenerations: 2, SecurityAlerts: 0 },
    { name: 'Day 30', MFA_Logins: 32, KeypairGenerations: 4, SecurityAlerts: 3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 select-none">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-5">
        <div>
          <span className="text-[10px] uppercase font-mono text-blue-600 tracking-widest block mb-1 font-bold">DIRECTORY HUB</span>
          <h1 className="text-3xl font-bold font-sans text-slate-900 tracking-tight mb-1">Identity & Secure Settings</h1>
          <p className="text-xs text-slate-500 font-sans font-medium">Configure cryptographic profiles, manage firewall blocks, and view secure telemetry</p>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Active Tunnel Window: 2026/06</span>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Corporate credentials and block preferences synchronized across routing channels.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: SETTINGS FORM */}
        <div className="lg:col-span-7 space-y-8">
          
          <form onSubmit={handleProfileSave} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-bold font-sans text-slate-800 border-b border-slate-100 pb-3">Corporate Directory Profile</h3>
            
            {/* Elegant Avatar Selection Grid */}
            <div className="space-y-2.5">
              <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold">Select Directory Avatar Badge</label>
              <div className="flex flex-wrap gap-3 items-center">
                <img 
                  src={avatar} 
                  alt="Current Avatar" 
                  className="w-14 h-14 rounded-full border-2 border-blue-600 bg-slate-50 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(url)}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all hover:scale-105 ${
                        avatar === url ? 'border-blue-600 scale-105 shadow-xs' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={url} alt={`preset-${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold mb-1.5">User Handle Signature</label>
                <input
                  type="text"
                  value={currentUser?.username || ''}
                  disabled
                  title="Username handles are tied to your cryptographic corporate registration"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-500 rounded-xl px-3 py-2.5 text-xs font-mono select-none outline-none cursor-not-allowed font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold mb-1.5">Directory Seat Level</label>
                <div className="w-full bg-slate-50 border border-slate-200 text-blue-700 rounded-xl px-3 py-2.5 text-xs font-sans font-bold capitalize select-all">
                  {currentUser?.role || 'User'} Link Node
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold mb-1.5">Verified Contact Email Key</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 font-semibold"
                  placeholder="user@ai-innovations.corp"
                  required
                />
              </div>
            </div>

            {/* Notification preference toggles */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-[10px] uppercase font-sans tracking-widest text-slate-550 font-bold mb-2">Notification Preferences</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-705 block leading-none">Enable Browser Push Alerts</span>
                  <span className="text-[10px] text-slate-400 font-sans mt-0.5 block font-medium">Simulate notification signals in real-time when new chat arrives</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className="text-slate-400 hover:text-slate-700 hover:scale-105 transition-transform"
                >
                  {pushEnabled ? <ToggleRight className="w-10 h-10 text-blue-600" /> : <ToggleLeft className="w-10 h-10" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-40"
            >
              <BellRing className="w-3.5 h-3.5 inline mr-1.5" />
              {saving ? 'Synchronizing workspace...' : 'Synchronize Identity Catalog'}
            </button>
          </form>

          {/* BLOCKED USERS FIREWALL MANAGER CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-left">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <UserX className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <h3 className="text-sm font-bold font-sans text-slate-850">Directory Message Block Registry</h3>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5 font-medium">Prevent specific signatures from transmitting data to your feed</p>
              </div>
            </div>

            <form onSubmit={handleBlockUserSubmit} className="flex gap-2">
              <input
                type="text"
                value={blockInput}
                onChange={(e) => setBlockInput(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                placeholder="Enter username handle (e.g. user)"
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-850 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 font-sans font-medium"
              />
              <button
                type="submit"
                disabled={!blockInput.trim()}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors disabled:opacity-45"
              >
                <Plus className="w-3.5 h-3.5" /> BLOCK SIGNATURE
              </button>
            </form>

            {/* List of blocked signatures */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-sans text-slate-400 uppercase font-bold tracking-wider block">Blocked Handles ({blockedUsers.length}):</span>
              {blockedUsers.length === 0 ? (
                <div className="text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 font-sans text-[11px] text-slate-450 font-medium">
                  Registry clear. Firewall is passing all remote workspace packets.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {blockedUsers.map((user) => (
                    <div 
                      key={user}
                      className="flex items-center justify-between p-2.5 bg-red-50/40 border border-red-150/50 rounded-xl text-xs font-mono font-bold text-red-750"
                    >
                      <span className="truncate">@{user}</span>
                      <button
                        type="button"
                        onClick={() => handleUnblockUser(user)}
                        className="text-[9px] uppercase tracking-wider text-rose-600 hover:text-rose-800"
                      >
                        UNBLOCK
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SECURITY SETTINGS & TELEMETRY CHARTS */}
        <div className="lg:col-span-5 space-y-6">

          {/* MFA AUTHENTICATION SETTINGS CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-left">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
              <div>
                <h3 className="text-sm font-bold font-sans text-slate-850">Multi-Factor Authentication (MFA)</h3>
                <p className="text-[11px] text-slate-500 font-sans mt-1 font-medium">Secure directory privileges against physical or token leaks</p>
              </div>
              <div>
                {mfaEnabled ? (
                  <span className="text-[8.5px] font-sans uppercase tracking-widest bg-emerald-50 text-emerald-700 px-2.5 py-0.5 border border-emerald-100 rounded-full font-bold">ACTIVE</span>
                ) : (
                  <span className="text-[8.5px] font-sans uppercase tracking-widest bg-amber-50 text-amber-700 px-2.5 py-0.5 border border-amber-100 rounded-full font-bold">DEACTIVATED</span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200 gap-3">
              <div className="space-y-1 truncate">
                <span className="text-xs font-bold text-slate-705 block leading-none">Hardware Passcode Seeding</span>
                <span className="text-[10px] font-mono text-slate-450 font-semibold block truncate">Secret: {mfaSecret}</span>
              </div>
              <button
                type="button"
                onClick={handleMfaSetupToggle}
                className={`text-[10px] font-sans font-bold px-3.5 py-2 border rounded-xl shrink-0 transition-all ${
                  mfaEnabled 
                    ? 'border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100' 
                    : 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                {mfaEnabled ? 'DEACTIVATE' : 'CONFIGURE'}
              </button>
            </div>

            {/* active setup dynamic wizard */}
            {showMfaSetup && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 select-none" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Pair Authenticator App</h4>
                    <p className="text-[10.5px] text-slate-500 font-medium leading-normal">
                      Scan QR or type key manually in Google Authenticator or Aegis program to generate MFA sequence.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center py-2.5">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-xs border border-slate-200 select-none">
                    <div className="grid grid-cols-4 gap-1 w-full h-full">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`rounded-sm ${(i % 2 === 0 && i !== 6 && i !== 11) || i === 0 || i === 15 ? 'bg-slate-800' : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <span className="text-[9px] font-sans font-bold text-slate-450 uppercase tracking-widest block leading-none">Security Seeding:</span>
                    <span className="text-xs font-mono text-blue-705 select-all block py-1 border-b border-slate-205 font-bold">{mfaSecret}</span>
                    <span className="text-[9.5px] text-slate-400 block font-medium leading-normal">Enter the 6-digit dynamic key generated to pair.</span>
                  </div>
                </div>

                {mfaError && (
                  <span className="block text-xs font-mono text-rose-700 bg-rose-50 border border-rose-100 p-2 rounded">{mfaError}</span>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="flex-1 font-mono text-sm tracking-widest text-center bg-white border border-slate-200 rounded-lg outline-none text-slate-800 py-2.5 focus:border-blue-500"
                  />
                  <button
                    onClick={handleVerifyMfaConfirm}
                    disabled={verificationCode.length !== 6 || saving}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs px-4 py-2 rounded-lg font-bold disabled:opacity-40"
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RSA KEYRING DISPLAY CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-left">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <KeyRound className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <h3 className="text-sm font-bold font-sans text-slate-850">Asymmetric Keyring</h3>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5 font-medium">Assigned RSA-2048 encryption certificates</p>
              </div>
            </div>

            <p className="text-[10.5px] text-slate-500 font-sans leading-relaxed font-semibold">
              These keys are compiled within client browser sandboxes. Private keys are client-confidential.
            </p>

            {keyPairLoading ? (
               <div className="flex flex-col items-center justify-center py-10 space-y-2 font-sans text-xs text-slate-400 font-bold">
                <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                <span>Assembling cryptographic entropy...</span>
              </div>
            ) : (
              <div className="space-y-4 font-semibold">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">PUBLIC ROUTING CODE:</span>
                    <span className="text-[8px] font-sans font-bold text-emerald-700 bg-emerald-50 px-1.5 border border-emerald-100 rounded">SHAREABLE</span>
                  </div>
                  <pre className="text-[8.5px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600 overflow-x-auto max-h-24 select-all leading-normal">
                    {publicKey}
                  </pre>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">LOCAL DECRYPTION KEY:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-sans font-bold text-rose-700 bg-rose-50 px-1.5 border border-rose-100 rounded">CLIENT_CONFIDENTIAL</span>
                      <button 
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                        className="text-[9px] text-blue-600 hover:text-blue-550 font-sans font-bold leading-none"
                        type="button"
                      >
                        {showPrivateKey ? 'HIDE' : 'REVEAL'}
                      </button>
                    </div>
                  </div>
                  <pre className="text-[8.5px] font-mono bg-slate-55 p-2.5 rounded-lg border border-slate-200 text-slate-600 overflow-x-auto max-h-24 relative select-all leading-normal">
                    {showPrivateKey ? privateKey : '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBA...\n[HIDDEN CLIENT-SIDE - CLICK REVEAL TO VIEW DECRYPTION KEYS]\n-----END PRIVATE KEY-----'}
                  </pre>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* RECHARTS CHAT ACTIVITY AND SECURITY OUTCOMES telemetry */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
          <div className="flex items-center gap-2.5">
            <ResponsiveContainer className="hidden" width={1} height={1}><div /></ResponsiveContainer> { /* No-op just to prove mock-import works safely */ }
            <Activity className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h3 className="text-sm font-bold font-sans text-slate-850">Telemetry System Audits (Last 30 Days)</h3>
              <p className="text-[10px] text-slate-500 font-sans mt-0.5 font-medium">Activity dashboards compiling data packets shared and multi-factor session validation rates</p>
            </div>
          </div>

          <div className="flex border border-slate-200 rounded-xl bg-slate-50/55 p-1 text-[10px] font-sans font-bold">
            <button
              onClick={() => setActiveChartTab('chat')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeChartTab === 'chat' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              CHAT ACTIVITY TRAFFIC
            </button>
            <button
              onClick={() => setActiveChartTab('security')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeChartTab === 'security' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              SECURITY EVENT AUDITS
            </button>
          </div>
        </div>

        <div className="py-6 h-[280px] w-full">
          {activeChartTab === 'chat' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chatActivityMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="packetsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9.5} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9.5} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 11, fontFamily: 'monospace' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="PacketsShared" name="Transmitted Packets" stroke="#2563eb" fillOpacity={1} fill="url(#packetsGrad)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="DecryptedSessions" name="Secure E2EE Handshakes" stroke="#10b981" fillOpacity={1} fill="url(#sessionsGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={securityEventsMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9.5} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9.5} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 11, fontFamily: 'monospace' }}
                />
                <Legend iconType="rect" wrapperStyle={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 'bold' }} />
                <Bar dataKey="MFA_Logins" name="MFA Authentications" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="KeypairGenerations" name="Cipher Key Regenerations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="SecurityAlerts" name="Blocked Intrusion Traps" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  );
}
