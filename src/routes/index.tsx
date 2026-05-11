import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories } from "@/lib/products";
import { ArrowRight, Truck, Cake, Heart } from "lucide-react";
import heroCake from "@/assets/hero-cake.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Sweet Bites — Freshly Baked Cakes in Karachi" },
    { name: "description", content: "Order cakes, donuts, pastries & cupcakes online. Same-day delivery across Karachi." },
  ]}),
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.featured);
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-5">Karachi's Favourite Bakery</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
              Delicious Cakes <br/>Made with <span className="text-gradient-pink">Love</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mb-8">
              Handcrafted cakes, donuts and pastries baked fresh every morning. Delivered across Karachi.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:opacity-90 transition-opacity">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/categories" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background font-semibold hover:bg-secondary transition-colors">
                Explore Categories
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl" />
            <img src={heroCake} alt="Pink berry cake" width={1600} height={1200} className="relative rounded-3xl shadow-soft w-full aspect-square object-cover" />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Cake, title: "Freshly Baked", text: "Made every morning, never frozen." },
          { icon: Truck, title: "Karachi Delivery", text: "Free over Rs. 2000 across the city." },
          { icon: Heart, title: "Made with Love", text: "Premium ingredients, handcrafted." },
        ].map((p) => (
          <div key={p.title} className="bg-card rounded-2xl p-5 flex items-center gap-4 border border-border/50 shadow-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><p.icon className="h-6 w-6" /></div>
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground text-sm mt-1">Find your favourite treat</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.id }} className="group relative rounded-2xl overflow-hidden aspect-square shadow-card hover:shadow-soft transition-all">
              <img src={c.image} alt={c.label} loading="lazy" width={800} height={800} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 text-white font-display text-xl font-semibold">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Treats</h2>
            <p className="text-muted-foreground text-sm mt-1">Customer favourites this week</p>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-primary hover:underline hidden sm:inline-flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-14 mt-10">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Loved by Karachi</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ayesha K.", text: "The chocolate rose cake was a showstopper at my sister's birthday. Everyone asked where it was from!" },
              { name: "Hassan R.", text: "Their donuts are the softest in Karachi. We order every weekend now." },
              { name: "Mariam S.", text: "Beautiful packaging, fresh taste, on-time delivery. Sweet Bites never disappoints." },
            ].map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <div className="text-primary mb-3">★★★★★</div>
                <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                <p className="font-semibold text-sm">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
