import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../src/test/test-utils'
import { axe } from 'jest-axe'
import ProjectCard from '../../components/ProjectCard'

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

describe('ProjectCard', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'This is a comprehensive test project that demonstrates various features.',
    imgSrc: '/static/images/test-project.jpg',
    href: 'https://example.com/project',
    technologies: ['React', 'TypeScript', 'Next.js'],
    category: 'Web Application',
    status: 'Active',
    metrics: '50K+ users, 99.9% uptime',
    year: '2023'
  }

  it('renders project card with all props', () => {
    render(<ProjectCard {...mockProps} />)
    
    // Check title
    const title = screen.getByRole('heading', { name: /test project/i })
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H3')
    
    // Check description
    const description = screen.getByText(/this is a comprehensive test project/i)
    expect(description).toBeInTheDocument()
    
    // Check image
    const image = screen.getByRole('img', { name: /test project/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/static/images/test-project.jpg')
    
    // Check category (rendered as "Web Application" but styled with uppercase CSS)
    const category = screen.getByText('Web Application')
    expect(category).toBeInTheDocument()
    expect(category).toHaveClass('uppercase')
    
    // Check year
    const year = screen.getByText('2023')
    expect(year).toBeInTheDocument()
    
    // Check status badge
    const status = screen.getByText('Active')
    expect(status).toBeInTheDocument()
    
    // Check metrics
    const metrics = screen.getByText(/50K\+ users, 99\.9% uptime/i)
    expect(metrics).toBeInTheDocument()
    
    // Check technologies
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    
    // Check "View Project" link
    const viewProjectLink = screen.getByRole('link', { name: /learn more about test project/i })
    expect(viewProjectLink).toBeInTheDocument()
    expect(viewProjectLink).toHaveAttribute('href', 'https://example.com/project')
    expect(viewProjectLink).toHaveTextContent('View Project')
  })

  it('renders minimal project card with only required props', () => {
    const minimalProps = {
      title: 'Minimal Project',
      description: 'Basic project description'
    }
    
    render(<ProjectCard {...minimalProps} />)
    
    expect(screen.getByText('Minimal Project')).toBeInTheDocument()
    expect(screen.getByText('Basic project description')).toBeInTheDocument()
    
    // Optional elements should not be present
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryByText(/web application/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/active/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/impact/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders project without image when imgSrc is not provided', () => {
    const propsWithoutImage = {
      ...mockProps,
      imgSrc: undefined
    }
    
    render(<ProjectCard {...propsWithoutImage} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    
    // Status badge should not be rendered without image container
    expect(screen.queryByText('Active')).not.toBeInTheDocument()
  })

  it('renders project without link when href is not provided', () => {
    const propsWithoutHref = {
      ...mockProps,
      href: undefined
    }
    
    render(<ProjectCard {...propsWithoutHref} />)
    
    // Title should not be a link
    const title = screen.getByText('Test Project')
    expect(title).toBeInTheDocument()
    expect(title.closest('a')).toBeNull()
    
    // Image should not be wrapped in a link
    const image = screen.getByRole('img')
    expect(image.closest('a')).toBeNull()
    
    // View Project link should not be rendered
    expect(screen.queryByRole('link', { name: /learn more/i })).not.toBeInTheDocument()
  })

  it('renders technologies as tags', () => {
    render(<ProjectCard {...mockProps} />)
    
    const techTags = ['React', 'TypeScript', 'Next.js']
    techTags.forEach(tech => {
      const tag = screen.getByText(tech)
      expect(tag).toBeInTheDocument()
      expect(tag).toHaveClass('inline-flex', 'items-center', 'rounded-md')
    })
  })

  it('does not render technologies section when empty array', () => {
    const propsWithoutTech = {
      ...mockProps,
      technologies: []
    }
    
    render(<ProjectCard {...propsWithoutTech} />)
    
    // Technology tags should not be present
    expect(screen.queryByText('React')).not.toBeInTheDocument()
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
  })

  it('renders status badge on image when both imgSrc and status are provided', () => {
    render(<ProjectCard {...mockProps} />)
    
    const statusBadge = screen.getByText('Active')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
    
    // Status should be positioned absolute
    expect(statusBadge.parentElement).toHaveClass('absolute', 'right-3', 'top-3')
  })

  it('does not render status badge without image', () => {
    const propsNoImageWithStatus = {
      title: 'Project',
      description: 'Description',
      status: 'Active'
    }
    
    render(<ProjectCard {...propsNoImageWithStatus} />)
    
    expect(screen.queryByText('Active')).not.toBeInTheDocument()
  })

  it('renders metrics section when provided', () => {
    render(<ProjectCard {...mockProps} />)
    
    const impactLabel = screen.getByText('Impact:')
    expect(impactLabel).toBeInTheDocument()
    
    const metricsText = screen.getByText('50K+ users, 99.9% uptime')
    expect(metricsText).toBeInTheDocument()
    expect(metricsText).toHaveClass('text-primary-600', 'dark:text-primary-400')
  })

  it('creates clickable title link when href is provided', () => {
    render(<ProjectCard {...mockProps} />)
    
    const titleLinks = screen.getAllByRole('link', { name: /link to test project/i })
    const titleLink = titleLinks.find(link => link.textContent === 'Test Project')
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', 'https://example.com/project')
    expect(titleLink).toHaveTextContent('Test Project')
  })

  it('creates clickable image link when both imgSrc and href are provided', () => {
    render(<ProjectCard {...mockProps} />)
    
    const imageLinks = screen.getAllByRole('link', { name: /link to test project/i })
    const imageLink = imageLinks.find(link => link.querySelector('img'))
    
    expect(imageLink).toBeInTheDocument()
    expect(imageLink).toHaveAttribute('href', 'https://example.com/project')
  })

  it('renders View Project link with arrow icon', () => {
    render(<ProjectCard {...mockProps} />)
    
    const viewProjectLink = screen.getByRole('link', { name: /learn more about test project/i })
    expect(viewProjectLink).toBeInTheDocument()
    expect(viewProjectLink).toHaveTextContent('View Project')
    
    // Check for arrow SVG icon
    const svg = viewProjectLink.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    
    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('d', 'M9 5l7 7-7 7')
  })

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<ProjectCard {...mockProps} />)
    
    const cardDiv = container.querySelector('.group')
    expect(cardDiv).toBeInTheDocument()
    expect(cardDiv).toHaveClass(
      'group',
      'relative',
      'overflow-hidden',
      'rounded-xl',
      'bg-gradient-card',
      'shadow-card',
      'backdrop-blur-sm',
      'transition-all',
      'duration-300',
      'focus-within:shadow-card-focus',
      'hover:-translate-y-1',
      'hover:shadow-card-hover',
      'dark:bg-gradient-card-dark',
      'dark:shadow-slate-900/20'
    )
  })

  it('applies hover effects to image', () => {
    render(<ProjectCard {...mockProps} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveClass(
      'h-full',
      'w-full',
      'object-cover',
      'transition-transform',
      'duration-300',
      'group-hover:scale-105'
    )
  })

  it('renders category in uppercase', () => {
    render(<ProjectCard {...mockProps} />)
    
    const category = screen.getByText('Web Application')
    expect(category).toBeInTheDocument()
    expect(category).toHaveClass('uppercase', 'tracking-wide')
  })

  it('handles metadata display correctly', () => {
    render(<ProjectCard {...mockProps} />)
    
    // Category and year should be in the same row
    const category = screen.getByText('Web Application')
    const year = screen.getByText('2023')
    
    expect(category.parentElement).toBe(year.parentElement)
    expect(category.parentElement).toHaveClass('mb-2', 'flex', 'items-center', 'justify-between')
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<ProjectCard {...mockProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have accessibility violations without image', async () => {
    const propsWithoutImage = { ...mockProps, imgSrc: undefined }
    const { container } = render(<ProjectCard {...propsWithoutImage} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have accessibility violations without href', async () => {
    const propsWithoutHref = { ...mockProps, href: undefined }
    const { container } = render(<ProjectCard {...propsWithoutHref} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles multiple technologies correctly', () => {
    const manyTechProps = {
      ...mockProps,
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL']
    }
    
    const { container } = render(<ProjectCard {...manyTechProps} />)
    
    manyTechProps.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
    
    // Check that they're in a flex wrap container
    const techContainer = container.querySelector('.flex.flex-wrap')
    expect(techContainer).toBeInTheDocument()
    expect(techContainer).toHaveClass('flex', 'flex-wrap', 'gap-1.5')
  })

  it('handles long descriptions appropriately', () => {
    const longDescProps = {
      ...mockProps,
      description: 'This is a very long project description that should wrap appropriately and maintain readability across different screen sizes and viewport configurations.'
    }
    
    render(<ProjectCard {...longDescProps} />)
    
    const description = screen.getByText(/this is a very long project description/i)
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('leading-relaxed')
  })
})