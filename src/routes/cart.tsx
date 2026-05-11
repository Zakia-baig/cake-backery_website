import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/products";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Sweet Bites" }] }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const delivery = subtotal === 0 ? 0 : subtotal >= 2000 ? 0 : 200;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="font-display text-3xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any treats yet.</p>
          <Link to="/shop" className="inline-flex px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:opacity-90">Browse Shop</Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl font-bold mb-6">Your Cart</h1>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-card rounded-2xl p-4 flex gap-4 items-center border border-border/50 shadow-card">
                <img src={item.product.image} alt={item.product.name} loading="lazy" width={120} height={120} className="h-20 w-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.product.name}</h3>
                  <p className="text-sm text-primary font-bold">{formatPKR(item.product.price)}</p>
                </div>
                <div className="inline-flex items-center border border-border rounded-full">
                  <button onClick={() => setQty(item.product.id, item.quantity - 1)} className="h-9 w-9 flex items-center justify-center hover:bg-secondary rounded-l-full"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button onClick={() => setQty(item.product.id, item.quantity + 1)} className="h-9 w-9 flex items-center justify-center hover:bg-secondary rounded-r-full"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button onClick={() => remove(item.product.id)} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 h-fit bg-card rounded-2xl p-6 border border-border/50 shadow-card">
          <h2 className="font-display text-2xl font-bold mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <Row label="Subtotal" value={formatPKR(subtotal)} />
            <Row label="Delivery (Karachi)" value={delivery === 0 ? "Free" : formatPKR(delivery)} />
            {subtotal < 2000 && <p className="text-xs text-muted-foreground">Add {formatPKR(2000 - subtotal)} more for free delivery.</p>}
            <div className="h-px bg-border my-2" />
            <Row label="Total" value={formatPKR(total)} bold />
          </div>
          <Link to="/checkout" className="mt-6 w-full inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:opacity-90">
            Checkout
          </Link>
        </aside>
      </section>
    </Layout>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-bold" : "text-muted-foreground"}`}>
      <span>{label}</span><span className={bold ? "text-foreground" : ""}>{value}</span>
    </div>
  );
}
