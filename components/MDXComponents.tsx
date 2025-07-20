import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

// Wrapper component to handle HTML img attributes for MDX
const MDXImage = ({ src, alt, width, height }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <Image
    src={src || ''}
    alt={alt || ''}
    width={typeof width === 'string' ? parseInt(width, 10) : width}
    height={typeof height === 'string' ? parseInt(height, 10) : height}
  />
)

export const components: MDXComponents = {
  Image,
  img: MDXImage,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
}
