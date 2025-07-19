import Link from 'next/link'
import SocialIcon from '@/components/social-icons'
import NextImage from 'next/image'

export default async function Home() {
  const name = 'Arjun Rao'
  const avatar = '/static/images/arjun.webp'
  const occupation = 'Director of Engineering, Selection'
  const company = 'StubHub'
  const twitter = 'https://twitter.com/raoarjun'
  const linkedin = 'https://www.linkedin.com/in/arjunrao87/'
  const github = 'https://github.com/arjunrao87'
  return (
    <>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <NextImage
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
                priority={true}
              />
            )}
            <h3 className="prose prose-stone pb-2 pt-4 text-3xl font-extrabold leading-9 tracking-tight dark:prose-invert">
              {name}
            </h3>
            <div className="prose prose-stone text-lg font-medium text-slate-700 dark:text-slate-300 dark:prose-invert">{occupation}</div>
            <div className="prose prose-stone text-lg font-medium dark:prose-invert">
              <a href="https://www.stubhub.com/" target="_blank" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                {company}
              </a>
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
            </div>
          </div>
          <div className="prose prose-stone max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <p className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-6">👋 I am Arjun Rao!</p>
            <div className="space-y-4">
              <p className="text-lg leading-7 text-slate-700 dark:text-slate-300">
                I lead the Selection teams at StubHub that are responsible for creating the world's
                best event and ticket selection experience for live events!
              </p>
              <p className="text-lg leading-7 text-slate-700 dark:text-slate-300">
                Previously I was SVP of Engineering at Place Exchange and VP of Engineering at
                BlackRock.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
