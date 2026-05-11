import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/products";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Sweet Bites" }] }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^(\+92|0)?3\d{9}$/, "Enter a valid Pakistani mobile number"),
  address: z.string().trim().min(10, "Please enter your full address").max(300),
  area: z.string().trim().min(2, "Area is required").max(80),
  payment: z.enum(["cod", "jazzcash", "easypaisa", "card"]),
  notes: z.string().max(300).optional(),
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const delivery = subtotal >= 2000 ? 0 : 200;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-2">Nothing to checkout</h1>
          <Link to="/shop" className="text-primary hover:underline">Browse shop</Link>
        </section>
      </Layout>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      toast.error("Please fix the errors in the form");
      return;
    }
    setSubmitting(true);
    const orderNumber = "SB" + Math.floor(100000 + Math.random() * 900000);
    const order = {
      orderNumber, ...parsed.data,
      items: items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.quantity, price: i.product.price })),
      subtotal, delivery, total, createdAt: new Date().toISOString(),
    };
    try { sessionStorage.setItem("sb-last-order", JSON.stringify(order)); } catch {}
    setTimeout(() => {
      clear();
      navigate({ to: "/order-confirmed", search: { id: orderNumber } });
    }, 600);
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
          <h1 className="font-display text-4xl font-bold">Checkout</h1>

          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
            <h2 className="font-display text-xl font-semibold mb-4">Delivery Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Full Name" error={errors.name} />
              <Field name="phone" label="Phone (03XXXXXXXXX)" error={errors.phone} />
              <Field name="area" label="Area in Karachi" placeholder="e.g. DHA, Gulshan, Clifton" error={errors.area} />
              <Field name="address" label="Full Address" textarea error={errors.address} className="sm:col-span-2" />
              <Field name="notes" label="Order Notes (optional)" textarea error={errors.notes} className="sm:col-span-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-3">📍 We currently deliver only within Karachi.</p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
            <h2 className="font-display text-xl font-semibold mb-4">Payment Method</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { v: "cod", label: "Cash on Delivery", desc: "Pay when you receive your order" },
                { v: "jazzcash", label: "JazzCash", desc: "Mobile wallet" },
                { v: "easypaisa", label: "EasyPaisa", desc: "Mobile wallet" },
                { v: "card", label: "Debit / Credit Card", desc: "Visa, Mastercard" },
              ].map((p, i) => (
                <label key={p.v} className="flex items-start gap-3 p-4 rounded-xl border border-border cursor-pointer hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input type="radio" name="payment" value={p.v} defaultChecked={i === 0} className="mt-1 accent-[var(--primary)]" />
                  <div>
                    <div className="font-medium text-sm">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:opacity-90 disabled:opacity-50">
            {submitting ? "Placing order..." : `Place Order · ${formatPKR(total)}`}
          </button>
        </form>

        <aside className="lg:sticky lg:top-24 h-fit bg-card rounded-2xl p-6 border border-border/50 shadow-card">
          <h2 className="font-display text-xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between text-sm">
                <span className="truncate pr-2">{i.quantity} × {i.product.name}</span>
                <span className="font-medium">{formatPKR(i.product.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-border my-3" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatPKR(delivery)}</span></div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border"><span>Total</span><span>{formatPKR(total)}</span></div>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

function Field({ name, label, error, textarea, placeholder, className }: { name: string; label: string; error?: string; textarea?: boolean; placeholder?: string; className?: string }) {
  const cls = "w-full mt-1 rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      {textarea
        ? <textarea name={name} placeholder={placeholder} rows={3} className={cls} />
        : <input name={name} placeholder={placeholder} className={cls} />}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
