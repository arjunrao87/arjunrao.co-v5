interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Hourly',
    description: `Hourly helps you decide whether you should undertake a task on your own or outsource it to someone else.`,
    imgSrc: '/static/images/hourly.webp',
    href: 'https://usehourly.netlify.app/',
  },
  {
    title: 'Ultimate Net Worth Guide',
    description: `The Ultimate Net Worth Guide provides a framework to track your Net Worth and gives you insight into exposure to various types of risk.`,
    imgSrc: '/static/images/unwg.png',
    href: 'https://arjunrao87.gumroad.com/l/ultimate-net-worth-guide',
  },
  {
    title: 'The One',
    description: `Great recommendations, no confusion!`,
    imgSrc: '/static/images/theone.jpg',
    href: 'https://www.producthunt.com/products/the-one#the-one',
  },
  {
    title: 'Random Cat GIF',
    description: `Random Cat GIF is a Chrome extension that brings more cats into your life. It allows you to view a random cat GIF, bringing joy and happiness. Get ready to be delighted by cute and funny cat moments! [Fun fact: This app had 1000+ WAU!]`,
    imgSrc: '/static/images/cat.webp',
    href: 'https://chrome-stats.com/d/mgoklnodackhcoapoigopplnapkhbdaa',
  },
  {
    title: 'OSS Contribution: Kubeless',
    description: `kubeless is a Kubernetes-native serverless framework that lets you deploy small bits of code without having to worry about the underlying infrastructure plumbing`,
    imgSrc: '/static/images/kubeless.png',
    href: 'https://github.com/vmware-archive/kubeless',
  },
]

export default projectsData
