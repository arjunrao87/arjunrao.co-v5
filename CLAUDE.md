# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 personal blog/portfolio site using the App Router, TypeScript, and Tailwind CSS. The site features:
- MDX-based blog posts with Contentlayer for content management
- Dark/light theme switching
- Analytics integration (Umami, GoatCounter)
- Giscus comments system
- RSS feed generation
- SEO optimization with structured data

## Development Commands

```bash
# Development
npm run dev              # Start development server
npm run start           # Alternative dev command

# Build & Deploy
npm run build           # Build for production (includes post-build scripts)
npm run serve           # Start production server

# Code Quality
npm run lint            # Run ESLint with auto-fix
npm run analyze         # Build with bundle analyzer

# Content
# Content is automatically processed by Contentlayer during build
```

## Architecture

### Content Management
- **Contentlayer**: Processes MDX files in `data/posts/` into type-safe content
- **Posts**: Located in `data/posts/*.mdx` with frontmatter (title, date, tags, draft, summary)
- **Authors**: Located in `data/authors/*.mdx` (if needed)
- **Configuration**: `contentlayer.config.ts` defines document schemas and MDX processing

### Key Directories
- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components
- `layouts/`: Page layout components (PostLayout, ListLayout)
- `data/`: MDX content files and site configuration
- `public/static/`: Static assets (images, favicons)

### Core Components
- **Header/Navigation**: `components/Header.tsx` with mobile nav support
- **Theme System**: `app/theme-providers.tsx` with `next-themes`
- **Post Layout**: `layouts/PostLayout.tsx` handles individual post rendering
- **MDX Processing**: Custom components in `components/MDXComponents.tsx`

### Content Processing Pipeline
1. Contentlayer processes MDX files in `data/posts/`
2. Generates type-safe content with computed fields (reading time, TOC, slugs)
3. Rehype/Remark plugins handle code highlighting, math, and transformations
4. Posts are sorted and paginated automatically

### Site Configuration
- **Metadata**: `data/siteMetadata.js` contains site-wide configuration
- **Analytics**: Umami and GoatCounter configured via environment variables
- **Comments**: Giscus integration with environment-based configuration
- **Security**: CSP headers and security policies in `next.config.js`

## Working with Content

### Adding New Posts
1. Create new `.mdx` file in `data/posts/`
2. Include required frontmatter: `title`, `date`
3. Optional: `tags`, `draft`, `summary`, `images`
4. Content will be automatically processed by Contentlayer

### Modifying Layouts
- Edit `layouts/PostLayout.tsx` for individual post appearance
- Edit `layouts/ListLayout.tsx` for post listing pages
- Use `components/MDXComponents.tsx` for custom MDX component rendering

### Styling
- Tailwind CSS with custom configuration in `tailwind.config.js`
- Prose styling for blog content with `@tailwindcss/typography`
- Dark mode support with `next-themes`

## Environment Variables Required
- `NEXT_UMAMI_ID`: Umami analytics website ID
- `NEXT_PUBLIC_GISCUS_*`: Giscus comments configuration