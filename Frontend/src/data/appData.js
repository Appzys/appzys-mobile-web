export const FALLBACK_CASE_STUDIES = [
  {
    slug: 'copy-text-on-screen',
    appName: 'Copy Text On Screen',
    frontImage: '/card-copy-text.jpg',
    tagline: 'Text trapped in images, apps or non-selectable screens',
    category: 'OCR & Productivity Utility',
    installsLabel: '500K+ reported Google Play downloads',
    rating: 4.6,
    ratingLabel: '4.6 rating, 4.8K App Store ratings',
    summary:
      'Extract text from screenshots and images. Share a screenshot with the app, select an area, then copy, save or translate the recognized text.',
    challenge:
      'Text trapped in images, apps, or non-selectable screens cannot always be selected directly. Users otherwise need to retype the information or use a separate workaround.',
    solution:
      'Built screenshot-sharing integration, image-based OCR processing, and text selection/extraction with multilingual translation workflows.',
    capabilities: [
      'Extract text from shared screenshots and images',
      'Multilingual text recognition and translation',
      'Copy, share, export and save text workflows',
      'Lightweight, fast and extremely easy to use',
    ],
    engineeringNote:
      'Brings together screenshot handling, OCR results and clipboard integration. Recognition quality, permissions and responsiveness are important concerns throughout the workflow.',
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
    installsLabel: '100K+ reported Google Play downloads',
    rating: 4.6,
    ratingLabel: '4.6 rating, 9.2K App Store ratings',
    summary:
      'Extract text from photos, PDFs and handwritten notes. Scan documents to PDF and use AI to summarize, translate or ask questions about images and PDFs.',
    challenge:
      'Extracting and working with text from documents and images often suffers from camera distortion, complex columns, and noisy backgrounds.',
    solution:
      'Built an end-to-end OCR + AI processing workflow with large document handling, optimized for seamless mobile performance.',
    capabilities: [
      'Image and document to text (OCR)',
      'Document scanning, PDF import and text extraction',
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
    installsLabel: '10K+ reported Google Play downloads',
    rating: 4.6,
    ratingLabel: '4.6 rating, 412 Google Play ratings',
    summary:
      'Record speech or import audio and video to create transcripts. Review recordings, generate AI summaries, translate text and chat with transcript content.',
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
  {
    slug: 'live-transcribe', appName: 'Live Transcribe',
    frontImage: '/product-icons/live-transcribe.png',
    tagline: 'Live conversations, ready to read and revisit',
    category: 'Multilingual Audio & Applied AI',
    installsLabel: '500+ Google Play downloads', ratingLabel: 'Live on Google Play',
    summary: 'Captures live speech as text, with translation, AI summaries and saved transcript conversations.',
    challenge: 'Spoken information is easy to miss and difficult to revisit while a conversation is still happening.',
    solution: 'A live transcript experience with original text, follow-up tools and saved sessions.',
    capabilities: ['Live transcription', 'Translation', 'AI summaries', 'Transcript chat and history'],
    engineeringNote: 'Live capture requires careful session state, incremental results and microphone lifecycle handling.',
    techStack: ['Speech recognition', 'Microphone integration', 'Transcript tools'],
  },
  {
    slug: 'ai-study-tutor', appName: 'AI Study Tutor',
    frontImage: '/product-icons/ai-study-tutor.png',
    tagline: 'From difficult material to a more active study session',
    category: 'Education & Document Learning',
    installsLabel: '500+ Google Play downloads', ratingLabel: 'Live on Google Play',
    summary: 'Combines document chat and photo-based study questions with explanations, flashcards and quizzes.',
    challenge: 'Students need to move between source material, difficult questions and revision without losing context.',
    solution: 'A study workspace that connects imported material with explanations, follow-up questions and revision tools.',
    capabilities: ['Document chat', 'Study question capture', 'Step explanations', 'Flashcards and quizzes'],
    engineeringNote: 'Study context and structured answers need to stay associated with their source material.',
    techStack: ['Document processing', 'AI tutoring', 'Study tools'],
  },
]

export const SERVICES_LIST = [
  {
    id: '01',
    slug: 'mobile-app-development',
    overviewTitle: 'MVP app development',
    overviewSummary: 'Turn your idea into a first release for Android and iOS.',
    outcome: 'Idea to launch',
    title: '01 — Full MVP Mobile App Development',
    tag: 'MVP & Product Launch',
    leadQuestion: 'Have an app idea? Build the first working version.',
    summary:
      'Build your first Android and iOS application using Flutter, with Firebase, API integration and native functionality where required.',
    description:
      'Build a new Android and iOS application from your requirements, with Flutter and Firebase-backed functionality where suitable.',
    capabilities: [
      'Product requirement and user workflow understanding',
      'Flutter development for Android and iOS',
      'Firebase integration for suitable requirements',
      'AI-powered mobile feature integration',
      'Functional testing, release preparation and handover',
    ],
  },
  {
    id: '02',
    slug: 'mobile-app-integration',
    overviewTitle: 'SaaS & backend integration',
    overviewSummary: 'Bring your existing platform to mobile through connected APIs and workflows.',
    outcome: 'Web to mobile',
    title: '02 — SaaS & Backend to Mobile App Integration',
    tag: 'Web & Backend Extension',
    leadQuestion: 'Already have a web platform? Bring it to Android and iOS.',
    summary:
      'Extend an existing web application, SaaS platform or backend system to Android and iOS using existing APIs and business workflows.',
    description:
      'Extend your web application or SaaS platform to Android and iOS through your existing APIs and backend systems.',
    capabilities: [
      'Review of existing API documentation and requirements',
      'Authentication and user-session integration',
      'Data models and application data handling',
      'Dashboards, forms, lists and detail views',
      'Third-party SDK integration & build preparation',
    ],
  },
  {
    id: '03',
    slug: 'app-enhancement-maintenance',
    overviewTitle: 'App maintenance & enhancement',
    overviewSummary: 'Fix issues, upgrade dependencies and add features to your existing Flutter app.',
    outcome: 'Improve & maintain',
    title: '03 — Mobile App Maintenance & Enhancement',
    tag: 'Lifecycle & Stability',
    leadQuestion: 'Have a Flutter app? Improve, upgrade and extend it.',
    summary:
      'Improve Flutter applications through new features, bug fixes, dependency upgrades, platform compatibility and performance improvements.',
    description:
      'Improve Flutter applications through features, bug fixes, dependency upgrades, compatibility and technical improvements.',
    capabilities: [
      'Existing application and codebase assessment',
      'Bug investigation and resolution',
      'Package and dependency updates',
      'Android Gradle, Kotlin, iOS Xcode & Swift compatibility',
      'Performance, stability improvements & regression validation',
    ],
  },
  {
    id: '04',
    slug: 'dedicated-flutter-development',
    overviewTitle: 'Dedicated Flutter development',
    overviewSummary: 'Hire a dedicated Flutter partner to develop and maintain your company’s mobile solution.',
    outcome: 'Your mobile development partner',
    title: '04 — Dedicated Flutter Development',
    tag: 'Dedicated Mobile Development',
    leadQuestion: 'Need a development partner for your company’s mobile app?',
    summary:
      'Work with a dedicated Flutter partner across requirements, development, integrations, testing, release and ongoing mobile application improvements.',
    description:
      'Dedicated Flutter development for your company’s new or existing mobile application, from planning through release and ongoing support.',
    capabilities: [
      'Flutter feature development and screen workflows',
      'REST API and Firebase integration',
      'Bug fixing and issue investigation',
      'Native Android and iOS integration support',
      'Codebase collaboration via Git and technical handover',
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
    s3: 'Prioritized fixes, upgrades & maintenance',
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
