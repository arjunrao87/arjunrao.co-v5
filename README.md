# arjunrao.co-v5 [![Netlify Status](https://api.netlify.com/api/v1/badges/c45b7d4b-618e-4cdc-8b61-9ee948baaae2/deploy-status)](https://app.netlify.com/sites/arjunraov5/deploys)

Personal blog and website built with Next.js 14, Contentlayer, and Tailwind CSS.

## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arjunrao87/arjunrao.co-v5.git
cd arjunrao.co-v5
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```bash
# Analytics (optional)
NEXT_UMAMI_ID=your-umami-website-id

# Comments (optional) - Get from https://giscus.app/
NEXT_PUBLIC_GISCUS_REPO=your-repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=your-category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Development

### Available Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build locally
- `npm run lint` - Run ESLint with auto-fix
- `npm run analyze` - Build with bundle analyzer

### Adding Content
- Blog posts go in `data/posts/` as `.mdx` files
- Add frontmatter with title, date, summary, etc.
- Images should be placed in `public/static/images/`

### Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components  
- `data/` - MDX content and site configuration
- `layouts/` - Page layout components
- `public/static/` - Static assets

## Deployment

The site is configured for deployment on Netlify with automatic builds from the main branch.

## TODOs

- [x] Rename blog -> posts
- [x] Check search bar
- [x] Remove comments
- [x] Change light/dark theme
- [x] Delete tags
- [x] Change light/dark theme text
- [x] Change arjunrao icon
- [x] Remove search bar if not needed
- [x] Fix TOC Nav in Sober October
- [x] Replace "AuthorLayout" with just the code instead of mdx
- [x] Change H1s to H2/3
- [x] Fill out Now
- [x] Deploy to Netlify
- [x] Remove unwanted files
- [x] Fix "The One" image
- [x] Remove divider line (in posts and such)
- [x] Add umami
- [x] Fix Load Comments
- [x] Fix lighthouse issues
- [x] Cutover with arjunrao.co
- [x] Fix iphone/mobile text to be same as desktop
- [x] Put arjunrao in the post header
- [x] Center the images in the blog posts
- [x] add newsletter
- [ ] Fix first load of ModeToggle in iphone
