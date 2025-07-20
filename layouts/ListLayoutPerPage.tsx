/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'
import Link from '@/components/Link'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Post>[]
  title: string
  initialDisplayPosts?: CoreContent<Post>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutPerPage({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex sm:space-x-24">
          <div className="mx-auto px-6 text-center ">
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary } = post
                return (
                  <li key={path} className="py-5">
                    <article className="mx-auto ">
                      <div className="space-y-3 ">
                        <div>
                          <h2 className="text-2xl leading-8 tracking-tight ">
                            <Link href={`/${path}`} className="text-gray-900 transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400">
                              {title}
                            </Link>
                          </h2>
                        </div>
                        <div className="prose prose-stone max-w-none dark:prose-invert">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
