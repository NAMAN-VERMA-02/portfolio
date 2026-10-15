// To add a new project, add one object to this list. Newest first.
// accent: 'magenta' | 'lime' | 'pink' | 'ink' sets the hover colour of the card.
export const projects = [
  {
    title: 'Abhed',
    tagline: 'An accountability OS for a workforce of people and AI agents.',
    description:
      'Built for CodeX 3.0 Hack Arena (PS5: AI agent governance). Every agent has a human owner, big actions wait for approval on a phone via QR, and every step lands in a tamper-evident, hash-chained ledger. Includes a kill switch outside the model and live prompt-injection defence.',
    tech: ['TypeScript', 'Next.js', 'React', 'Web Push', 'QR approvals'],
    tag: 'Hackathon',
    repo: 'https://github.com/eNVy-rights/abhed',
    live: null,
    date: '2026-10',
    featured: true,
    accent: 'magenta',
  },
  {
    title: 'Inventory Replenishment Env',
    tagline: 'A reinforcement-learning environment for warehouse restocking.',
    description:
      'Submission for the Meta × Scaler OpenEnv Hackathon. An agent decides how much to reorder per SKU each day to minimise holding cost, stockout penalties and order cost. Packaged with Docker.',
    tech: ['Python', 'OpenEnv', 'Docker', 'RL'],
    tag: 'Hackathon',
    repo: 'https://github.com/eNVy-rights/inventory_env',
    live: null,
    date: '2026-04',
    featured: true,
    accent: 'lime',
  },
  {
    title: 'Taskify',
    tagline: 'A task management web app with Kanban, KPIs and analytics.',
    description:
      'Responsive dark-themed task manager. Kanban board for workflows, a dashboard with KPI cards and alerts, and Team and Analytics pages with leaderboards and trend indicators. State handled with React hooks and route-based layouts.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    tag: 'Web App',
    repo: 'https://github.com/eNVy-rights/Taskify',
    live: 'https://taskify-one-alpha.vercel.app',
    date: '2026-04',
    featured: true,
    accent: 'pink',
  },
  {
    title: 'ShopEasy Debug Challenge',
    tagline: 'Found and fixed 9 logic bugs in a React shopping app.',
    description:
      'A full-stack debugging assignment: the app compiled fine but behaved wrong. Fixed boundary bugs in price filters, broken category filtering, cart delete and quantity logic across four files.',
    tech: ['React', 'JavaScript', 'Debugging'],
    tag: 'Coursework',
    repo: 'https://github.com/eNVy-rights/MSE2FULLSTACK',
    live: null,
    date: '2026-04',
    featured: false,
    accent: 'ink',
  },
  {
    title: 'Manyaki',
    tagline: 'A talkative, interactive 3D VRM character.',
    description:
      'Team project: a 3D VRM character with conversational features. I worked on testing and iterating on the user experience based on feedback.',
    tech: ['3D / VRM', 'Conversational AI', 'Team'],
    tag: 'Team Project',
    repo: null,
    live: null,
    date: '2025',
    featured: false,
    accent: 'magenta',
  },
];
