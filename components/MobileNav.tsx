'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { ModeToggle } from './ModeToggle'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {navShow && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={onToggleNav}
          onKeyDown={(e) => e.key === 'Escape' && onToggleNav()}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] transform bg-white/95 shadow-2xl backdrop-blur-md duration-300 ease-in-out dark:bg-gray-950/95 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200/50 px-6 py-6 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">arjunrao.co</h2>
              <ModeToggle />
            </div>
            <button
              className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle Menu"
              onClick={onToggleNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 text-gray-900 dark:text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-6">
              {headerNavLinks.map((link, index) => {
                const getEmoji = (title: string) => {
                  switch (title) {
                    case 'Home':
                      return '🏠'
                    case 'Writings':
                      return '✍️'
                    case 'Projects':
                      return '🚀'
                    default:
                      return '📄'
                  }
                }

                return (
                  <div
                    key={link.title}
                    className="transform transition-all duration-300 ease-out"
                    style={{
                      animationDelay: navShow ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 py-2 text-2xl font-semibold text-gray-900 transition-colors duration-200 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                      onClick={onToggleNav}
                    >
                      <span className="text-2xl">{getEmoji(link.title)}</span>
                      {link.title}
                    </Link>
                  </div>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileNav
