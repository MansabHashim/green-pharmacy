import { HeartPulse, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-secondary/50 pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <HeartPulse className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Medi<span className="text-primary">Care</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Trusted healthcare products delivered to your doorstep. We prioritize your well-being with quality medicines and expert care.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><Link href="/shop?category=Medicine" className="text-muted-foreground hover:text-primary transition-colors">Medicine</Link></li>
              <li><Link href="/shop?category=Vitamins" className="text-muted-foreground hover:text-primary transition-colors">Vitamins</Link></li>
              <li><Link href="/shop?category=First Aid" className="text-muted-foreground hover:text-primary transition-colors">First Aid</Link></li>
              <li><Link href="/shop?category=Skincare" className="text-muted-foreground hover:text-primary transition-colors">Skincare</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>123 Health Avenue, Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@medicare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MediCare Pharmacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
