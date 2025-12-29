import Link from 'next/link'
import SocialIcon from '@/components/social-icons'
import NextImage from 'next/image'
import { allPosts } from '@/.content-collections/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arjun Rao - Senior Director of Engineering at StubHub',
  description:
    'Arjun Rao is a Senior Director of Engineering at StubHub, leading engineering teams to create world-class event ticketing experiences. Previously SVP at Place Exchange and VP at BlackRock. Expertise in engineering leadership, technical strategy, and team building.',
}

export default async function Home() {
  const name = 'Arjun Rao'
  const avatar = '/static/images/arjun.webp'
  const occupation = 'Senior Director of Engineering'
  const company = 'StubHub'
  const location = 'Brooklyn, New York'
  const linkedin = 'https://www.linkedin.com/in/arjunrao87/'
  const github = 'https://github.com/arjunrao87'

  // Get latest blog posts
  const sortedPosts = sortPosts(allPosts)
  const posts = allCoreContent(sortedPosts)
  const latestPosts = posts.filter((post) => !post.draft).slice(0, 3)

  return (
    <>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="pt-6 sm:pt-8">
            {/* Mobile horizontal layout */}
            <div className="flex items-center gap-4 sm:hidden">
              {avatar && (
                <NextImage
                  src={avatar}
                  alt="Arjun Rao, Senior Director of Engineering at StubHub"
                  width={96}
                  height={96}
                  className="h-20 w-20 flex-shrink-0 rounded-full"
                  priority={true}
                  fetchPriority="high"
                  sizes="80px"
                />
              )}
              <div className="flex-1 space-y-1">
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                  {name}
                </h3>
                <div className="text-base font-medium text-slate-700 dark:text-slate-300">
                  {occupation}
                </div>
                <div className="text-base font-medium text-slate-700 dark:text-slate-300">
                  {company}
                </div>
                <div className="text-base font-medium text-slate-600 dark:text-slate-400">
                  📍 {location}
                </div>
                <div className="flex gap-3 pt-2 text-base font-medium">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    GitHub
                  </a>
                  <span className="text-slate-400 dark:text-slate-600">•</span>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop vertical centered layout */}
            <div className="hidden sm:flex sm:flex-col sm:items-center">
              {avatar && (
                <NextImage
                  src={avatar}
                  alt="Arjun Rao, Senior Director of Engineering at StubHub"
                  width={192}
                  height={192}
                  className="h-48 w-48 rounded-full"
                  priority={true}
                  fetchPriority="high"
                  sizes="192px"
                />
              )}
              <h3 className="pb-2 pt-4 text-3xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100">
                {name}
              </h3>
              <div className="text-lg font-medium text-slate-700 dark:text-slate-300">
                {occupation}
              </div>
              <div className="text-lg font-medium text-slate-700 dark:text-slate-300">
                {company}
              </div>
              <div className="text-lg font-medium text-slate-600 dark:text-slate-400">
                📍 {location}
              </div>
              <div className="flex space-x-3 pt-6">
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
              </div>
            </div>
          </div>
          <div className="prose prose-stone max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <p className="mb-6 text-xl font-medium text-slate-900 dark:text-slate-100">
              👋 I am Arjun Rao!
            </p>
            <div className="space-y-4">
              <p className="text-lg leading-7 text-slate-700 dark:text-slate-300">
                Engineering leader obsessed with two things: building products people love and teams
                that love building them.
              </p>
              <p className="text-lg leading-7 text-slate-700 dark:text-slate-300">
                Currently at{' '}
                <a
                  href="https://www.stubhub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  StubHub
                </a>{' '}
                building the platform that powers millions of ticket purchases. Previously grew
                engineering teams at{' '}
                <a
                  href="https://broadsign.com/blog/broadsign-announces-acquisition-of-place-exchange/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Place Exchange
                </a>{' '}
                and{' '}
                <a
                  href="https://www.blackrock.com/aladdin/products/aladdin-studio#api-first-approach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  BlackRock
                </a>
                . I share lessons learned along the way.
              </p>
            </div>
            <div className="mt-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Latest Writings
                </h2>
                <Link
                  href="/posts"
                  className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  View all →
                </Link>
              </div>
              <div className="grid gap-6">
                {latestPosts.map((post) => (
                  <article key={post.slug} className="group">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readingTime.text}</span>
                      </div>
                      <h3 className="text-lg font-semibold leading-6">
                        <Link
                          href={`/${post.path}`}
                          className="text-slate-900 transition-colors group-hover:text-primary-600 dark:text-slate-100 dark:group-hover:text-primary-400"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.summary && (
                        <p className="leading-6 text-slate-600 dark:text-slate-300">
                          {post.summary}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
