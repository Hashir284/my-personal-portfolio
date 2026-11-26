// Defaults shown until you save a section from /admin. Admin-saved content overrides these.
// Navigation lives in data/nav.js.
export const defaultContent = {
  profile: {
    name: 'Muhammad Hashir', title: 'Frontend Developer | MERN Stack Developer', location: 'Karachi, Pakistan',
    email: 'hashirdev68@gmail.com', phone: '+92 319 3879205',
    github: 'https://github.com/Hashir284', linkedin: 'https://www.linkedin.com/in/muhammad-hashir-319045394',
    resume: '/Muhammad_Hashir_CV.pdf',
  },
  portrait: '/hashir.webp',
  hero: {
    headline: 'Building Modern Web Experiences.',
    subtitle: 'Frontend Developer & MERN Stack Developer',
    intro: 'I build modern, responsive, and interactive web applications using React.js and the MERN stack, turning ideas into practical digital experiences.',
    availability: 'Available for opportunities', primaryText: 'View my projects', secondaryText: 'Contact me',
  },
  about: {
    paragraphs: [
      'I’m Muhammad Hashir, a developer from Karachi. I started with HTML, CSS and JavaScript, and React.js became the tool I trust most for building fast, responsive interfaces.',
      'Through Saylani Mass IT Training (SMIT) I’m learning the full MERN stack. I’ve already shipped a full-stack e-commerce platform with its own admin panel, and built a complete MERN project within a hackathon’s time limit.',
      'I like turning real problems into working software that people can actually use. Backend and database work is where I’m improving fastest: Node.js, Express, MongoDB and PostgreSQL. My goal is to become a full-stack developer who ships scalable, production-ready applications.',
    ],
    facts: [
      { big: '2', label: 'full-stack projects deployed' }, { big: 'MERN', label: 'stack, in training at SMIT' },
      { big: '12 hrs', label: 'Coding Night hackathon completed' }, { big: '2026', label: 'HSSC completed' },
    ],
  },
  skills: [
    { title: 'Frontend Development', icon: 'layout', items: [
      ['React.js', 'react', 'core'], ['JavaScript (ES6+)', 'javascript', 'core'], ['HTML5', 'html', 'core'], ['CSS3', 'css', 'core'], ['Tailwind CSS', 'tailwind', 'core'],
      ['Responsive Web Design', 'mobile', 'core'], ['State Management', 'layers', 'core'], ['API Integration', 'link', 'core'],
    ] },
    { title: 'Frameworks', icon: 'box', items: [['Next.js (basic)', 'nextjs', 'learning'], ['TypeScript (basic)', 'typescript', 'learning']] },
    { title: 'Backend Development', icon: 'server', items: [
      ['Node.js', 'node', 'learning'], ['Express.js', 'express', 'learning'], ['REST API Development', 'globe', 'learning'],
      ['Authentication', 'shield', 'learning'], ['Middleware', 'layers', 'learning'], ['Backend Integration', 'link', 'learning'],
    ] },
    { title: 'Databases', icon: 'database', items: [['MongoDB', 'mongodb', 'learning'], ['PostgreSQL', 'postgresql', 'learning']] },
    { title: 'Development Tools', icon: 'branch', items: [
      ['Git', 'git', 'learning'], ['GitHub', 'github', 'learning'], ['GitHub Desktop', 'github', 'learning'], ['VS Code', 'vscode', 'learning'], ['npm', 'npm', 'learning'], ['Chrome DevTools', 'chrome', 'learning'],
    ] },
    { title: 'AI Development Tools', icon: 'cpu', items: [
      ['ChatGPT', 'openai', ''], ['Claude', 'claude', ''], ['Google Gemini', 'gemini', ''], ['Grok', 'x', ''], ['GitHub Copilot', 'copilot', ''], ['Antigravity', 'cpu', ''],
    ] },
  ].map((g) => ({ ...g, items: g.items.map(([name, icon, level]) => ({ name, icon, level, published: true })) })),
  timeline: [
    { title: 'Web & Mobile App Development (MERN Stack)', place: 'Saylani Mass IT Training (SMIT), Karachi', period: '', status: 'Ongoing', note: 'Hands-on training in JavaScript, React.js, Next.js, Node.js, Express and databases.' },
    { title: 'Intermediate (HSSC)', place: 'Govt. Forman College, Karachi', period: '', status: 'Completed 2026', note: 'Completed alongside practical software development training.' },
  ],
  certificates: [
    { title: 'Certificate of Participation', organization: 'Saylani IT Training Programme', event: 'Coding Night (Hackathon)', issueDate: '2026', duration: '12 Hours', number: 'SMIT/2026/HACKATHON/481967', image: '/certificates/coding-night-hackathon-2026.webp', published: true },
  ],
  services: [
    { title: 'Frontend Development', icon: 'layout', text: 'Clean, component-based interfaces in React.js and modern JavaScript.', published: true },
    { title: 'React.js Application Development', icon: 'react', text: 'Interactive apps with organised state and reusable components.', published: true },
    { title: 'Responsive Web Design', icon: 'mobile', text: 'Layouts that hold up on phones, tablets and desktops.', published: true },
    { title: 'MERN Stack Development', icon: 'layers', text: 'Full-stack projects from database to deployed interface.', published: true },
    { title: 'REST API Integration', icon: 'link', text: 'Connecting frontends to Express and Node.js backends.', published: true },
    { title: 'Database Integration', icon: 'database', text: 'Working with MongoDB from the backend to the UI.', published: true },
  ],
  settings: {
    siteTitle: '', siteDescription: '', announcement: '',
    footerText: 'Frontend developer building modern web experiences with React.js and the MERN stack.',
    visibility: { about: true, skills: true, services: true, projects: true, certificates: true, education: true, github: true },
  },
}

// Shown if the API is not configured or unreachable.
export const projects = [
  {
    id: 'mughal-store', title: 'Mughal Store', kicker: 'Full-stack e-commerce', mock: 'store',
    description: 'A full-stack e-commerce platform with a customer-facing storefront and a custom administrative dashboard, connected through its own backend API.',
    features: ['Modern e-commerce storefront', 'Custom admin dashboard', 'Product management', 'Order management', 'Customer authentication', 'Shopping experience', 'Backend API integration'],
    tech: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB'],
    links: [{ label: 'Live store', href: 'https://mughalstore.vercel.app', primary: true }, { label: 'Admin panel', href: 'https://mughalstoreadminpanel.vercel.app' }],
  },
  {
    id: 'smit-hackathon', title: 'SMIT Final Hackathon Project', kicker: 'MERN application', mock: 'app',
    description: 'A full-stack MERN application designed and delivered under strict time constraints during the SMIT final hackathon.',
    features: [], tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    links: [{ label: 'Live demo', href: 'https://smit-final-hackathon-ruby.vercel.app', primary: true }],
  },
]
