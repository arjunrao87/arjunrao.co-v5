import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll, vi, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'
import { toHaveNoViolations } from 'jest-axe'

// Extend Vitest expect with jest-axe matchers
expect.extend(toHaveNoViolations)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; [key: string]: unknown }) => {
    const { src, alt, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', { src, alt, ...rest })
  },
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: (props: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    const { children, href, ...rest } = props
    return React.createElement('a', { href, ...rest }, children)
  },
}))

// Mock theme provider
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    resolvedTheme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'theme-provider' }, children),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Suppress console warnings for tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
}
