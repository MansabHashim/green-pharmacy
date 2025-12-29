import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type ContactInput } from "@shared/routes";
import { useSubmitContact } from "@/hooks/use-contact";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const { mutate, isPending } = useSubmitContact();

  const onSubmit = (data: ContactInput) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions about your prescription or need medical advice? 
              Our team of expert pharmacists is here to help you 24/7.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Visit Us</h4>
                        <p className="text-muted-foreground">123 Health Avenue<br />Medical District, NY 10001</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Call Us</h4>
                        <p className="text-muted-foreground">+1 (555) 123-4567<br />Mon-Fri 8am-8pm</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Email Us</h4>
                        <p className="text-muted-foreground">support@medicare.com<br />We reply within 2 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-8 rounded-2xl border border-border/50">
                  <h4 className="font-bold text-lg mb-2">Emergency?</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    For medical emergencies, please dial 911 immediately or visit the nearest emergency room.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-border/50">
                <h3 className="font-display text-2xl font-bold mb-6">Send a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-secondary/20 border-border/60 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-secondary/20 border-border/60 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px] bg-secondary/20 border-border/60 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/25"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
