import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../src/test/test-utils'
import { axe } from 'jest-axe'
import Footer from '../../components/Footer'

// Mock the data file
vi.mock('@/data/siteMetadata', () => ({
  default: {
    author: 'Arjun Rao'
  }
}))

describe('Footer', () => {
  it('renders the author name', () => {
    render(<Footer />)
    
    const authorText = screen.getByText('Arjun Rao')
    expect(authorText).toBeInTheDocument()
  })

  it('displays the current year in copyright', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(`© ${currentYear}`)
    expect(copyrightText).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer.tagName).toBe('FOOTER')
  })

  it('applies correct styling classes', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    const container = footer.querySelector('div')
    expect(container).toHaveClass(
      'mt-16',
      'flex',
      'flex-col',
      'items-center'
    )
    
    const textContainer = container?.querySelector('div')
    expect(textContainer).toHaveClass(
      'mb-2',
      'flex',
      'space-x-2',
      'text-sm',
      'text-gray-500',
      'dark:text-gray-400'
    )
  })

  it('displays separator between author and copyright', () => {
    render(<Footer />)
    
    const separator = screen.getByText('•')
    expect(separator).toBeInTheDocument()
  })

  it('has all required elements in correct order', () => {
    render(<Footer />)
    
    const textContainer = screen.getByRole('contentinfo').querySelector('.flex.space-x-2')
    const children = Array.from(textContainer?.children || [])
    
    expect(children).toHaveLength(3)
    expect(children[0]).toHaveTextContent('Arjun Rao')
    expect(children[1]).toHaveTextContent('•')
    expect(children[2]).toHaveTextContent(`© ${new Date().getFullYear()}`)
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('displays current year in copyright (dynamic test)', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(`© ${currentYear}`)
    expect(copyrightText).toBeInTheDocument()
  })

  it('maintains consistent spacing and layout', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    const outerContainer = footer.firstChild
    expect(outerContainer).toHaveClass('mt-16', 'flex', 'flex-col', 'items-center')
    
    const innerContainer = outerContainer?.firstChild
    expect(innerContainer).toHaveClass('mb-2', 'flex', 'space-x-2')
  })
})