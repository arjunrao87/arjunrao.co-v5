import ListLayout from '@/layouts/ListLayoutPerPage'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from '@/.content-collections/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Writings' })

export default function PostPage() {
  const posts = allCoreContent(sortPosts(allPosts))

  return <ListLayout posts={posts} initialDisplayPosts={posts} title="Writings" />
}
