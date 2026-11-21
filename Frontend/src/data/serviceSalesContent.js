// Customer problems and our response; no unmeasured business outcome promises.
export const SERVICE_SALES_CONTENT = {
  'mobile-app-development': {
    question: 'Have an app idea, but unsure how to launch it?',
    answer: 'We help you choose the essential features and build your first Android and iOS release in Flutter.',
    audience: ['Startup founders', 'Business owners', 'New product teams'],
    pairs: [
      ['Too many features. No clear first version?', 'Start with a focused MVP.', 'We work through your users, core workflows and priorities to agree what belongs in the first release.'],
      ['Need Android and iOS, but worried about two separate builds?', 'Build both with Flutter.', 'A shared mobile codebase supports your Android and iOS experience, with native integrations where needed.'],
      ['Not sure who will handle the technical side?', 'Get support from planning to handover.', 'We cover application development, suitable integrations, testing and release preparation within an agreed scope.'],
    ],
    action: 'Talk through my app idea',
    reassurance: 'Bring your idea and priority features. A finished technical specification is not required.',
    proofSlug: 'copy-text-on-screen', proofName: 'Copy Text On Screen',
  },
  'mobile-app-integration': {
    question: 'Your platform works. Do your users still need a mobile app?',
    answer: 'We bring your existing workflows to Android and iOS through a Flutter app connected to your backend.',
    audience: ['SaaS companies', 'Platform owners', 'Software product teams'],
    pairs: [
      ['Customers keep asking for an app?', 'Bring key workflows to mobile.', 'We build the screens, forms and dashboards your mobile users need around your existing platform.'],
      ['Worried you will have to rebuild your backend?', 'Start with the APIs you already have.', 'We review your APIs and authentication first. Any backend gaps or changes are identified and scoped separately.'],
      ['Need the app to work with existing accounts and data?', 'Connect the experience.', 'We integrate user sessions, application data and network-state handling around the capabilities of your backend.'],
    ],
    action: 'Discuss my platform’s mobile app',
    reassurance: 'Share your platform and the workflows users need. API documentation is a useful starting point.',
  },
  'app-enhancement-maintenance': {
    question: 'Are bugs and outdated packages holding back your next release?',
    answer: 'We review your Flutter app, prioritise the work and help you move toward a more dependable next release.',
    audience: ['Existing Flutter app owners', 'Product managers', 'Engineering teams'],
    pairs: [
      ['The same bugs keep coming back?', 'Investigate before changing code.', 'We assess the affected workflows and codebase, then agree on focused fixes and regression checks.'],
      ['Upgrades are breaking builds or blocking releases?', 'Work through compatibility changes.', 'We handle Flutter and package updates alongside the Android and iOS build-tool changes your app needs.'],
      ['Need new features without losing track of existing behaviour?', 'Improve the app in focused steps.', 'We review the current architecture, agree priorities and validate the affected workflows as changes are made.'],
    ],
    action: 'Discuss what’s blocking my release',
    reassurance: 'Start with known issues, current versions and your release priorities.',
  },
  'dedicated-flutter-development': {
    question: 'Need a Flutter developer to handle your company’s mobile app?',
    answer: 'Hire us as your dedicated mobile development partner. We work with your company from requirements and development through testing, release and ongoing improvements.',
    audience: ['Established businesses', 'Software agencies', 'Product teams'],
    pairs: [
      ['Need someone to take responsibility for mobile development?', 'Get support across the full development lifecycle.', 'We understand your requirements, plan the solution and handle Flutter development, integrations, testing and release preparation within the agreed scope.'],
      ['Starting a new app or continuing an existing one?', 'Work with a partner who fits your business.', 'We can build your company’s mobile application from the ground up or work within your existing architecture, codebase and backend systems.'],
      ['Want a developer who works closely with your company?', 'Make us part of your delivery process.', 'We coordinate with your stakeholders, share progress, collaborate through Git and code reviews, and support releases and ongoing improvements.'],
    ],
    action: 'Discuss my company’s mobile app',
    reassurance: 'Tell us what your company needs. We will agree responsibilities, scope and availability together.',
  },
}
