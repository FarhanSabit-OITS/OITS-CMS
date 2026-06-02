export interface Message {
  id: string;
  senderId: string;
  username: string;
  avatar: string;
  ciphertext: string;
  iv: string;
  room: string;
  timestamp: string;
  isEncrypted: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  mfaEnabled: boolean;
  mfaSecret?: string;
  twoFactorVerified?: boolean;
  blockedUsers?: string[];
  pushEnabled?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  passphrase?: string; // used locally for E2EE
  isStatic?: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  impactMetrics: { label: string; value: string }[];
  status: 'Live & Production' | 'MVP Complete' | 'Demo Only';
  icon: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string[];
  solution: string[];
  results: string[];
  duration: string;
  status: string;
}

export interface CMSBlock {
  id: string;
  key: string;
  title: string;
  content: string;
  category: string;
}
