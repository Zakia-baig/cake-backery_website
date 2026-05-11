import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function PromoBar() {
  return (
    <div className="bg-promo text-promo-foreground text-xs sm:text-sm">
      <div className="container mx-auto px-4 py-2 text-center font-medium">
        🎉 Free Delivery in Karachi on Orders Above Rs. 2000 · Freshly Baked Everyday!
      </div>
    </div>
  );
}

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🧁</span>
          <span className="font-display text-2xl font-bold text-gradient-pink">Sweet Bites</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${path === n.to ? "text-primary" : "text-foreground"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-secondary" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={`py-3 text-sm font-medium ${path === n.to ? "text-primary" : "text-foreground"}`}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧁</span>
            <span className="font-display text-2xl font-bold text-gradient-pink">Sweet Bites</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Karachi's beloved bakery — freshly baked cakes, donuts, pastries and cupcakes delivered to your door with love.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>📍 Karachi, Pakistan</li>
            <li>📞 <a href="tel:+923332371990" className="hover:text-primary">+92 333 2371990</a></li>
            <li>💬 <a href="https://wa.me/923332371990" target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp</a></li>
            <li>✉️ <a href="mailto:kausernaheed@gmail.com" className="hover:text-primary">kausernaheed@gmail.com</a></li>
            <li>🚚 Delivery in Karachi only</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sweet Bites · Made with Zakia Baig in Karachi
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export { Button };
