# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Features
- [x] Next.js 14 with App Router
- [x] TypeScript for type safety
- [x] Tailwind CSS for styling
- [x] Responsive design
- [x] Dark mode support
- [x] SEO optimization

### Authentication
- [x] NextAuth.js integration
- [x] Email/password authentication
- [x] Protected admin routes
- [x] Session management

### Blog System
- [x] Blog post creation
- [x] Blog post editing
- [x] Blog post deletion
- [x] Markdown support
- [x] Blog post listing
- [x] Blog post detail pages
- [x] Draft/published states

### Admin Panel
- [x] Admin dashboard
- [x] Blog post management
- [x] User management
- [x] Analytics overview

### Content Management
- [x] Database integration (SQLite with Drizzle ORM)
- [x] File uploads
- [x] Image optimization
- [x] Content preview

### Pages
- [x] Home page
- [x] About page
- [x] Blog listing
- [x] Blog post detail
- [x] Admin dashboard
- [x] Login page
- [ ] Contact page
- [ ] Projects page

### Performance
- [x] Image optimization
- [x] Code splitting
- [x] Lazy loading
- [x] Caching strategies

### Development
- [x] ESLint configuration
- [x] Prettier setup
- [x] Git hooks
- [x] Development scripts

### Deployment
- [ ] Vercel deployment
- [ ] Domain configuration
- [ ] SSL setup
- [ ] Environment variables
- [ ] Database backup strategy

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. Initialize the database:
   ```bash
   npm run db:init
   # or
   yarn db:init
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
src/
├── app/                 # App router pages
├── components/          # React components
├── lib/                 # Utility functions and configurations
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [NextAuth.js](https://next-auth.js.org/)
