This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🎨 Design System

This project includes a comprehensive design system built with:

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for component primitives
- **CVA (Class Variance Authority)** for type-safe component variants
- **TypeScript** for type safety

### Quick Links

- 📖 [Design System Documentation](./DESIGN_SYSTEM.md) - Complete guide to tokens, conventions, and component structure
- 🏗️ [Architecture Guide](./ARCHITECTURE.md) - Feature-first architecture for Next.js App Router
- 🤝 [Contributing Guide](./CONTRIBUTING.md) - Rules and conventions for team contributions
- ✅ [Code Quality Guide](./CODE_QUALITY.md) - Code quality system and commit controls
- 🔐 [Environment Variables Setup](./ENV_SETUP.md) - Type-safe environment variable management
- ♿ [Accessibility Guide](./ACCESSIBILITY.md) - WCAG 2.1 AA compliance guidelines
- 🧩 [Component Examples](./src/components/examples/DesignSystemShowcase.tsx) - Live examples of all components

### Key Features

- ✅ **Semantic Color Tokens** - Automatic light/dark mode support
- ✅ **Typography Scale** - Consistent text sizing and spacing
- ✅ **Spacing System** - 4px base unit for consistent spacing
- ✅ **Component Variants** - Type-safe variants using CVA
- ✅ **Accessibility First** - WCAG 2.1 AA compliant
- ✅ **Type-Safe** - Full TypeScript support

### Using Components

```tsx
import { Button, Badge, Card } from "@/components/primitives"

// Button with variants
<Button variant="primary" size="md">Click me</Button>

// Badge with semantic colors
<Badge variant="success">Active</Badge>

// Card with sections
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Setup Environment Variables

```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local with your values
# See ENV_SETUP.md for detailed instructions
```

### 3. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Start Developing

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

**Important**: All environment variables are validated at startup. If any required variable is missing, you'll see a clear error message.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
