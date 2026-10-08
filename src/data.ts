export const profile = {
  name: 'Shivansh Aggarwal',
  title: 'Full-Stack Developer',
  location: 'Faridabad, Haryana, India',
  tagline: 'Building full-stack web apps while exploring AI, machine learning and cybersecurity.',
  github: 'https://github.com/Shiavsnhfbd123',
  githubHandle: 'Shiavsnhfbd123',
  linkedin: 'https://www.linkedin.com/in/shivanshhr123',
  email: 'Shivanshfbd123@gmail.com',
  summary:
    'Computer engineering student focused on full-stack development, with a growing interest in AI, machine learning and cybersecurity. I like turning ideas into useful, working applications.',
  goal: 'Become a Full-Stack Developer and build useful and innovative applications.',
  hobby: 'Watching movies',
}

export const education = [
  { school: 'Indian Institute of Technology, Patna', degree: 'B.S. in Artificial Intelligence and Cyber Security', mode: 'Online', progress: '2nd year, semester 3', grad: 2029 },
  { school: 'Shri Vishwakarma Skill University', degree: 'B.Tech in Computer Engineering', mode: 'Offline', progress: '2nd year, semester 3', grad: 2029 },
]

export const learning = ['Python', 'React', 'Django', 'AI']

export const interests = [
  'Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Data Science',
  'Data Analytics', 'Web Development', 'Programming', 'Open Source',
]

export const skills: Record<string, string[]> = {
  Languages: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL'],
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React'],
  Backend: ['Node.js', 'Flask', 'Django'],
  'AI and Data': ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'Pandas', 'NumPy', 'Power BI', 'Tableau'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Antigravity IDE'],
}

export type Project = {
  name: string
  status: string[]
  desc: string
  tech: string[]
  github?: string
  demo?: string
}

export const featured: Project = {
  name: 'QueryPilot: MySQL AI Assistant',
  status: ['Active development', 'Local development ready', 'Docker deployment ready'],
  desc: 'A schema-aware assistant that turns informal English into structured SQL plans. The AI only proposes the plan: a FastAPI backend parses, validates, risk-classifies, confirms and safely executes it through a restricted MySQL account.',
  tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'MySQL 8+', 'SQLGlot', 'Ollama', 'Qwen2.5 3B', 'OpenRouter', 'Docker', 'Docker Compose', 'pytest'],
}

export const featuredPoints = [
  'Immutable, single-use execution plans',
  'Read-only protection and risk-based confirmation',
  'Parameter validation, audit history, transaction safety',
  'Local AI via Ollama with optional OpenRouter fallback',
]

export const pipeline = [
  { step: 'English instruction', note: 'You describe what you need', backend: false },
  { step: 'AI proposes a SQL plan', note: 'Ollama, Qwen2.5 3B', backend: false },
  { step: 'Backend validates', note: 'Parse and risk-classify', backend: true },
  { step: 'You confirm', note: 'Risk-based confirmation', backend: true },
  { step: 'Restricted MySQL account', note: 'Single-use plan executes', backend: true },
]

export const projects: Project[] = [
  {
    name: 'Library Management System AutoFill',
    status: ['Completed', 'Hackathon-ready'],
    desc: 'Hackathon-friendly library system with one-click AutoFill for demo credentials and registration details. Admin and student roles, books, authors, categories, issues, returns and fines.',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Django REST Framework', 'SimpleJWT', 'PostgreSQL'],
    github: 'https://github.com/Shiavsnhfbd123/Libarary-Management-System-AutoFill',
    demo: 'https://libarary-management-system-autofill-pi.vercel.app',
  },
  {
    name: 'Library Management System',
    status: ['Completed', 'Live demo'],
    desc: 'Role-aware platform for librarians and students: catalogue management, issuing, returns, due-date tracking, late fines, borrowing history and dashboards with JWT authentication.',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Django REST Framework', 'SimpleJWT', 'PostgreSQL'],
    github: 'https://github.com/Shiavsnhfbd123/Libarary-Management-System',
    demo: 'https://libarary-management-system-pied.vercel.app/',
  },
  {
    name: 'Personal Developer Portfolio',
    status: ['Completed', 'Production-ready'],
    desc: 'Responsive dark editorial portfolio with smooth animations, interactive project cards, active navigation, accessibility support and a downloadable PDF resume.',
    tech: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Vercel'],
    github: 'https://github.com/Shiavsnhfbd123/Portfolio',
    demo: 'https://portfolio-two-teal-986qx5watq.vercel.app/',
  },
]

export const certs = [
  { name: 'HackBlox', by: 'HackersCult', date: '13 September 2026', url: 'https://app.truscholar.io/profile?credId=6aa98894c31d57b3640d4626' },
  { name: 'OneHack', by: 'HackersCult', date: '5 September 2026', url: 'https://app.truscholar.io/profile?credId=6a9d7d311eb4ec9eb7dc328b' },
  { name: 'Internship', by: 'CodSoft', date: '10 August 2026', url: 'https://drive.google.com/file/d/175jl-besZ7yy0ghKBRJWsk8Ui4SN7CLd/view?pli=1' },
]

// Entered by hand. Update when they change.
export const stats = [
  { n: 15, label: 'Public repositories' },
  { n: 4, label: 'Followers' },
  { n: 3, label: 'Following' },
  { n: 2, label: 'Stars' },
]
