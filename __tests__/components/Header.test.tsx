import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../src/test/test-utils'
import { axe } from 'jest-axe'

// Mock next/navigation first
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/')
}))

// Mock the data files
vi.mock('@/data/siteMetadata', () => ({
  default: {
    headerTitle: 'arjunrao',
    author: 'Arjun Rao'
  }
}))

vi.mock('@/data/headerNavLinks', () => ({
  default: [
    { href: '/', title: 'Home' },
    { href: '/posts', title: 'Writings' },
    { href: '/projects', title: 'Projects' },
  ]
}))

// Mock child components
vi.mock('../../components/MobileNav', () => ({
  default: () => <div data-testid="mobile-nav">Mobile Nav</div>
}))

vi.mock('../../components/ModeToggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>
}))

import Header from '../../components/Header'
import { usePathname } from 'next/navigation'

const mockUsePathname = vi.mocked(usePathname)

describe('Header', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders the site title with correct link', () => {
    render(<Header />)
    
    const titleLink = screen.getByRole('link', { name: /arjunrao/i })
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', '/')
    
    const title = screen.getByText('arjunrao')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('text-2xl', 'font-bold')
  })

  it('displays navigation links for desktop users', () => {
    render(<Header />)
    
    // Should show Writings and Projects (Home is filtered out)
    const writingsLink = screen.getByRole('link', { name: /writings/i })
    expect(writingsLink).toBeInTheDocument()
    expect(writingsLink).toHaveAttribute('href', '/posts')
    expect(writingsLink).toHaveClass('hidden', 'sm:block') // Hidden on mobile
    
    const projectsLink = screen.getByRole('link', { name: /projects/i })
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/projects')
    expect(projectsLink).toHaveClass('hidden', 'sm:block') // Hidden on mobile
  })

  it('highlights active page in navigation', () => {
    // Mock pathname to be /posts
    mockUsePathname.mockReturnValue('/posts')
    
    render(<Header />)
    
    const writingsLink = screen.getByRole('link', { name: /writings/i })
    expect(writingsLink.className).toMatch(/after:absolute.*after:bg-primary-500/)
  })

  it('shows theme toggle button for desktop', () => {
    render(<Header />)
    
    const modeToggle = screen.getByTestId('mode-toggle')
    expect(modeToggle).toBeInTheDocument()
    expect(modeToggle.parentElement).toHaveClass('hidden', 'sm:block')
  })

  it('renders mobile navigation component', () => {
    render(<Header />)
    
    const mobileNav = screen.getByTestId('mobile-nav')
    expect(mobileNav).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header.tagName).toBe('HEADER')
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('applies correct styling classes', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'flex',
      'items-center',
      'justify-between',
      'border-b',
      'border-slate-200/50',
      'py-10',
      'dark:border-slate-700/50'
    )
  })

  it('handles pathname matching for nested routes', () => {
    mockUsePathname.mockReturnValue('/posts/some-post')
    
    render(<Header />)
    
    const writingsLink = screen.getByRole('link', { name: /writings/i })
    expect(writingsLink.className).toMatch(/after:absolute.*after:bg-primary-500/)
  })
})