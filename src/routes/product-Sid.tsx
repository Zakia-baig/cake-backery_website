import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { products, formatPKR } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product-Sid")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.product.name ?? "Product"} — Sweet Bites` },
    { name: "description", content: loaderData?.product.description ?? "" },
  ]}),
  notFoundComponent: () => (
    <Layout><div className="container mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold mb-2">Product not found</h1>
      <Link to="/shop" className="text-primary hover:underline">Back to shop</Link>
    </div></Layout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    add(product, qty);
    toast.success(`${qty} × ${product.name} added to cart`, {
      action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
    });
    setQty(1);
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden bg-muted shadow-soft">
          <img src={product.image} alt={product.name} width={800} height={800} className="w-full aspect-square object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-primary mb-6">{formatPKR(product.price)}</p>
          <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center border border-border rounded-full">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 flex items-center justify-center hover:bg-secondary rounded-l-full"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} className="h-10 w-10 flex items-center justify-center hover:bg-secondary rounded-r-full"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:opacity-90"
            >
              <ShoppingBag className="h-5 w-5" /> Add {qty > 1 ? `${qty} ` : ""}to Cart
            </button>
          </div>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary">← Back to shop</Link>
        </div>
      </section>
    </Layout>
  );
}
