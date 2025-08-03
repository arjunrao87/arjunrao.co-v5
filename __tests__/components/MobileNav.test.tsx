import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '../../src/test/test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import MobileNav from '../../components/MobileNav'

// Mock the data file
vi.mock('@/data/headerNavLinks', () => ({
  default: [
    { href: '/', title: 'Home' },
    { href: '/posts', title: 'Writings' },
    { href: '/projects', title: 'Projects' },
  ]
}))

// Mock child components
vi.mock('../../components/ModeToggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>
}))

describe('MobileNav', () => {
  let originalBodyStyle: string

  beforeEach(() => {
    // Store original body style
    originalBodyStyle = document.body.style.overflow
  })

  afterEach(() => {
    // Restore original body style
    document.body.style.overflow = originalBodyStyle
    vi.clearAllMocks()
  })

  it('renders mobile menu trigger button', () => {
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveClass('sm:hidden') // Only visible on mobile
    
    // Check for hamburger icon
    const svg = menuButton.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('h-8', 'w-8')
  })

  it('opens mobile menu when trigger button is clicked', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    // Menu should be visible
    const menu = screen.getByRole('navigation')
    expect(menu).toBeInTheDocument()
    
    // Check for menu header
    const menuTitle = screen.getByText('arjunrao.co')
    expect(menuTitle).toBeInTheDocument()
  })

  it('prevents body scrolling when menu is open', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scrolling when menu is closed', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    
    // Open menu
    await user.click(menuButton)
    expect(document.body.style.overflow).toBe('hidden')
    
    // Close menu with close button
    const closeButton = screen.getAllByRole('button', { name: /toggle menu/i })[1] // Second button is close
    await user.click(closeButton)
    
    expect(document.body.style.overflow).toBe('auto')
  })

  it('displays all navigation links with correct emojis', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    // Check for all navigation links
    const homeLink = screen.getByRole('link', { name: /🏠 home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    
    const writingsLink = screen.getByRole('link', { name: /✍️ writings/i })
    expect(writingsLink).toBeInTheDocument()
    expect(writingsLink).toHaveAttribute('href', '/posts')
    
    const projectsLink = screen.getByRole('link', { name: /🚀 projects/i })
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/projects')
  })

  it('closes menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    // Click on a navigation link
    const homeLink = screen.getByRole('link', { name: /🏠 home/i })
    await user.click(homeLink)
    
    // Menu should close (menu overlay should be hidden)
    await waitFor(() => {
      const menuOverlay = document.querySelector('.fixed.right-0.top-0')
      expect(menuOverlay).toHaveClass('translate-x-full', 'opacity-0')
    })
    
    expect(document.body.style.overflow).toBe('auto')
  })

  it('closes menu when overlay is clicked', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    // Click on overlay
    const overlay = screen.getByRole('button', { name: /close menu/i })
    await user.click(overlay)
    
    await waitFor(() => {
      const menuOverlay = document.querySelector('.fixed.right-0.top-0')
      expect(menuOverlay).toHaveClass('translate-x-full', 'opacity-0')
    })
    
    expect(document.body.style.overflow).toBe('auto')
  })

  it('closes menu when Escape key is pressed on overlay', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    // Press Escape on overlay
    const overlay = screen.getByRole('button', { name: /close menu/i })
    overlay.focus()
    await user.keyboard('{Escape}')
    
    await waitFor(() => {
      const menuOverlay = document.querySelector('.fixed.right-0.top-0')
      expect(menuOverlay).toHaveClass('translate-x-full', 'opacity-0')
    })
    
    expect(document.body.style.overflow).toBe('auto')
  })

  it('renders mode toggle in mobile menu', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    const modeToggle = screen.getByTestId('mode-toggle')
    expect(modeToggle).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav.tagName).toBe('NAV')
  })

  it('applies correct styling classes to menu elements', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    expect(menuButton).toHaveClass('sm:hidden')
    
    await user.click(menuButton)
    
    // Check overlay classes
    const overlay = screen.getByRole('button', { name: /close menu/i })
    expect(overlay).toHaveClass(
      'fixed',
      'inset-0',
      'z-40',
      'bg-black/30',
      'backdrop-blur-sm',
      'transition-opacity',
      'duration-300'
    )
  })

  it('shows close button with correct icon in menu header', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    const closeButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const closeButton = closeButtons[1] // Second button is the close button
    
    expect(closeButton).toBeInTheDocument()
    expect(closeButton).toHaveClass('rounded-full', 'p-2')
    
    // Check for X icon
    const svg = closeButton.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('h-6', 'w-6')
  })

  it('should not have accessibility violations when closed', async () => {
    const { container } = render(<MobileNav />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have accessibility violations when opened', async () => {
    const user = userEvent.setup()
    const { container } = render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles staggered animation delays for navigation items', async () => {
    const user = userEvent.setup()
    render(<MobileNav />)
    
    const menuButtons = screen.getAllByRole('button', { name: /toggle menu/i })
    const menuButton = menuButtons.find(button => button.classList.contains('sm:hidden'))
    await user.click(menuButton)
    
    const navItems = screen.getAllByRole('link')
    navItems.forEach((item, index) => {
      const parentDiv = item.parentElement
      expect(parentDiv).toHaveClass('transform', 'transition-all', 'duration-300', 'ease-out')
    })
  })
})