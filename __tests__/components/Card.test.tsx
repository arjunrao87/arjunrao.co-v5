import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../src/test/test-utils'
import { axe } from 'jest-axe'
import Card from '../../components/Card'

// Mock child components
vi.mock('../../components/Image', () => ({
  default: ({ src, alt, className, ...props }: any) => (
    <img src={src} alt={alt} className={className} {...props} />
  )
}))

vi.mock('../../components/Link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  )
}))

describe('Card', () => {
  const mockProps = {
    title: 'Test Card Title',
    description: 'This is a test card description that explains what the card is about.',
    imgSrc: '/static/images/test-image.jpg',
    href: '/test-link'
  }

  it('renders card with all props', () => {
    render(<Card {...mockProps} />)
    
    // Check title
    const title = screen.getByRole('heading', { name: /test card title/i })
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H2')
    
    // Check description
    const description = screen.getByText(/this is a test card description/i)
    expect(description).toBeInTheDocument()
    
    // Check image
    const image = screen.getByRole('img', { name: /test card title/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/static/images/test-image.jpg')
    
    // Check "Learn more" link (by text content)
    const learnMoreLink = screen.getByText('Learn more').closest('a')
    expect(learnMoreLink).toBeInTheDocument()
    expect(learnMoreLink).toHaveAttribute('href', '/test-link')
  })

  it('renders card without image when imgSrc is not provided', () => {
    const propsWithoutImage = {
      ...mockProps,
      imgSrc: undefined
    }
    
    render(<Card {...propsWithoutImage} />)
    
    // Title and description should still be there
    expect(screen.getByText('Test Card Title')).toBeInTheDocument()
    expect(screen.getByText(/this is a test card description/i)).toBeInTheDocument()
    
    // Image should not be rendered
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    
    // Learn more link should still be there
    const learnMoreLink = screen.getByText('Learn more').closest('a')
    expect(learnMoreLink).toBeInTheDocument()
  })

  it('renders card without href when not provided', () => {
    const propsWithoutHref = {
      ...mockProps,
      href: undefined
    }
    
    render(<Card {...propsWithoutHref} />)
    
    // Title should not be a link
    const title = screen.getByText('Test Card Title')
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H2')
    expect(title.closest('a')).toBeNull()
    
    // Description should be there
    expect(screen.getByText(/this is a test card description/i)).toBeInTheDocument()
    
    // Image should not be wrapped in a link
    const image = screen.getByRole('img')
    expect(image.closest('a')).toBeNull()
    
    // Learn more link should not be rendered
    expect(screen.queryByText('Learn more')).not.toBeInTheDocument()
  })

  it('renders card with image but without href', () => {
    const propsImageNoHref = {
      title: 'Image Only Card',
      description: 'Card with image but no link',
      imgSrc: '/static/images/test.jpg',
      href: undefined
    }
    
    render(<Card {...propsImageNoHref} />)
    
    // Image should be rendered but not wrapped in a link
    const image = screen.getByRole('img', { name: /image only card/i })
    expect(image).toBeInTheDocument()
    expect(image.closest('a')).toBeNull()
    
    // Title should not be a link
    const title = screen.getByText('Image Only Card')
    expect(title.closest('a')).toBeNull()
  })

  it('creates clickable title link when href is provided', () => {
    render(<Card {...mockProps} />)
    
    // Title should be wrapped in a link (find by text content)
    const titleLink = screen.getByText('Test Card Title').closest('a')
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', '/test-link')
    
    // The actual title text should be inside the link
    expect(titleLink).toHaveTextContent('Test Card Title')
  })

  it('creates clickable image link when both imgSrc and href are provided', () => {
    render(<Card {...mockProps} />)
    
    // Image should be wrapped in a link (there will be multiple links with same aria-label)
    const imageLinks = screen.getAllByRole('link', { name: /link to test card title/i })
    const imageLink = imageLinks.find(link => link.querySelector('img'))
    
    expect(imageLink).toBeInTheDocument()
    expect(imageLink).toHaveAttribute('href', '/test-link')
    
    const image = imageLink?.querySelector('img')
    expect(image).toBeInTheDocument()
  })

  it('renders Learn more link with arrow icon', () => {
    render(<Card {...mockProps} />)
    
    const learnMoreLink = screen.getByText('Learn more').closest('a')
    expect(learnMoreLink).toBeInTheDocument()
    expect(learnMoreLink).toHaveTextContent('Learn more')
    
    // Check for arrow SVG icon
    const svg = learnMoreLink?.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    
    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('d', 'M9 5l7 7-7 7')
  })

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<Card {...mockProps} />)
    
    // Find the outer wrapper div with the expected classes
    const outerDiv = container.querySelector('.md')
    expect(outerDiv).toBeInTheDocument()
    expect(outerDiv).toHaveClass('md', 'max-w-[544px]', 'p-4', 'md:w-1/2')
    
    // Inner card classes
    const cardDiv = container.querySelector('.group')
    expect(cardDiv).toBeInTheDocument()
    expect(cardDiv).toHaveClass(
      'h-full',
      'group',
      'relative',
      'overflow-hidden',
      'rounded-xl',
      'bg-gradient-card',
      'shadow-card',
      'backdrop-blur-sm',
      'transition-all',
      'duration-300'
    )
  })

  it('applies hover and focus classes correctly', () => {
    const { container } = render(<Card {...mockProps} />)
    
    const cardDiv = container.querySelector('.group')
    expect(cardDiv).toHaveClass(
      'focus-within:shadow-card-focus',
      'hover:-translate-y-1',
      'hover:shadow-card-hover'
    )
  })

  it('applies dark mode classes', () => {
    const { container } = render(<Card {...mockProps} />)
    
    const cardDiv = container.querySelector('.group')
    expect(cardDiv).toHaveClass('dark:bg-gradient-card-dark', 'dark:shadow-slate-900/20')
  })

  it('applies correct image dimensions and classes', () => {
    render(<Card {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('width', '544')
    expect(image).toHaveAttribute('height', '306')
    expect(image).toHaveClass(
      'object-cover',
      'object-center',
      'transition-transform',
      'duration-300',
      'group-hover:scale-105',
      'md:h-36',
      'lg:h-48'
    )
  })

  it('has proper semantic structure', () => {
    render(<Card {...mockProps} />)
    
    // Should have a heading
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    
    // Should have proper paragraph for description
    const description = screen.getByText(/this is a test card description/i)
    expect(description.tagName).toBe('P')
    expect(description).toHaveClass('prose', 'prose-stone')
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<Card {...mockProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have accessibility violations without image', async () => {
    const propsWithoutImage = { ...mockProps, imgSrc: undefined }
    const { container } = render(<Card {...propsWithoutImage} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have accessibility violations without href', async () => {
    const propsWithoutHref = { ...mockProps, href: undefined }
    const { container } = render(<Card {...propsWithoutHref} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles missing props gracefully', () => {
    // Test with minimal props
    render(<Card title="Minimal Card" description="Basic description" />)
    
    expect(screen.getByText('Minimal Card')).toBeInTheDocument()
    expect(screen.getByText('Basic description')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders multiple cards with different content', () => {
    const card1Props = {
      title: 'First Card',
      description: 'First description',
      imgSrc: '/image1.jpg',
      href: '/link1'
    }
    
    const card2Props = {
      title: 'Second Card',
      description: 'Second description',
      imgSrc: '/image2.jpg',
      href: '/link2'
    }
    
    const { rerender } = render(<Card {...card1Props} />)
    expect(screen.getByText('First Card')).toBeInTheDocument()
    
    rerender(<Card {...card2Props} />)
    expect(screen.getByText('Second Card')).toBeInTheDocument()
  })
})