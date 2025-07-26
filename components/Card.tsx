import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } group relative overflow-hidden rounded-xl bg-gradient-card shadow-card backdrop-blur-sm transition-all duration-300 focus-within:shadow-card-focus hover:-translate-y-1 hover:shadow-card-hover dark:bg-gradient-card-dark dark:shadow-slate-900/20`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105 md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105 md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-slate-900 dark:text-slate-100">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose prose-stone mb-4 max-w-none leading-relaxed text-slate-600 dark:prose-invert dark:text-slate-300">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center text-base font-semibold leading-6 text-primary-600 transition-all hover:translate-x-1 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            aria-label={`Link to ${title}`}
          >
            Learn more
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
  </div>
)

export default Card
