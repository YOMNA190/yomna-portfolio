export interface Project {
  id: string
  title: string
  category: string
  metrics: string
  description: string
  problem: string
  solution: string
  impact: string[]
  tags: string[]
  image: string
  link?: string
  year: string
}

export interface SecondaryProject {
  name: string
  description: string
  tech: string[]
  link: string
  status: 'live' | 'building' | 'oss'
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
}

export interface Writing {
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  link: string
}

export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'Growth' | 'DevOps' | 'Design'
  proficiency: number
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  type: 'work' | 'education' | 'milestone'
}

export const featuredProjects: Project[] = [
  {
    id: 'ps-lounge-saas',
    title: 'PS Lounge SaaS',
    category: 'SaaS Architecture',
    metrics: '+320% ROI',
    description:
      'A complete management ecosystem for entertainment lounges, scaling from local to regional operations.',
    problem:
      'Lounge owners were juggling 4+ disconnected tools for bookings, billing, staff, and inventory. No single source of truth.',
    solution:
      'Built a unified React dashboard with Node.js microservices, PostgreSQL, and automated billing cycles. Single-tenant architecture with multi-tenant roadmap.',
    impact: [
      'Reduced operational overhead by 60%',
      'Billing error rate dropped to < 0.5%',
      'Client retention improved to 94%',
    ],
    tags: ['React 19', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: '/project-ps-lounge.jpg',
    link: '#',
    year: '2024',
  },
  {
    id: 'qena-market',
    title: 'Qena Market',
    category: 'E-commerce Scaling',
    metrics: '1.2M EGP GMV',
    description:
      'Optimized multi-vendor marketplace with automated logistics and high-conversion funnels.',
    problem:
      'Local vendors had no digital presence. Existing marketplaces charged 25%+ commission and offered no logistics support.',
    solution:
      'Developed a Next.js marketplace with vendor dashboards, automated delivery routing, and conversion-optimized product pages.',
    impact: [
      'Onboarded 120+ vendors in 3 months',
      'Average commission reduced to 8%',
      'Cart abandonment reduced by 34%',
    ],
    tags: ['Next.js', 'Prisma', 'Growth', 'Automation'],
    image: '/project-qena-market.jpg',
    link: '#',
    year: '2024',
  },
  {
    id: 'happiness-plaza',
    title: 'Happiness Plaza',
    category: 'Interactive Real Estate',
    metrics: 'Lead Gen +45%',
    description:
      '3D interactive visualization tool for premium real estate developments.',
    problem:
      'Property developers struggled to convey spatial experience through static images. Buyer hesitation was high.',
    solution:
      'Created an immersive Three.js visualization with React integration, allowing buyers to explore units before construction.',
    impact: [
      'Lead-to-tour conversion up 45%',
      'Sales cycle shortened by 3 weeks',
      'Featured in regional prop-tech showcase',
    ],
    tags: ['Three.js', 'React', 'WebGL', 'Marketing'],
    image: '/project-happiness-plaza.jpg',
    link: '#',
    year: '2023',
  },
]

export const secondaryProjects: SecondaryProject[] = [
  {
    name: 'Portfolio CMS',
    description: 'Headless CMS for creative portfolios with real-time preview',
    tech: ['Next.js', 'Sanity', 'Vercel'],
    link: '#',
    status: 'live',
  },
  {
    name: 'Task Automation',
    description: 'Workflow automation engine with webhook orchestration',
    tech: ['Node.js', 'n8n', 'Redis'],
    link: '#',
    status: 'building',
  },
  {
    name: 'API Gateway',
    description: 'Microservice routing layer with rate limiting and auth',
    tech: ['Go', 'Docker', 'Redis'],
    link: '#',
    status: 'live',
  },
  {
    name: 'Analytics Pipeline',
    description: 'Event tracking and real-time visualization dashboard',
    tech: ['Python', 'ClickHouse', 'Grafana'],
    link: '#',
    status: 'building',
  },
  {
    name: 'Auth Microservice',
    description: 'JWT-based auth system with refresh token rotation',
    tech: ['Node.js', 'PostgreSQL', 'OAuth2'],
    link: '#',
    status: 'oss',
  },
  {
    name: 'Chat Interface',
    description: 'Real-time messaging component with typing indicators',
    tech: ['React', 'Firebase', 'WebSockets'],
    link: '#',
    status: 'live',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'Yomna rebuilt our entire booking infrastructure in 6 weeks. The system handled 10x traffic during peak season without a hiccup. She thinks like a founder, not just a developer.',
    author: 'Ahmed Khaled',
    role: 'Co-Founder',
    company: 'PS Lounge',
  },
  {
    quote:
      'The combination of technical depth and growth thinking is rare. Yomna didn\'t just build the marketplace — she optimized every funnel step until we hit profitability.',
    author: 'Mariam Hassan',
    role: 'Operations Director',
    company: 'Qena Market',
  },
  {
    quote:
      'Our 3D property tool became the #1 reason buyers scheduled site visits. Yomna delivered beyond the brief, adding features we didn\'t know we needed.',
    author: 'Omar Fathi',
    role: 'Marketing Lead',
    company: 'Happiness Plaza',
  },
]

export const writings: Writing[] = [
  {
    title: 'Why Every SaaS Should Be Built for Monetization on Day One',
    excerpt:
      'Engineering decisions made early determine whether a product can ever be profitable. Here is the architecture checklist I use before writing the first line of code.',
    date: '2024-11-15',
    readTime: '6 min read',
    tags: ['SaaS', 'Architecture', 'Monetization'],
    link: '#',
  },
  {
    title: 'From 4.2% to 7.85% CTR: A Systematic Approach to Ad Creative Testing',
    excerpt:
      'Most media buyers guess. I build. A/B testing frameworks, statistical significance thresholds, and creative decay models that keep campaigns profitable.',
    date: '2024-09-22',
    readTime: '8 min read',
    tags: ['Growth', 'Media Buying', 'A/B Testing'],
    link: '#',
  },
  {
    title: 'The Full-Stack Advantage: Why Engineers Make Better Growth Strategists',
    excerpt:
      'When you understand both the code and the funnel, you stop shipping features and start shipping revenue.',
    date: '2024-07-10',
    readTime: '5 min read',
    tags: ['Career', 'Full-Stack', 'Strategy'],
    link: '#',
  },
]

export const skills: Skill[] = [
  { name: 'React / Next.js', category: 'Frontend', proficiency: 95 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 92 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90 },
  { name: 'Three.js / WebGL', category: 'Frontend', proficiency: 75 },
  { name: 'Node.js', category: 'Backend', proficiency: 90 },
  { name: 'PostgreSQL', category: 'Backend', proficiency: 85 },
  { name: 'Prisma / ORM', category: 'Backend', proficiency: 88 },
  { name: 'Go', category: 'Backend', proficiency: 70 },
  { name: 'Meta Ads', category: 'Growth', proficiency: 92 },
  { name: 'Google Ads', category: 'Growth', proficiency: 88 },
  { name: 'Conversion Optimization', category: 'Growth', proficiency: 90 },
  { name: 'Funnel Design', category: 'Growth', proficiency: 85 },
  { name: 'Docker', category: 'DevOps', proficiency: 80 },
  { name: 'CI/CD', category: 'DevOps', proficiency: 78 },
  { name: 'AWS / Vercel', category: 'DevOps', proficiency: 82 },
  { name: 'Figma', category: 'Design', proficiency: 75 },
]

export const timeline: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Full-Stack Engineer & Growth Lead',
    description:
      'Leading product engineering and paid acquisition for multiple SaaS and e-commerce ventures. 1.2M+ EGP in managed ad spend.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Happiness Plaza — PropTech Launch',
    description:
      'Shipped a Three.js-powered real estate visualization platform that increased qualified leads by 45%.',
    type: 'milestone',
  },
  {
    year: '2023',
    title: 'Senior Frontend Engineer',
    description:
      'Architected React design systems and mentored junior developers across distributed teams.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'Qena Market — Marketplace MVP',
    description:
      'Built and launched a multi-vendor marketplace from zero to 120+ vendors in 90 days.',
    type: 'milestone',
  },
  {
    year: '2021',
    title: 'Media Buyer & Growth Strategist',
    description:
      'Pivoted into performance marketing, managing 500K+ EGP in monthly ad spend across Meta, Google, and TikTok.',
    type: 'work',
  },
  {
    year: '2020',
    title: 'Self-Taught Full-Stack Developer',
    description:
      'Started building production applications. First SaaS launched within 8 months of learning to code.',
    type: 'milestone',
  },
]
