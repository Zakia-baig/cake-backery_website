# 🧁 Sweet Bites

**Sweet Bites** is Karachi's beloved online bakery — freshly baked cakes, donuts, pastries, and cupcakes, delivered to your door with love.

This is the official documentation for the Sweet Bites web application.

🌐 **Live Site:** [sweet-karachi-bites.lovable.app](https://sweet-karachi-bites.lovable.app)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Routing](#-routing)
- [Cart System](#-cart-system)
- [Products & Categories](#-products--categories)
- [Styling & Design System](#-styling--design-system)
- [Deployment](#-deployment)
- [Contact](#-contact)

---

## 🍰 Overview

Sweet Bites is a fully responsive e-commerce bakery website where customers in Karachi can:

- Browse fresh bakery products by category
- View detailed product pages
- Add items to a persistent cart
- Checkout and confirm their order
- Contact the bakery directly via phone or WhatsApp

The app is built with **TanStack Start (React 19)** and styled with **Tailwind CSS v4** + **shadcn/ui** components.

---

## ✨ Features

- 🎂 **Product Catalog** — Cakes, Donuts, Pastries, and Cupcakes
- 🔍 **Category Filtering** — Browse by product type
- 🛒 **Persistent Cart** — Items stay saved in `localStorage`
- 📦 **Quantity Selector** — Add multiple items at once
- 📱 **Fully Responsive** — Works on mobile, tablet & desktop
- ⚡ **Fast Navigation** — Route preloading on hover/intent
- 📞 **WhatsApp & Phone Integration** — Direct customer support
- 🎨 **Beautiful UI** — Pink-themed bakery design with smooth animations
- 🔍 **SEO Optimized** — Per-page meta tags, Open Graph & Twitter cards

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start v1](https://tanstack.com/start) (React 19) |
| Build Tool | [Vite 7](https://vitejs.dev) |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) + Radix UI |
| Icons | [Lucide React](https://lucide.dev) |
| State Management | React Context (Cart) |
| Notifications | [Sonner](https://sonner.emilkowal.ski) |
| Language | TypeScript (strict) |
| Deployment | Lovable Cloud (Cloudflare Workers) |

---

## 📁 Project Structure

```
src/
├── assets/                  # Product & category images
├── components/
│   ├── site/                # Layout, Navbar, Footer, ProductCard
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
├── lib/
│   ├── cart.tsx             # Cart context & provider
│   ├── products.ts          # Product catalog & types
│   └── utils.ts             # Helper utilities
├── routes/                  # File-based routes
│   ├── __root.tsx           # Root layout (HTML shell)
│   ├── index.tsx            # Home page
│   ├── shop.tsx             # All products
│   ├── categories.tsx       # Category browser
│   ├── product.$id.tsx      # Product detail page
│   ├── cart.tsx             # Shopping cart
│   ├── checkout.tsx         # Checkout form
│   ├── order-confirmed.tsx  # Order success
│   ├── about.tsx            # About page
│   └── contact.tsx          # Contact page
├── styles.css               # Tailwind + design tokens
├── router.tsx               # Router config
└── server.ts                # SSR entry
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20 or higher
- **npm** (or **bun** for faster installs)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd sweet-bites

# 2. Install dependencies
npm install
# or
bun install

# 3. Start the dev server
npm run dev
# or
bun run dev
```

Open 👉 **http://localhost:3000** in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the codebase |

---

## 🧭 Routing

Sweet Bites uses **file-based routing** via TanStack Router. Each file in `src/routes/` becomes a route:

| File | URL |
|------|-----|
| `index.tsx` | `/` |
| `shop.tsx` | `/shop` |
| `categories.tsx` | `/categories` |
| `product.$id.tsx` | `/product/:id` |
| `cart.tsx` | `/cart` |
| `checkout.tsx` | `/checkout` |
| `order-confirmed.tsx` | `/order-confirmed` |
| `about.tsx` | `/about` |
| `contact.tsx` | `/contact` |

> ⚠️ Never edit `src/routeTree.gen.ts` — it's auto-generated.

---

## 🛒 Cart System

The cart is implemented as a React Context (`src/lib/cart.tsx`) and persists in `localStorage` under the key `sweetbites-cart-v1`.

### Available Methods

```typescript
const { items, add, remove, setQty, clear, count, subtotal } = useCart();
```

| Method | Description |
|--------|-------------|
| `add(product, qty?)` | Add item to cart (default qty = 1) |
| `remove(id)` | Remove item from cart |
| `setQty(id, qty)` | Update quantity (removes if qty ≤ 0) |
| `clear()` | Empty the cart |
| `count` | Total number of items |
| `subtotal` | Cart total in PKR |

---

## 🍩 Products & Categories

All products live in `src/lib/products.ts`. Each product has:

```typescript
interface Product {
  id: string;
  name: string;
  price: number;          // in PKR
  category: Category;     // 'cakes' | 'donuts' | 'pastries' | 'cupcakes'
  image: string;
  description: string;
  featured?: boolean;
}
```

### Adding a New Product

1. Add the product image to `src/assets/`
2. Import it in `src/lib/products.ts`
3. Add a new entry to the `products` array

```typescript
import myNewCake from "@/assets/p-my-new-cake.jpg";

{
  id: "my-new-cake",
  name: "My New Cake",
  price: 2000,
  category: "cakes",
  image: myNewCake,
  description: "A delicious new creation...",
  featured: true,
}
```

---

## 🎨 Styling & Design System

The app uses **Tailwind CSS v4** with semantic design tokens defined in `src/styles.css`.

### Key Tokens

- `--background` / `--foreground` — base colors
- `--primary` (pink) — brand color
- `--secondary` / `--muted` / `--accent` — supporting tones
- `--promo` — promo bar background
- Custom utilities: `text-gradient-pink`, `shadow-card`, `shadow-soft`

> ❗ Never hardcode colors like `text-white` or `bg-pink-500`. Always use semantic tokens.

### Fonts

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

---

## 🌍 Deployment

The site is deployed on **Lovable Cloud** (powered by Cloudflare Workers).

### Publishing on Lovable

1. Open the project in [Lovable](https://lovable.dev)
2. Click **Publish** in the top-right
3. Get your free `.lovable.app` URL
4. (Optional) Connect a custom domain via **Project Settings → Domains**

### Self-Hosting

```bash
npm run build
npm run start
```

The build outputs a Cloudflare Worker bundle that can also be deployed via `wrangler`.

---

## 📞 Contact

- 📍 **Location:** Karachi, Pakistan
- 📞 **Phone:** [+92 333 2371990](tel:+923332371990)
- 💬 **WhatsApp:** [Chat with us](https://wa.me/923332371990)
- ✉️ **Email:** [kausernaheed@gmail.com](mailto:kausernaheed@gmail.com)
- 🚚 **Delivery:** Karachi only

---

## 📄 License

© 2026 Sweet Bites · Made with Zakia Baig in Karachi.

All rights reserved. This project is proprietary and intended solely for the Sweet Bites bakery brand.

