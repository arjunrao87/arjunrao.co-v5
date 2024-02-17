import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="prose prose-stone text-3xl leading-9 tracking-tight dark:prose-invert sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Now
          </h1>
        </div>
        <div>
          <p>
            <h3>Books</h3>
            <ul>
              <li>The Mongol Storm</li>
            </ul>
          </p>
          <p>
            <h3>Podcasts</h3>
            <ul>
              <li>Planet Money</li>
              <li>My First Million</li>
            </ul>
          </p>
        </div>
      </div>
    </>
  )
}
