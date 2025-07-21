import Image from './Image'
import Link from './Link'

interface ProjectCardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  technologies?: string[]
  category?: string
  status?: string
  metrics?: string
  year?: string
}

const ProjectCard = ({
  title,
  description,
  imgSrc,
  href,
  technologies = [],
  category,
  status,
  metrics,
  year,
}: ProjectCardProps) => (
  <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
    {imgSrc && (
      <div className="relative aspect-video overflow-hidden">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={400}
              height={225}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={400}
            height={225}
          />
        )}
        {status && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              {status}
            </span>
          </div>
        )}
      </div>
    )}

    <div className="p-6">
      <div className="mb-2 flex items-center justify-between">
        {category && (
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {category}
          </span>
        )}
        {year && <span className="text-xs text-gray-500 dark:text-gray-400">{year}</span>}
      </div>

      <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">
        {href ? (
          <Link
            href={href}
            aria-label={`Link to ${title}`}
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>

      <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>

      {metrics && (
        <div className="mb-4 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Impact: <span className="text-primary-600 dark:text-primary-400">{metrics}</span>
          </p>
        </div>
      )}

      {technologies.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {href && (
        <Link
          href={href}
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          aria-label={`Learn more about ${title}`}
        >
          View Project
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  </div>
)

export default ProjectCard
