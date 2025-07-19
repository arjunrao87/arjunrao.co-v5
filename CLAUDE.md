# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production (includes post-build script)
- `npm run serve` - Serve production build
- `npm run lint` - Run linting with auto-fix

### Analysis
- `npm run analyze` - Build with bundle analyzer

## Architecture

This is a personal blog/website built with:
- **Next.js 14** with App Router
- **Contentlayer** for MDX content processing
- **Tailwind CSS** for styling
- **TypeScript** for type safety

### Content Management
- Blog posts are stored as `.mdx` files in `data/posts/`
- Content is processed through Contentlayer with computed fields for reading time, slugs, and table of contents
- Posts support frontmatter with title, date, tags, summary, images, and draft status

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `data/` - MDX content files and site configuration
- `layouts/` - Page layout components
- `public/static/` - Static assets including images

### Configuration Files
- `contentlayer.config.ts` - Content processing configuration with MDX plugins
- `next.config.js` - Next.js configuration with security headers and Contentlayer integration
- `data/siteMetadata.js` - Site-wide configuration including analytics and comments

### Content Processing
The site uses extensive MDX processing with:
- Remark plugins for frontmatter extraction, GFM, math, and image transformation
- Rehype plugins for syntax highlighting, table of contents, and minification
- Automatic slug generation and reading time calculation

### Styling
- Uses Tailwind CSS with custom color scheme (stone-100/stone-800 for light/dark)
- Theme switching capability with next-themes
- Mobile-responsive design

### Analytics & Comments
- Configured for Umami analytics and GoatCounter
- Giscus integration for comments on posts