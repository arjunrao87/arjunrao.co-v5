# arjunrao.co-v5 [![Netlify Status](https://api.netlify.com/api/v1/badges/c45b7d4b-618e-4cdc-8b61-9ee948baaae2/deploy-status)](https://app.netlify.com/sites/arjunraov5/deploys)

A Next.js 14 personal blog/portfolio site built with TypeScript, Tailwind CSS, and MDX for content management.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Yarn package manager

### Installation

1. **Install Yarn (if not already installed)**
   ```bash
   # Install Yarn globally via npm
   npm install -g yarn

   # Or install via Homebrew on macOS
   brew install yarn

   # Verify installation
   yarn --version
   ```

2. **Clone and setup the project**
   ```bash
   git clone https://github.com/arjunrao87/arjunrao.co-v5.git
   cd arjunrao.co-v5

   # Install dependencies
   yarn install

   # Start development server
   yarn dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the site.

### Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_UMAMI_ID=your_umami_website_id
NEXT_PUBLIC_GISCUS_REPO=your_github_repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=your_category
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint with auto-fix
- `yarn analyze` - Build with bundle analyzer

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
