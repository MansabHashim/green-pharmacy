import { useRoute, Link } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Check, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name} added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link href="/shop"><Button>Back to Shop</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price / 100);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image Gallery */}
            <div className="bg-secondary/30 rounded-[2.5rem] p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
               <img 
                 src={product.imageUrl} 
                 alt={product.name} 
                 className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
               />
            </div>

            {/* Details */}
            <div className="flex flex-col h-full pt-4">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 hover:bg-primary/20 text-sm px-3 py-1">
                  {product.category}
                </Badge>
                <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-6">
                  {product.inStock ? (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      <Check className="h-3 w-3 mr-1" /> In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                  <span className="text-muted-foreground text-sm">SKU: MED-{product.id.toString().padStart(4, '0')}</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-primary mb-8">{price}</div>

              <div className="prose prose-stone max-w-none text-muted-foreground mb-10 leading-relaxed">
                <p>{product.description}</p>
              </div>

              {/* Actions */}
              <div className="space-y-6 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-full bg-background">
                    <button 
                      className="px-4 py-3 hover:text-primary transition-colors disabled:opacity-50"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={!product.inStock}
                    >
                      -
                    </button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <button 
                      className="px-4 py-3 hover:text-primary transition-colors disabled:opacity-50"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!product.inStock}
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    size="lg" 
                    className="flex-1 rounded-full h-14 text-lg shadow-xl shadow-primary/20"
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-sm">Authentic Product</h4>
                      <p className="text-xs text-muted-foreground">100% Genuine guaranteed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold text-sm">Fast Delivery</h4>
                      <p className="text-xs text-muted-foreground">Ships within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
