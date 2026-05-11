import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Sweet Bites" },
    { name: "description", content: "About Sweet Bites — Karachi's beloved bakery." },
  ]}),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-14 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Sweet Bites started as a small home kitchen in Karachi with one mission — bake the kind of cakes
          we'd want to share with our own family. Today, we deliver hundreds of cakes, donuts and pastries
          across the city, but we've kept that same homemade love in every bite.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Every order is freshly baked the same day. We use premium ingredients — real butter, fresh cream,
          imported chocolate and seasonal fruits — to create treats that look as beautiful as they taste.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {[
            { n: "1000+", l: "Happy Customers" },
            { n: "50+", l: "Cake Designs" },
            { n: "Daily", l: "Fresh Bakes" },
          ].map((s) => (
            <div key={s.l} className="bg-card rounded-2xl p-5 text-center border border-border/50 shadow-card">
              <div className="font-display text-3xl font-bold text-primary">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
