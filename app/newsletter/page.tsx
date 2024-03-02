import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import Script from 'next/script'

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
      {/* <Script
        data-goatcounter="https://arjunraov5.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></Script> */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="prose prose-stone text-3xl leading-9 tracking-tight dark:prose-invert sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Newsletter
          </h1>
        </div>
        <div className="container py-12">
          <iframe
            src="https://embeds.beehiiv.com/0c54be49-aef8-4e1c-ae3d-d4c880d52aa4"
            data-test-id="beehiiv-embed"
            width="100%"
            height="320"
            frameBorder="0"
            scrolling="no"
            // style="border-radius: 4px; border: 2px solid #e5e7eb; margin: 0; background-color: transparent;"
            style={{
              margin: '0',
              borderRadius: '0px',
              backgroundColor: 'transparent',
            }}
          ></iframe>
        </div>
      </div>
    </>
  )
}
