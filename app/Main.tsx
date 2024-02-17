import Link from "next/link";
import SocialIcon from '@/components/social-icons'
import NextImage from 'next/image'

export default function Home() {
  const name = 'Arjun Rao'
  const avatar = '/static/images/arjun.webp'
  const occupation = 'VP of Engineering'
  const company = 'Place Exchange'
  const twitter = 'https://twitter.com/raoarjun'
  const linkedin = 'https://www.linkedin.com/in/arjunrao87/'
  const github = 'https://github.com/arjunrao87'
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
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
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="prose prose-stone dark:prose-invert">{occupation}</div>
            <div className="prose prose-stone dark:prose-invert">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="prose prose-stone max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            <p>Hi, I am Arjun Rao!</p>
            <ul>
              <li>VP of Engineering at <Link href="https://www.placeexchange.com/about"  rel="noopener noreferrer" target="_blank">Place Exchange</Link>, an adtech startup in New York City. Previously at BlackRock, Harris Corporation, Rutgers University.</li>
              <li> In my spare time, I mentor other Engineers and Engineering leaders.</li>
              <li>Things I like to talk about outside of work - personal finance, crypto, travel, FIRE, real estate, new startup ideas, space, whales (this kind > 🐋 🐳) and fun facts.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
