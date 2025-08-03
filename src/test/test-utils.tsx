import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { vi } from 'vitest'

// Simple wrapper that doesn't use ThemeProvider to avoid mock conflicts
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="test-wrapper">{children}</div>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Common test data
export const mockBlogPost = {
  title: 'Test Blog Post',
  date: '2023-01-01',
  tags: ['test', 'blog'],
  summary: 'This is a test blog post summary',
  slug: 'test-blog-post',
  readingTime: { text: '5 min read', minutes: 5, time: 300000, words: 1000 },
  body: { code: 'Test content' },
}

export const mockProject = {
  title: 'Test Project',
  description: 'A test project description',
  href: 'https://example.com',
  imgSrc: '/static/images/test.png',
}

// Helper functions
export const createMockRouter = (pathname = '/') => ({
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  pathname,
})

export const axeConfig = {
  rules: {
    // Disable color-contrast rule for tests (often hard to satisfy in test environment)
    'color-contrast': { enabled: false },
  },
}
