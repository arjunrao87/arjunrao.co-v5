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
  const twitter = 'https://twitter.com/raoarjun'
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
          <div className="flex flex-col items-center space-x-2 pt-8">
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
            <h3 className="prose prose-stone pb-2 pt-4 text-3xl font-extrabold leading-9 tracking-tight dark:prose-invert">
              {name}
            </h3>
            <div className="prose prose-stone text-lg font-medium text-slate-700 dark:prose-invert dark:text-slate-300">
              {occupation}
            </div>
            <div className="prose prose-stone text-lg font-medium dark:prose-invert">
              <a
                href="https://www.stubhub.com/"
                target="_blank"
                className="text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {company}
              </a>
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
            </div>
          </div>
          <div className="prose prose-stone max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <p className="mb-6 text-xl font-medium text-slate-900 dark:text-slate-100">
              👋 I am Arjun Rao!
            </p>
            <div className="space-y-4">
              <p className="text-lg leading-7 text-slate-700 dark:text-slate-300">
                I lead engineering teams at StubHub responsible for creating the world's best event
                and ticket selection experience for live events!
              </p>
              <p className="text-lg leading-7 text-slate-700 dark:text-slate-300">
                Previously I was SVP of Engineering at Place Exchange and VP of Engineering at
                BlackRock.
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
