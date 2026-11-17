export const FALLBACK_CASE_STUDIES = [
  {
    slug: 'copy-text-on-screen',
    appName: 'Copy Text On Screen',
    frontImage: '/card-copy-text.jpg',
    tagline: 'Text trapped in images, apps or non-selectable screens',
    category: 'OCR & Productivity Utility',
    installsLabel: '500K+ Reported Downloads',
    rating: 4.6,
    ratingLabel: '4.8K ratings on App Store',
    summary:
      'In-house mobile application that solves real-world OCR, document and speech processing challenges. Extracts selectable text from images, social feeds and screenshots across multiple languages.',
    challenge:
      'Text trapped in images, apps, or non-selectable screens cannot always be selected directly. Users otherwise need to retype the information or use a separate workaround.',
    solution:
      'Built screenshot-sharing integration, image-based OCR processing, and text selection/extraction with multilingual translation workflows.',
    capabilities: [
      'OCR from any screen & image-based processing',
      'Supports multiple languages & instant translation',
      'Copy, share, export and save text workflows',
      'Lightweight, fast and extremely easy to use',
    ],
    engineeringNote:
      'Combines native platform clipboard integration, background isolates, and on-device ML Kit OCR for sub-90ms extraction.',
    relevance:
      'Demonstrates high-volume production operations: 500K+ downloads with 4.8K App Store reviews and 4.6/5 rating.',
    techStack: ['Android & iOS', 'Flutter & Dart', 'On-Device OCR', 'Multilingual Translation'],
  },
  {
    slug: 'ai-text-scanner',
    appName: 'AI Text Scanner',
    frontImage: '/card-ai-text-scanner.jpg',
    tagline: 'Extracting and working with text from documents and images',
    category: 'Documents, OCR & AI Integration',
    installsLabel: '100K+ Reported Downloads',
    rating: 4.6,
    ratingLabel: '9.2K ratings on App Store',
    summary:
      'Converts physical documents, photos, and PDFs into clean editable text with AI-powered summarization and multi-language support.',
    challenge:
      'Extracting and working with text from documents and images often suffers from camera distortion, complex columns, and noisy backgrounds.',
    solution:
      'Built an end-to-end OCR + AI processing workflow with large document handling, optimized for seamless mobile performance.',
    capabilities: [
      'Image and document to text (OCR)',
      'PDF text extraction and structured parsing',
      'AI-powered document summarization and Q&A',
      'Multi-language translation and export support',
    ],
    engineeringNote:
      'Integrates OCR with LLM summarization and caching to deliver fast document insights while minimizing API overhead.',
    relevance:
      'Substantial public adoption with 100K+ downloads and 9.2K reviews on the Apple App Store maintaining a 4.6 rating.',
    techStack: ['Flutter & Dart', 'Multilingual OCR', 'PDF & Image Import', 'AI Summarization'],
  },
  {
    slug: 'ai-transcript-audio-to-text',
    appName: 'AI Transcript',
    frontImage: '/card-ai-transcript.jpg',
    tagline: 'Converting long audio or video files into useful, actionable text',
    category: 'Multilingual Audio & Applied AI',
    installsLabel: '10K+ Reported Downloads',
    rating: 4.6,
    ratingLabel: '404 ratings on Google Play',
    summary:
      'Complete mobile transcription workflow converting audio and video speech to text with AI summarization, translation, and interactive document chat.',
    challenge:
      'Converting long audio or video files into useful, actionable text is computationally intensive, expensive over third-party APIs, and prone to mobile network drops.',
    solution:
      'Engineered asynchronous, scalable workflows for processing large audio files with efficient API usage, token budgeting, and cost control.',
    capabilities: [
      'Audio/video to text speech transcription',
      'AI-generated meeting & lecture summaries',
      'Chat directly with your audio transcripts',
      'Multi-language transcription and translation',
    ],
    engineeringNote:
      'Production concerns include chunked file uploads, usage limits, server-side secret management via Firebase Cloud Functions, and responsiveness.',
    relevance:
      'Published on Google Play & App Store with 10K+ downloads and 4.6 rating on Google Play.',
    techStack: ['Flutter & Dart', 'Speech AI', 'Cloud Functions', 'Transcript Chat'],
  },
  {
    slug: 'handwriting-to-text-scanner',
    appName: 'Handwriting to Text Scanner',
    frontImage: '/card-handwriting.jpg',
    tagline: 'Convert handwritten notes to editable text',
    category: 'EdTech & Digitization Workflows',
    installsLabel: '10K+ Reported Downloads',
    rating: 4.4,
    ratingLabel: 'Android & iOS Store App',
    summary:
      'Dedicated mobile workflow that helps users scan handwritten pages, recognize cursive text, make corrections, and organize results digitally.',
    challenge:
      'Handwritten notes remain useful in study and work, yet they are hard to search, edit, organize, or share without manual transcription.',
    solution:
      'Combined adaptive image preprocessing with specialized handwriting recognition models, batch scanning, and folder organization.',
    capabilities: [
      'Convert handwritten notes to editable text',
      'Camera capture and image/PDF batch import',
      'Handwriting recognition with editable results',
      'Translation, copying, sharing, and scan history',
    ],
    engineeringNote:
      'Focuses not only on extracting text, but on completing the journey from a handwritten page to an organized digital document.',
    relevance:
      'Relevant to education software, digitization, digital recordkeeping, and focused productivity products.',
    techStack: ['Android & iOS', 'Handwriting AI', 'Batch Scanning', 'Folder Organization'],
  },
]

export const EMERGING_PRODUCTS = [
  {
    name: 'Live Transcribe',
    tagline: 'Real-time speech-to-text',
    category: 'Live Audio Workflows / AI Speech Recognition',
    status: 'In Active Development • 500+ Downloads',
    summary:
      'A mobile product focused on converting spoken conversations into readable text, exploring live recognition, multilingual experiences, and practical speech capture.',
  },
  {
    name: 'AI Study Tutor',
    tagline: 'AI-assisted study and document learning',
    category: 'Education Technology / AI Document Interaction',
    status: 'In Active Development • 500+ Downloads',
    summary:
      'An educational application exploring question-answering and learning workflows around study material, PDFs, and homework-related tasks.',
  },
]

export const SERVICES_LIST = [
  {
    id: '01',
    slug: 'mobile-app-development',
    title: '01. Mobile App Development',
    tag: 'Core Engineering Service',
    leadQuestion: 'I need a new Android or iOS application.',
    summary:
      'Cross-platform Android and iOS mobile applications and startup MVPs built with Flutter and Dart from a shared codebase.',
    description:
      'We turn defined business requirements into functional mobile products. Flutter UI implementation, core feature development, navigation, state management, testing, and production store release.',
    capabilities: [
      '01 Application Development: Flutter UI, navigation, reusable widgets and logic',
      '02 Feature Implementation: Core business workflows, interactions, and state',
      '03 Testing & Release: Functional validation, Android/iOS builds, store submission',
      'Firebase Auth, Firestore & Cloud Functions database setup',
      '100% Client Source-Code IP ownership & NDA protection',
    ],
  },
  {
    id: '02',
    slug: 'mobile-app-integration',
    title: '02. Mobile App Integration',
    tag: 'API & External Services',
    leadQuestion: 'Have an API or third-party service to integrate into your mobile app?',
    summary:
      'Connect your mobile app with the backend systems, APIs, and external third-party services your business relies on.',
    description:
      'We integrate external platforms, payment gateways, authentication providers, and third-party APIs into mobile applications for a unified, streamlined user experience.',
    capabilities: [
      'API & Backend Integration: Connect mobile apps with backend systems and REST APIs',
      'Third-party Service Integration: Integrate external platforms and services',
      'Data & Workflow Integration: Connect application data and services for unified UX',
      'AI & Cloud Workflows: OCR extraction, speech processing, and document chat',
      'Secure Token & API-Key handling via Cloud Functions mediation',
    ],
  },
  {
    id: '03',
    slug: 'app-enhancement-maintenance',
    title: '03. App Enhancement & Maintenance',
    tag: 'Application Lifecycle Service',
    leadQuestion: 'Need to improve, stabilize or extend an existing Flutter application?',
    summary:
      'Ongoing engineering support to fix issues, enhance features, modernize Flutter dependencies, and keep your application running reliably.',
    description:
      'A structured 4-step workflow: Assess code & performance, Stabilize crashes and bug fixes, Enhance features and user flows, and Maintain releases and ongoing support.',
    capabilities: [
      '01 Assess: Review codebase architecture, performance, and existing technical debt',
      '02 Stabilize: Fix crashes, UI glitches, state management issues, and device bugs',
      '03 Enhance: Add new screens, workflows, third-party integrations, and user features',
      '04 Maintain: Flutter SDK, dependency upgrades, OS updates (Android 15 / iOS 18)',
      'Agreed SLA response times, Crashlytics monitoring, and release support',
    ],
  },
  {
    id: '04',
    slug: 'dedicated-flutter-development',
    title: '04. Dedicated Flutter Development',
    tag: 'Team & White-Label Model',
    leadQuestion: 'Need Flutter development capacity for your upcoming delivery?',
    summary:
      'Add skilled Flutter developers to your team, work within your process, and deliver together with full transparency.',
    description:
      'Three flexible models: Dedicated Development (part/full time), Team Extension (working within your repository), and White-Label Partnership (delivering under your agency brand).',
    capabilities: [
      'Model 01 Dedicated Development: Part-time or full-time Flutter implementation',
      'Model 02 Team Extension: Works directly with your Git, PR workflows & Slack/Jira',
      'Model 03 White-Label Partnership: Support agency delivery under your brand',
      'Transparent 5-step process: Requirement > Allocation > Onboarding > Dev > Reporting',
      'Strict confidentiality, mutual NDA, and zero client solicitation guarantee',
    ],
  },
]

export const SERVICE_COMPARISON = [
  {
    dimension: 'Customer Need',
    s1: 'I need a new Android or iOS application',
    s2: 'Need to connect APIs or third-party services',
    s3: 'Need to stabilize, improve or extend app',
    s4: 'Need Flutter capacity for upcoming delivery',
  },
  {
    dimension: 'Starting Point',
    s1: 'New mobile product or MVP',
    s2: 'Existing mobile app & external API/backend',
    s3: 'Existing Flutter application codebase',
    s4: 'Existing engineering team / agency project',
  },
  {
    dimension: 'Main Objective',
    s1: 'Build & launch a production Flutter app',
    s2: 'Integrate external services for seamless flow',
    s3: 'Assess, stabilize, enhance & maintain',
    s4: 'Extend team capacity with senior engineers',
  },
  {
    dimension: 'Main Deliverable',
    s1: 'Complete Android & iOS Flutter app',
    s2: 'Integrated API, backend & data workflows',
    s3: 'Bug-free, modernized & maintained app',
    s4: 'Dedicated developer hours or white-label code',
  },
  {
    dimension: 'Typical Buyer',
    s1: 'Founder / Product Manager',
    s2: 'Startup / CTO / Business Owner',
    s3: 'Existing App Owner / SaaS',
    s4: 'Digital Agency / Eng Manager',
  },
  {
    dimension: 'Typical Billing',
    s1: 'Fixed Price / Milestone',
    s2: 'Fixed Price / Milestone',
    s3: 'Monthly Retainer / T&M',
    s4: 'Monthly Developer Allocation',
  },
]

export const AI_CAPABILITIES = [
  {
    code: 'A',
    title: 'Speech & Audio AI',
    items: [
      'Audio & video-to-text transcription',
      'Live speech-to-text & multilingual support',
      'Transcript summarization & translation',
    ],
    useCases: 'Meetings, interviews, lectures & voice notes',
  },
  {
    code: 'B',
    title: 'AI Document Processing',
    items: [
      'PDF upload, parsing & summarization',
      'Context-based document Q&A chat',
      'Structured document data extraction',
    ],
    useCases: 'Research papers, reports & business docs',
  },
  {
    code: 'C',
    title: 'OCR & Text Extraction',
    items: [
      'Image-to-text & printed document OCR',
      'Handwriting recognition workflows',
      'Editable text, copy & instant export',
    ],
    useCases: 'Receipt scanning, notes & whiteboard capture',
  },
  {
    code: 'D',
    title: 'Conversational AI',
    items: [
      'Clean mobile AI chat interfaces',
      'Chat with documents & extracted text',
      'Persistent conversation history',
    ],
    useCases: 'AI assistants & workspace knowledge tools',
  },
  {
    code: 'E',
    title: 'AI-Powered Learning',
    items: [
      'AI-generated study summaries',
      'Automated quiz & flashcard generation',
      'Interactive study Q&A companions',
    ],
    useCases: 'EdTech apps, exam prep & digital learning',
  },
  {
    code: 'F',
    title: 'AI Text Processing',
    items: [
      'Text rewriting & grammar enhancement',
      'Multi-language translation workflows',
      'Structured entity & summary extraction',
    ],
    useCases: 'Writing tools & productivity utilities',
  },
]

export const FLUTTER_ARCHITECTURE_LAYERS = [
  {
    layer: '01. Presentation Layer',
    details: 'Flutter Screens · Reusable Widgets · Navigation Flows',
  },
  {
    layer: '02. State Management',
    details: 'Provider · Predictable App State · Client Workflows',
  },
  {
    layer: '03. Service & Data Layer',
    details: 'Repositories · REST API Clients · Typed Models · Serialization',
  },
  {
    layer: '04. Firebase & Cloud Mediation',
    details: 'Firebase Auth · Firestore/DB · Cloud Functions (API-Key Protection) · Analytics',
  },
  {
    layer: '05. External AI & Client Backends',
    details: 'Third-Party AI APIs (Speech, OCR, LLM) · Existing Client REST APIs',
  },
]
