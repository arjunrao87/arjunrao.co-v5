import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from '@/.content-collections/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Technical Writings by Arjun Rao',
  description:
    'Engineering leadership insights, technical strategy, and software development best practices by Arjun Rao, Senior Director of Engineering at StubHub. Learn from real-world experience in scaling teams and technology.',
})

export default function PostPage() {
  const posts = allCoreContent(sortPosts(allPosts))

  return <ListLayout posts={posts} initialDisplayPosts={posts} title="Writings" />
}
