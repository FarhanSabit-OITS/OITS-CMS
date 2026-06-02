import { Product, CaseStudy, Channel, CMSBlock } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-medical-ai',
    title: 'Medical AI Assistant & Digital Doctor',
    category: 'Healthcare & Life Sciences',
    description: 'Autonomous medical system fusing convolutional neural networks and GPT-vision models to parse CT/MRI/X-Ray scans and handwritten prescriptions. Supports GP-level symptom checkers with clinician oversight and regional Bangla/English dialetic models.',
    metricLabel: 'Early Detection Increase',
    metricValue: '40%',
    impactMetrics: [
      { label: 'Radiologist Workload Reduction', value: '35%' },
      { label: 'Prescription OCR Accuracy', value: '95.6%' },
      { label: 'Screening Time Compression', value: '85%' },
    ],
    status: 'Live & Production',
    icon: 'Activity',
  },
  {
    id: 'prod-diag-centre',
    title: 'DiagnosticCentre AI Solution',
    category: 'Healthcare Digital Transformation',
    description: 'Complete digital patient engagement system enabling online booking with real-time slot availability, QR-enabled paperless report management, and LIS integration. Features an embeddable symptom-triage helper (MedBot).',
    metricLabel: 'Staff Workload Reduction',
    metricValue: '60%',
    impactMetrics: [
      { label: 'Portal Adoption Rate', value: '>50%' },
      { label: 'Booking Time', value: '<3 min' },
    ],
    status: 'Live & Production',
    icon: 'Stethoscope',
  },
  {
    id: 'prod-luna',
    title: 'LUNA Multimodal Conversational Platform',
    category: 'Conversational AI',
    description: 'An omni-vertical agent framework providing real-time voice and text support with voice biometrics (99.1% accuracy), sentiment escalation logic, and a dynamic negotiation engine. Supports native Bangla-English-Banglish dialogs.',
    metricLabel: 'Support Agent Deflection',
    metricValue: '70%',
    impactMetrics: [
      { label: 'Conversational Commerce Lift', value: '22%' },
      { label: 'Average Order Value (AOV)', value: '+12%' },
      { label: 'User Retention Score', value: '+18 NPS' },
    ],
    status: 'Live & Production',
    icon: 'MessageSquare',
  },
  {
    id: 'prod-banking-ocr',
    title: 'Banking OCR/ICR Intelligent Engine',
    category: 'Document Intelligence',
    description: 'On-premises enterprise platform powered by LLaMA Vision and Tesseract to extract data from account-opening and check forms. Incorporates confidence-based routing into auto-pass, maker-checker, and manual verification lines.',
    metricLabel: 'Verification Accuracy',
    metricValue: '95%',
    impactMetrics: [
      { label: 'Bangla Handwriting Accuracy', value: '85%' },
      { label: 'Form Processing Speedup', value: '75%' },
    ],
    status: 'MVP Complete',
    icon: 'FileSpreadsheet',
  },
  {
    id: 'prod-digital-wallet',
    title: 'Digital Wallet, Payments & Ledger Core',
    category: 'Fintech & Stored Value Platforms',
    description: 'Unified financial infrastructure containing secure identity and access, multibalance wallet management, payout services, double-entry general ledger, sanctions/screening integration (OFAC parsing), and web3-stablecoin readiness.',
    metricLabel: 'Ledger Audit Readiness',
    metricValue: '100%',
    impactMetrics: [
      { label: 'Fraud Deflection Rate', value: '45%' },
      { label: 'Compliance Accuracy', value: '100%' },
    ],
    status: 'Live & Production',
    icon: 'Wallet',
  },
  {
    id: 'prod-decision-support',
    title: 'Project Eugenia: Real-Estate Decision Support',
    category: 'PropTech Analytics',
    description: 'System-agnostic cloud analytics platform consolidating data across 7+ property systems. Deploys XGBoost forecasting, Isolation Forest anomaly detectors, and hedonic pricing models to lower energy and maintenance costs.',
    metricLabel: 'Energy Consumption Savings',
    metricValue: '12%',
    impactMetrics: [
      { label: 'Operational Cost Reduction', value: '15%' },
      { label: 'Tenant Satisfaction Lift', value: '5%' },
    ],
    status: 'Demo Only',
    icon: 'BarChart3',
  },
  {
    id: 'prod-medical-lms',
    title: 'Medical LMS & Surgical Simulators',
    category: 'EdTech & Immersive Environments',
    description: 'Meta Quest 3 and HoloLens 2 virtual dissection and physiology platform with real-time pathology generation (500+ states). Includes haptic-feedback surgical simulators with AI scoring on tissue damage and trajectory.',
    metricLabel: 'Knowledge Retention Lift',
    metricValue: '78%',
    impactMetrics: [
      { label: 'Anatomy Lab Cost Savings', value: '60%' },
      { label: 'Surgical Complications reduction', value: '50%' },
    ],
    status: 'MVP Complete',
    icon: 'GraduationCap',
  },
  {
    id: 'prod-jotax',
    title: 'Jotax Automated Financial BI Suite',
    category: 'Business Intelligence',
    description: 'Consolidated reporting and data automation utilizing 80+ DAX measures and Power Automate workflows. Supports custom, localized business calculations such as the Finnish business and fiscal calendar constraints.',
    metricLabel: 'Reporting Overhead Reduction',
    metricValue: '80%',
    impactMetrics: [
      { label: 'Calculation Error Prevention', value: '100%' },
      { label: 'Quarterly Cashflow Reconciliation', value: 'Solved' },
    ],
    status: 'Live & Production',
    icon: 'PieChart',
  },
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-labaid',
    title: '24-Hour Cancer Screening: Telehealth Diagnosis in Rural Contexts',
    client: 'LABAID Cancer Hospital & LifePlus Telemedicine',
    challenge: [
      'Diagnostic bottlenecks caused by a 30-50% annual radiologist workload increase.',
      'A 65% rural oncologist shortage resulting in four- to six-week oncology assessment delays.',
      'Frequent medication errors arising from illegible handwritten prescriptions.',
    ],
    solution: [
      'Deployed LABAID GPT prescription parsing and CT/MRI imaging annotation.',
      'Built custom vision transformer modules with localized medical dictionary training.',
      'Wired 24/7 symptom pre-screening and medical triage using clinical BERT models.',
    ],
    results: [
      'Successfully compressed wait times from 3 weeks to under 24 hours (85% reduction).',
      'Boosted early-stage malignant anomalies detection by 40%.',
      'Deflected 30% of low-acuity appointments, returning clinical bandwidth to complex cases.',
    ],
    duration: '9 Months',
    status: 'Live & Implemented',
  },
  {
    id: 'case-prime',
    title: 'Automating Customer Onboarding and Form OCR in Commercial Banking',
    client: 'Prime Commercial Bank',
    challenge: [
      'Excessive manual entry times taking up to 15-20 minutes per onboarding document.',
      'Inconsistent scan qualities featuring messy handwriting, cross-outs, and mixed-idiom text.',
      'Rigorous central-bank auditing rules requiring verifiable logs and duplicate checks.',
    ],
    solution: [
      'Constructed a containerized OCR/ICR pipeline using LLaMA 3.2 Vision models.',
      'Integrated an automated confidence scoring router with human-in-the-loop (HITL) maker-checker validation.',
      'Deployed on-premises to guarantee data sovereignty and compliance.',
    ],
    results: [
      'Achieved 95%+ English-text reading accuracy and 85%+ handwritten Bangla accuracy.',
      'Accelerated average form reviewing times to under 3 minutes (70-80% speedup).',
      'Satisfied 100% of audit requirements with immutable digital audit logs.',
    ],
    duration: '4 Months',
    status: 'Live Pilot',
  },
];

export const INITIAL_CHANNELS: Channel[] = [
  {
    id: 'chan-general',
    name: 'general',
    description: 'Welcome to AI Innovations! General discussion channel for secure, peer-to-peer corporate chat.',
    passphrase: 'GeneralSecret123',
    isStatic: true,
  },
  {
    id: 'chan-healthcare',
    name: 'healthcare-ai-assistance',
    description: 'End-to-end encrypted channel for discussing clinical assistance, pre-screening, and image reader optimizations.',
    passphrase: 'LabaidPrecisionCare2026',
    isStatic: true,
  },
  {
    id: 'chan-fintech',
    name: 'fintech-digital-wallet',
    description: 'High-security discussion regarding double-entry ledger, secure payment gateways, and KYC/KYB integrations.',
    passphrase: 'E2EEDoubleEntrySecureKey',
    isStatic: true,
  },
];

export const INITIAL_CMS_BLOCKS: CMSBlock[] = [
  {
    id: 'cms-hero-title',
    key: 'hero_title',
    title: 'Hero Banner Title',
    content: 'Enterprise AI Engineering. Crafted for Scale.',
    category: 'Hero Section',
  },
  {
    id: 'cms-hero-sub',
    key: 'hero_subtitle',
    title: 'Hero Banner Subtitle',
    content: 'We design, deploy, and maintain world-class AI solutions across Healthcare, Fintech, retail and property operations.',
    category: 'Hero Section',
  },
  {
    id: 'cms-ethics',
    key: 'ethics_compliance',
    title: 'Ethics & Compliance Mandate',
    content: 'AI Innovations is committed to upholding the highest standards of data security, human-in-the-loop safety, and clinical ethics. Our systems comply with HIPAA, GDPR, PCI-DSS, and local central-bank specifications.',
    category: 'Legal & Ethics',
  },
];
