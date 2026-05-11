import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPKR, type Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 border border-border/50">
      <Link to="/product/$id" params={{ id: product.id }} className="block aspect-square overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" width={800} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </Link>
      <div className="p-4 sm:p-5">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-display text-lg font-semibold mb-1 hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground capitalize mb-3">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{formatPKR(product.price)}</span>
          <button
            onClick={(e) => { e.preventDefault(); add(product); toast.success(`${product.name} added to cart`); }}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
