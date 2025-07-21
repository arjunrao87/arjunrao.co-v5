import projectsData from '@/data/projectsData'
import ProjectCard from '@/components/ProjectCard'
import { genPageMetadata } from 'app/seo'
import Script from 'next/script'

export const metadata = genPageMetadata({ title: 'Projects' })

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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
