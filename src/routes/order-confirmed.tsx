import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPKR } from "@/lib/products";
import { z } from "zod";

interface Order {
  orderNumber: string; name: string; phone: string; address: string; area: string;
  payment: string; total: number; subtotal: number; delivery: number;
  items: { id: string; name: string; qty: number; price: number }[];
}

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({ meta: [{ title: "Order Confirmed — Sweet Bites" }] }),
  component: Confirmed,
});

function Confirmed() {
  const { id } = Route.useSearch();
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("sb-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-soft text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-1">Thank you for choosing Sweet Bites 💕</p>
          {id && <p className="text-sm font-semibold mb-6">Order # {id}</p>}

          {order && (
            <div className="text-left bg-secondary/40 rounded-2xl p-5 mb-6">
              <h2 className="font-semibold mb-3">Delivery to</h2>
              <p className="text-sm">{order.name} · {order.phone}</p>
              <p className="text-sm text-muted-foreground">{order.address}, {order.area}, Karachi</p>
              <div className="h-px bg-border my-4" />
              <h2 className="font-semibold mb-3">Items</h2>
              <ul className="space-y-1 text-sm">
                {order.items.map((i) => (
                  <li key={i.id} className="flex justify-between">
                    <span>{i.qty} × {i.name}</span><span>{formatPKR(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="h-px bg-border my-4" />
              <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{formatPKR(order.subtotal)}</span></div>
              <div className="flex justify-between text-sm text-muted-foreground"><span>Delivery</span><span>{order.delivery === 0 ? "Free" : formatPKR(order.delivery)}</span></div>
              <div className="flex justify-between font-bold mt-2"><span>Total</span><span>{formatPKR(order.total)}</span></div>
              <p className="text-xs text-muted-foreground mt-3 capitalize">Payment: {order.payment === "cod" ? "Cash on Delivery" : order.payment}</p>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-6">We'll call you shortly to confirm your order.</p>
          <Link to="/shop" className="inline-flex px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:opacity-90">Continue Shopping</Link>
        </div>
      </section>
    </Layout>
  );
}
