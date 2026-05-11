import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [
    { title: "Categories — Sweet Bites" },
    { name: "description", content: "Browse by cakes, donuts, pastries and cupcakes." },
  ]}),
  component: Categories,
});

function Categories() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground mb-8">Pick a category to start exploring.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <Link key={c.id} to="/shop" search={{ category: c.id }} className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all">
                <img src={c.image} alt={c.label} loading="lazy" width={800} height={1000} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="font-display text-2xl font-bold">{c.label}</div>
                  <div className="text-sm opacity-80">{count} items</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
