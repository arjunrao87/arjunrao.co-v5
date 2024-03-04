import { genPageMetadata } from 'app/seo'
import Script from 'next/script'
import Link from 'next/link'
import NextImage from 'next/image'

export const metadata = genPageMetadata({ title: 'Newsletter' })

export default function Newsletter() {
  return (
    <>
      <Script
        data-goatcounter="https://arjunraov5.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></Script>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="prose prose-stone text-3xl leading-9 tracking-tight dark:prose-invert sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Newsletter
          </h1>
        </div>
        <div className="container items-center py-12 text-center">
          <div className="prose prose-stone mx-auto px-6 pb-12 text-center dark:prose-invert">
            <div className="flex items-center justify-center text-2xl">
              <NextImage
                src={'/static/images/sun.jpg'}
                alt="avatar"
                width={192}
                height={192}
                className="h-10 w-10 rounded-full"
                priority={true}
              />
              <Link
                href="https://a1engineering.beehiiv.com/"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-2"
              >
                A1 Engineering
              </Link>
            </div>
            <div className="mt-0"> Thoughts on the best of engineering delivered 1x/week</div>
          </div>
          <div className="mx-auto" style={{ width: 'fit-content' }}>
            <iframe
              src="https://embeds.beehiiv.com/fc827f8a-6f1f-441b-a15f-470d57921d43?slim=true"
              data-test-id="beehiiv-embed"
              height="120"
              title="newsletter"
              frameBorder="0"
              scrolling="no"
              style={{
                margin: '0 auto',
                border: '0px',
                borderRadius: '0px',
                backgroundColor: 'transparent',
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
