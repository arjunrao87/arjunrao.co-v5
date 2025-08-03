import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../src/test/test-utils'
import { axe } from 'jest-axe'
import LayoutWrapper from '../../components/LayoutWrapper'

// Mock child components
vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">Header Component</div>
}))

vi.mock('../../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer Component</div>
}))

vi.mock('../../components/SectionContainer', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section-container">{children}</div>
  )
}))

// Mock Next.js font
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font-class'
  })
}))

describe('LayoutWrapper', () => {
  it('renders children content', () => {
    render(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders Header component', () => {
    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    )
    
    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Header Component')
  })

  it('renders Footer component', () => {
    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    )
    
    const footer = screen.getByTestId('footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveTextContent('Footer Component')
  })

  it('wraps content in SectionContainer', () => {
    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    )
    
    const sectionContainer = screen.getByTestId('section-container')
    expect(sectionContainer).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    )
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveTextContent('Content')
  })

  it('applies correct CSS classes for layout', () => {
    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    )
    
    // Find the div with flex layout classes
    const layoutDiv = screen.getByTestId('section-container').firstChild
    expect(layoutDiv).toHaveClass(
      'inter-font-class',
      'flex',
      'h-screen',
      'flex-col',
      'justify-between',
      'font-sans'
    )
  })

  it('applies Inter font class', () => {
    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    )
    
    const layoutDiv = screen.getByTestId('section-container').firstChild
    expect(layoutDiv).toHaveClass('inter-font-class')
  })

  it('applies margin bottom auto to main element', () => {
    render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    )
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('mb-auto')
  })

  it('maintains proper component order', () => {
    render(
      <LayoutWrapper>
        <div>Main Content</div>
      </LayoutWrapper>
    )
    
    const sectionContainer = screen.getByTestId('section-container')
    const children = Array.from(sectionContainer.firstChild?.childNodes || [])
    
    // Should have header, main, footer in that order
    expect(children).toHaveLength(3)
    
    // Header should come first
    expect(children[0]).toHaveTextContent('Header Component')
    
    // Main should be in the middle
    const mainElement = children.find(child => 
      (child as Element).tagName === 'MAIN'
    ) as Element
    expect(mainElement).toHaveTextContent('Main Content')
    
    // Footer should come last
    expect(children[2]).toHaveTextContent('Footer Component')
  })

  it('handles multiple child elements', () => {
    render(
      <LayoutWrapper>
        <div>First Child</div>
        <div>Second Child</div>
        <p>Third Child</p>
      </LayoutWrapper>
    )
    
    const main = screen.getByRole('main')
    expect(main).toHaveTextContent('First Child')
    expect(main).toHaveTextContent('Second Child')
    expect(main).toHaveTextContent('Third Child')
  })

  it('handles complex nested content', () => {
    render(
      <LayoutWrapper>
        <article>
          <h1>Article Title</h1>
          <p>Article content goes here.</p>
          <section>
            <h2>Section Title</h2>
            <p>Section content.</p>
          </section>
        </article>
      </LayoutWrapper>
    )
    
    const main = screen.getByRole('main')
    const article = screen.getByRole('article')
    
    expect(main).toContainElement(article)
    expect(screen.getByRole('heading', { level: 1, name: /article title/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /section title/i })).toBeInTheDocument()
    expect(screen.getByText('Article content goes here.')).toBeInTheDocument()
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(
      <LayoutWrapper>
        <h1>Page Title</h1>
        <p>Page content</p>
      </LayoutWrapper>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('maintains responsive layout structure', () => {
    render(
      <LayoutWrapper>
        <div>Responsive Content</div>
      </LayoutWrapper>
    )
    
    // The flex layout should handle different screen sizes
    const layoutDiv = screen.getByTestId('section-container').firstChild
    expect(layoutDiv).toHaveClass('flex', 'flex-col', 'h-screen')
  })

  it('ensures content area takes available space', () => {
    render(
      <LayoutWrapper>
        <div>Expandable Content</div>
      </LayoutWrapper>
    )
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('mb-auto')
    
    // Parent should use justify-between to push footer to bottom
    const layoutDiv = screen.getByTestId('section-container').firstChild
    expect(layoutDiv).toHaveClass('justify-between')
  })

  it('handles empty children gracefully', () => {
    render(<LayoutWrapper>{null}</LayoutWrapper>)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toBeEmptyDOMElement()
    
    // Header and footer should still be present
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('handles string children', () => {
    render(<LayoutWrapper>Simple text content</LayoutWrapper>)
    
    const main = screen.getByRole('main')
    expect(main).toHaveTextContent('Simple text content')
  })

  it('integrates properly with theme system', () => {
    render(
      <LayoutWrapper>
        <div>Themed Content</div>
      </LayoutWrapper>
    )
    
    // Layout should not interfere with theme classes applied by parent providers
    const layoutDiv = screen.getByTestId('section-container').firstChild
    expect(layoutDiv).toHaveClass('font-sans') // Should use system font stack
  })
})