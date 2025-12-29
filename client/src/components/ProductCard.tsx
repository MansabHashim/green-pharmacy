import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  // Format price from cents to dollars
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price / 100);

  return (
    <div className="group relative bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Area */}
      <div className="aspect-square relative bg-secondary/30 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-3 py-1">Out of Stock</Badge>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          {product.category}
        </div>
        <Link href={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
          <span className="font-display font-bold text-xl text-foreground">
            {price}
          </span>
          <Button 
            size="sm" 
            className="rounded-full w-10 h-10 p-0 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
