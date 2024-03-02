import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import Script from 'next/script'
import Link from 'next/link'

export const metadata = genPageMetadata({ title: 'Projects' })
const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    child-src 'self';
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self' data:;
    frame-ancestors 'self' localhost:*;
`
export default function Projects() {
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
          <div className="prose prose-stone mx-auto px-6 pb-10 text-center dark:prose-invert">
            <div className="text-2xl ">
              <Link
                href="https://a1engineering.beehiiv.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                {' '}
                A1 Engineering
              </Link>
            </div>
            <div> Thoughts on the best of engineering delivered 1x/week</div>
          </div>
          <div className="mx-auto" style={{ width: 'fit-content' }}>
            <iframe
              src="https://embeds.beehiiv.com/0c54be49-aef8-4e1c-ae3d-d4c880d52aa4?slim=true"
              data-test-id="beehiiv-embed"
              height="120"
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
