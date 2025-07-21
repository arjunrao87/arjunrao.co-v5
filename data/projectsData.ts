interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  technologies?: string[]
  category?: string
  status?: string
  metrics?: string
  year?: string
}

const projectsData: Project[] = [
  {
    title: 'Silicon Juice',
    description: `Comprehensive searchable database of venture capital activity in Silicon Valley, featuring advanced filtering and analytics capabilities for tracking funding rounds, investors, and startup metrics.`,
    imgSrc: '/static/images/siliconjuice.png',
    href: 'https://siliconjuice.netlify.app/',
    technologies: ['React', 'Node.js', 'Algolia'],
    category: 'Data Platform',
    status: 'Live',
    metrics: '1k+ monthly searches',
    year: '2023',
  },
  {
    title: 'Hourly',
    description: `Strategic decision-making tool that calculates opportunity cost and ROI for task delegation vs. self-execution, helping professionals optimize their time allocation and productivity.`,
    imgSrc: '/static/images/hourly.webp',
    href: 'https://usehourly.netlify.app/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'Productivity',
    status: 'Live',
    metrics: '500+ calculations performed',
    year: '2022',
  },
  {
    title: 'Ultimate Net Worth Guide',
    description: `Comprehensive financial planning framework with risk analysis, asset allocation strategies, and portfolio optimization tools designed for high-net-worth individuals and financial professionals.`,
    imgSrc: '/static/images/unwg.png',
    href: 'https://arjunrao87.gumroad.com/l/ultimate-net-worth-guide',
    technologies: ['Financial Modeling', 'Notion', 'Data Analysis'],
    category: 'Financial Planning',
    status: 'Live',
    metrics: 'Non-zero downloads',
    year: '2021',
  },
  {
    title: 'The One',
    description: `Curated recommendation engine that eliminates choice paralysis by providing single, highly-vetted recommendations across categories, leveraging algorithmic filtering and expert curation.`,
    imgSrc: '/static/images/one.jpg',
    href: 'https://www.producthunt.com/products/the-one#the-one',
    technologies: ['React', 'Firebase', 'Machine Learning'],
    category: 'Consumer App',
    status: 'Inactive',
    metrics: 'Featured on Product Hunt',
    year: '2020',
  },
  {
    title: 'Random Cat GIF Extension',
    description: `Chrome extension with caching and performance optimizations, delivering much-needed cat experiences to users. Scaled to handle high user engagement with efficient API management and offline functionality.`,
    imgSrc: '/static/images/cat.webp',
    href: 'https://chrome-stats.com/d/mgoklnodackhcoapoigopplnapkhbdaa',
    technologies: ['JavaScript', 'Chrome APIs', 'WebExtensions'],
    category: 'Browser Extension',
    status: 'Inactive',
    metrics: '1000+ Weekly Active Users',
    year: '2019',
  },
  {
    title: 'Kubeless OSS Contribution',
    description: `Contributed to Kubernetes-native serverless framework, implementing critical performance optimizations and developer experience improvements for container orchestration and function deployment.`,
    imgSrc: '/static/images/kubeless.png',
    href: 'https://youtu.be/8P-aXKylCVs?list=PLj6h78yzYM2P-3-xqvmWaZbbI1sW-ulZb&t=2150',
    technologies: ['Kubernetes', 'Go', 'Docker', 'Serverless'],
    category: 'Open Source',
    status: 'Open Source',
    metrics: 'KubeCon presentation',
    year: '2018',
  },
]

export default projectsData
