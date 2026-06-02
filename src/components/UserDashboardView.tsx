import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { generateDummyKeyPair } from './EncryptionHelper';
import { 
  ShieldCheck, ShieldAlert, Key, UserCheck2, RefreshCw, 
  ToggleLeft, ToggleRight, Check, KeyRound, Mail, HelpCircle, Eye, EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';

interface UserDashboardViewProps {
  currentUser: User | null;
  onUpdateUser: (updatedFields: Partial<User>) => Promise<boolean>;
}

export default function UserDashboardView({ currentUser, onUpdateUser }: UserDashboardViewProps) {
  const [email, setEmail] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  
  // Simulated MFA keys
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [mfaSecret, setMfaSecret] = useState('');
  
  // RSA Cipher states
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [keyPairLoading, setKeyPairLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mfaError, setMfaError] = useState<string | null>(null);

  // Initialize fields
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || '');
      setMfaEnabled(currentUser.mfaEnabled || false);
      setMfaSecret(currentUser.mfaSecret || 'PRECISION2FAKEYSECRET654');
    }
  }, [currentUser]);

  // Load RSA cryptosystem keypairs on mount for identity card
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
      mfaEnabled,
    });

    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleMfaSetupToggle = () => {
    if (mfaEnabled) {
      // Disabling MFA
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 select-none">
      
      {/* Title block */}
      <div>
        <span className="text-[10px] uppercase font-mono text-blue-600 tracking-widest block mb-1 font-bold">TUNNEL WORKSPACE</span>
        <h1 className="text-3xl font-bold font-sans text-slate-850 tracking-tight mb-1">Identity & Preferences</h1>
        <p className="text-xs text-slate-550 font-sans font-medium">Manage secure keychains, notification permissions, and multi-factor logins</p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-805 text-xs rounded-xl flex items-center gap-2 font-bold shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Workspace profile saved successfully. Identity changes broadcasted.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: SETTINGS FORM */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleProfileSave} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-bold font-sans text-slate-800 border-b border-slate-100 pb-3">Security & Profile Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold mb-1.5">User Handle</label>
                <input
                  type="text"
                  value={currentUser?.username || ''}
                  disabled
                  title="Username handles are tied to your cryptographic corporate registration"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-550 rounded-xl px-3 py-2.5 text-xs font-mono select-none outline-none cursor-not-allowed font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold mb-1.5">Assigned Role</label>
                <div className="w-full bg-slate-50 border border-slate-200 text-blue-600 rounded-xl px-3 py-2.5 text-xs font-sans font-bold capitalize select-all">
                  {currentUser?.role || 'User'} Link Node
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-sans font-bold mb-1.5">Corporate Email Key</label>
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
              <h4 className="text-[10px] uppercase font-sans tracking-widest text-slate-500 font-bold mb-2">Notification Preferences</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block leading-none">Enable Browser Push Notifications</span>
                  <span className="text-[10px] text-slate-500 font-sans mt-0.5 block font-medium">Transmit instant decrypted text bubble to desktop</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className="text-slate-400 hover:text-slate-650"
                >
                  {pushEnabled ? <ToggleRight className="w-10 h-10 text-blue-650" /> : <ToggleLeft className="w-10 h-10" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-40"
            >
              {saving ? 'Synchronizing workspace...' : 'Update Corporate Profile'}
            </button>
          </form>

          {/* MFA AUTHENTICATION SETTINGS CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
              <div>
                <h3 className="text-sm font-bold font-sans text-slate-850">Multi-Factor Authentication (MFA)</h3>
                <p className="text-[11px] text-slate-500 font-sans mt-1 font-medium">Guard administrative workspace features from external hijack</p>
              </div>
              <div>
                {mfaEnabled ? (
                  <span className="text-[8.5px] font-sans uppercase tracking-widest bg-emerald-50 text-emerald-700 px-2.5 py-0.5 border border-emerald-100 rounded-full font-bold">ACTIVE</span>
                ) : (
                  <span className="text-[8.5px] font-sans uppercase tracking-widest bg-amber-50 text-amber-700 px-2.5 py-0.5 border border-amber-100 rounded-full font-bold">DEACTIVATED</span>
                )
                }
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">Google Authenticator / Aegis Login</span>
                <span className="text-[10px] font-mono text-slate-450 font-semibold">MFA token: {mfaSecret}</span>
              </div>
              <button
                type="button"
                onClick={handleMfaSetupToggle}
                className={`text-[10px] font-sans font-bold px-4 py-2 border rounded-xl transition-all ${
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
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Pair Authenticator App</h4>
                    <p className="text-[10.5px] text-slate-500 font-medium leading-normal">
                      Scan QR or type key manually in your authentication program to bind this certificate.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center py-2.5">
                  {/* Generated simulated QR vector layout */}
                  <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-xs border border-slate-200">
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
                    <span className="text-sm font-mono text-blue-700 select-all block py-1 border-b border-slate-200 font-bold">{mfaSecret}</span>
                    <span className="text-[10px] text-slate-500 block font-medium leading-normal">Type generated 6-digit TOTP code below to authorize.</span>
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
        </div>

        {/* RIGHT COLUMN: E2EE RSA KEYCHAIN DISPLAY CARD */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <KeyRound className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <h3 className="text-sm font-bold font-sans text-slate-850">Asymmetric Keyring</h3>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5 font-medium">Assigned RSA-2048 encryption certificates</p>
              </div>
            </div>

            <p className="text-[10.5px] text-slate-500 font-sans leading-relaxed font-semibold">
              These keypairs are generated 100% locally in your sandboxed browser environment. The private key remains locally stored.
            </p>

            {keyPairLoading ? (
               <div className="flex flex-col items-center justify-center py-10 space-y-2 font-sans text-xs text-slate-400 font-bold">
                <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                <span>Assembling cryptographic entropy...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* PUBLIC KEY RENDER */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-sans text-slate-450 uppercase font-bold">DIRECTORY PUBLIC CERTIFICATE:</span>
                    <span className="text-[8px] font-sans font-bold text-emerald-700 bg-emerald-55 px-1.5 border border-emerald-100 rounded">SHAREABLE</span>
                  </div>
                  <pre className="text-[8.5px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600 overflow-x-auto max-h-24 select-all leading-normal">
                    {publicKey}
                  </pre>
                </div>

                {/* PRIVATE KEY RENDER */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-sans text-slate-455 uppercase font-bold">LOCAL DECRYPTION KEY:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-sans font-bold text-rose-700 bg-rose-55 px-1.5 border border-rose-100 rounded">CLIENT_CONFIDENTIAL</span>
                      <button 
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                        className="text-[9px] text-blue-600 hover:text-blue-500 font-sans font-bold font-sans leading-none"
                      >
                        {showPrivateKey ? 'HIDE' : 'REVEAL'}
                      </button>
                    </div>
                  </div>
                  <pre className="text-[8.5px] font-mono bg-slate-55 p-2.5 rounded-lg border border-slate-200 text-slate-600 overflow-x-auto max-h-28 relative select-all leading-normal">
                    {showPrivateKey ? privateKey : '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBA...\n[HIDDEN CLIENT-SIDE - CLICK REVEAL TO VIEW DECRYPTION KEYS]\n-----END PRIVATE KEY-----'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
