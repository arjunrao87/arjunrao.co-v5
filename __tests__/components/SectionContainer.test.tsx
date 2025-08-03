import { describe, it, expect } from 'vitest'
import { render, screen } from '../../src/test/test-utils'
import { axe } from 'jest-axe'
import SectionContainer from '../../components/SectionContainer'

describe('SectionContainer', () => {
  it('renders children content', () => {
    render(
      <SectionContainer>
        <div>Test Content</div>
      </SectionContainer>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    render(
      <SectionContainer>
        <div>Content</div>
      </SectionContainer>
    )
    
    // Use querySelector since section without accessible name doesn't have region role
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')
  })

  it('applies correct CSS classes for responsive layout', () => {
    render(
      <SectionContainer>
        <div>Content</div>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass(
      'mx-auto',
      'max-w-3xl',
      'overflow-x-hidden',
      'px-4',
      'sm:px-6',
      'xl:max-w-5xl',
      'xl:px-0'
    )
  })

  it('centers content with mx-auto', () => {
    render(
      <SectionContainer>
        <div>Centered Content</div>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('mx-auto')
  })

  it('applies responsive max-width classes correctly', () => {
    render(
      <SectionContainer>
        <div>Responsive Content</div>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('max-w-3xl', 'xl:max-w-5xl')
  })

  it('applies responsive padding classes correctly', () => {
    render(
      <SectionContainer>
        <div>Padded Content</div>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('px-4', 'sm:px-6', 'xl:px-0')
  })

  it('prevents horizontal overflow', () => {
    render(
      <SectionContainer>
        <div style={{ width: '9999px' }}>Very Wide Content</div>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('overflow-x-hidden')
  })

  it('handles multiple child elements', () => {
    render(
      <SectionContainer>
        <h1>Title</h1>
        <p>Paragraph</p>
        <div>Div content</div>
      </SectionContainer>
    )
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
    expect(screen.getByText('Div content')).toBeInTheDocument()
  })

  it('handles complex nested content structure', () => {
    render(
      <SectionContainer>
        <article>
          <header>
            <h1>Article Title</h1>
            <p>Subtitle</p>
          </header>
          <main>
            <section>
              <h2>Section 1</h2>
              <p>Content 1</p>
            </section>
            <section>
              <h2>Section 2</h2>
              <p>Content 2</p>
            </section>
          </main>
        </article>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    const article = screen.getByRole('article')
    
    expect(section).toContainElement(article)
    expect(screen.getByRole('heading', { level: 1, name: /article title/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /section 1/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /section 2/i })).toBeInTheDocument()
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(
      <SectionContainer>
        <h1>Page Title</h1>
        <p>Page content with proper structure.</p>
      </SectionContainer>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles empty children gracefully', () => {
    render(<SectionContainer>{null}</SectionContainer>)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toBeEmptyDOMElement()
  })

  it('handles string children', () => {
    render(<SectionContainer>Plain text content</SectionContainer>)
    
    const section = document.querySelector('section')
    expect(section).toHaveTextContent('Plain text content')
  })

  it('handles React fragments as children', () => {
    render(
      <SectionContainer>
        <>
          <h1>Fragment Title</h1>
          <p>Fragment content</p>
        </>
      </SectionContainer>
    )
    
    expect(screen.getByText('Fragment Title')).toBeInTheDocument()
    expect(screen.getByText('Fragment content')).toBeInTheDocument()
  })

  it('handles conditional rendering', () => {
    const showExtra = true
    
    render(
      <SectionContainer>
        <div>Always shown</div>
        {showExtra && <div>Conditionally shown</div>}
      </SectionContainer>
    )
    
    expect(screen.getByText('Always shown')).toBeInTheDocument()
    expect(screen.getByText('Conditionally shown')).toBeInTheDocument()
  })

  it('handles lists and arrays of elements', () => {
    const items = ['Item 1', 'Item 2', 'Item 3']
    
    render(
      <SectionContainer>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </SectionContainer>
    )
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('maintains container constraints for very wide content', () => {
    render(
      <SectionContainer>
        <pre style={{ whiteSpace: 'nowrap' }}>
          This is a very long line of code that would normally cause horizontal scrolling but should be constrained by the container
        </pre>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('overflow-x-hidden')
    expect(section).toHaveClass('max-w-3xl', 'xl:max-w-5xl')
  })

  it('provides proper responsive breakpoints', () => {
    render(
      <SectionContainer>
        <div>Responsive container content</div>
      </SectionContainer>
    )
    
    const section = document.querySelector('section')
    
    // Mobile: px-4, max-w-3xl
    expect(section).toHaveClass('px-4', 'max-w-3xl')
    
    // Small screens: sm:px-6
    expect(section).toHaveClass('sm:px-6')
    
    // Extra large screens: xl:px-0, xl:max-w-5xl
    expect(section).toHaveClass('xl:px-0', 'xl:max-w-5xl')
  })

  it('works as a wrapper for different content types', () => {
    const contentTypes = [
      { element: <div key="div">Div content</div>, text: 'Div content' },
      { element: <article key="article">Article content</article>, text: 'Article content' },
      { element: <aside key="aside">Aside content</aside>, text: 'Aside content' },
      { element: <nav key="nav">Navigation content</nav>, text: 'Navigation content' }
    ]
    
    contentTypes.forEach((content) => {
      const { unmount } = render(<SectionContainer>{content.element}</SectionContainer>)
      
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveTextContent(content.text)
      
      unmount()
    })
  })
})