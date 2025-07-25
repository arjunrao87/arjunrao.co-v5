import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import { allPosts } from '../.content-collections/generated/index.js'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/posts/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/posts/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.author}</author>
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/posts</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.author}</managingEditor>
      <webMaster>${config.author}</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allPosts, page = 'feed.xml') {
  const publishPosts = allPosts.filter((post) => post.draft !== true)
  // RSS for post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts))
    writeFileSync(`./public/${page}`, rss)
  }
}

const rss = () => {
  generateRSS(siteMetadata, allPosts)
  console.log('RSS feed generated...')
}
export default rss
