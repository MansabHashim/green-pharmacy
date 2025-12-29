import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-gradient-to-br from-secondary/50 via-background to-background">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 max-w-2xl text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                    Trusted by 10,000+ Families
                  </span>
                  <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-foreground">
                    Your Health is Our <span className="text-primary">Priority</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Get your prescriptions and wellness products delivered to your doorstep. Fast, reliable, and always caring for you.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link href="/shop">
                      <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-2 hover:bg-secondary/50">
                        Contact Pharmacist
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
                 <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative"
                 >
                   {/* Decorative circle behind image */}
                   <div className="absolute inset-0 bg-primary rounded-full opacity-10 blur-2xl transform scale-90 translate-y-4"></div>
                   
                   {/* Main Hero Image */}
                   <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50">
                      {/* doctor holding medicine bottle */}
                     <img 
                       src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop" 
                       alt="Pharmacist" 
                       className="w-full h-auto object-cover aspect-[4/3]"
                     />
                   </div>

                   {/* Floating Card 1 */}
                   <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-border/50 hidden sm:block"
                   >
                     <div className="flex items-center gap-3">
                       <div className="bg-green-100 p-2 rounded-full text-green-600">
                         <ShieldCheck className="w-6 h-6" />
                       </div>
                       <div>
                         <p className="font-bold text-sm">100% Genuine</p>
                         <p className="text-xs text-muted-foreground">Certified Products</p>
                       </div>
                     </div>
                   </motion.div>

                   {/* Floating Card 2 */}
                   <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-border/50 hidden sm:block"
                   >
                     <div className="flex items-center gap-3">
                       <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                         <Truck className="w-6 h-6" />
                       </div>
                       <div>
                         <p className="font-bold text-sm">Fast Delivery</p>
                         <p className="text-xs text-muted-foreground">Within 24 Hours</p>
                       </div>
                     </div>
                   </motion.div>
                 </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: ShieldCheck, title: "Quality Guaranteed", desc: "All products are certified and safe." },
                { icon: Truck, title: "Express Delivery", desc: "Free shipping on orders over $50." },
                { icon: Clock, title: "24/7 Support", desc: "Expert pharmacists available anytime." },
              ].map((feature, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-display text-4xl font-bold mb-4">Featured Products</h2>
                <p className="text-muted-foreground text-lg">Daily essentials for a healthier you.</p>
              </div>
              <Link href="/shop">
                <Button variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 hover:bg-primary/5">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[300px] w-full rounded-2xl" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="mt-12 text-center sm:hidden">
               <Link href="/shop">
                <Button className="w-full" variant="outline">View All Products</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
