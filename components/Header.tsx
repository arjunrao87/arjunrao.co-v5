'use client'

import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import { ModeToggle } from './ModeToggle'

const Header = () => {
  const pathname = usePathname()
  return (
    <header className="flex items-center justify-between border-b border-slate-200/50 py-10 dark:border-slate-700/50">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="h-6 text-2xl font-bold sm:block">{siteMetadata.headerTitle}</div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`relative hidden text-lg font-semibold text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 sm:block ${
                  isActive
                    ? 'after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-500'
                    : ''
                }`}
              >
                {link.title}
              </Link>
            )
          })}
        <div className="hidden sm:block">
          <ModeToggle />
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
