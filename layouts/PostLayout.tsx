import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post, Author as Authors } from '@/.content-collections/generated'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTop from '@/components/ScrollTopAndComment'
import Image from 'next/image'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Post>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { date, title, images } = content
  const passedDate = new Date(date)
  const utcCurrentDate = new Date(passedDate.getTime() + passedDate.getTimezoneOffset() * 60000)
  const humanReadableDate = utcCurrentDate.toLocaleDateString(
    siteMetadata.language,
    postDateTemplate
  )

  return (
    <SectionContainer>
      <ScrollTop />
      <article>
        <div className="">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    {humanReadableDate}
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="prose text-2xl leading-9 tracking-tight dark:prose-invert sm:text-3xl sm:leading-10 md:text-3xl md:leading-14">
                  {title}
                </h1>
              </div>
            </div>
          </header>
          {images && images.length > 0 && (
            <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg">
              <Image src={images[0]} alt={title} fill className="object-cover" priority />
            </div>
          )}
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose prose-stone max-w-none pb-8 pt-10 text-justify dark:prose-invert">
                {children}
              </div>
            </div>
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && prev.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Next post: ${next.title}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
