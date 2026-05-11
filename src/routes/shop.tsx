import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories, type Category } from "@/lib/products";
import { z } from "zod";

const searchSchema = z.object({
  category: z.enum(["cakes", "donuts", "pastries", "cupcakes"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({ meta: [
    { title: "Shop — Sweet Bites" },
    { name: "description", content: "Browse cakes, donuts, pastries and cupcakes." },
  ]}),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const filtered = category ? products.filter((p) => p.category === category) : products;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Our Bakery</h1>
        <p className="text-muted-foreground mb-8">Freshly baked treats, ready for delivery.</p>

        <div className="flex flex-wrap gap-2 mb-8">
          <FilterPill to={undefined} active={!category} label="All" />
          {categories.map((c) => (
            <FilterPill key={c.id} to={c.id} active={category === c.id} label={c.label} />
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Layout>
  );
}

function FilterPill({ to, active, label }: { to: Category | undefined; active: boolean; label: string }) {
  return (
    <Link
      to="/shop"
      search={to ? { category: to } : {}}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-secondary"}`}
    >{label}</Link>
  );
}
