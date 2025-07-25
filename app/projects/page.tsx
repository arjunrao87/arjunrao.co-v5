import projectsData from '@/data/projectsData'
import ProjectCard from '@/components/ProjectCard'
import { genPageMetadata } from 'app/seo'
import Script from 'next/script'

export const metadata = genPageMetadata({
  title: 'Engineering Projects by Arjun Rao',
  description:
    'Technical projects and engineering achievements by Arjun Rao, showcasing expertise in software architecture, team leadership, and innovative technology solutions. Professional and personal projects spanning fintech, adtech, and ticketing platforms.',
})

export default function Projects() {
  return (
    <>
      <Script
        data-goatcounter="https://arjunraov5.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></Script>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="container py-12">
          <div className="mx-auto grid max-w-sm gap-8 sm:max-w-none sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
                technologies={project.technologies}
                category={project.category}
                status={project.status}
                metrics={project.metrics}
                year={project.year}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
