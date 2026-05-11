import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Mail, MapPin, Truck, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Sweet Bites" },
    { name: "description", content: "Contact Sweet Bites bakery in Karachi." },
  ]}),
  component: Contact,
});

function Contact() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 max-w-5xl">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground mb-8">Questions, custom orders or feedback — we'd love to hear from you.</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><Phone className="h-5 w-5 text-primary mt-0.5" /><div><div className="font-medium">Phone</div><a href="tel:+923332371990" className="text-sm text-muted-foreground hover:text-primary">+92 333 2371990</a></div></li>
            <li className="flex items-start gap-3"><MessageCircle className="h-5 w-5 text-primary mt-0.5" /><div><div className="font-medium">WhatsApp</div><a href="https://wa.me/923332371990" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary">+92 333 2371990</a></div></li>
            <li className="flex items-start gap-3"><Mail className="h-5 w-5 text-primary mt-0.5" /><div><div className="font-medium">Email</div><a href="mailto:kausernaheed@gmail.com" className="text-sm text-muted-foreground hover:text-primary">kausernaheed@gmail.com</a></div></li>
            <li className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-0.5" /><div><div className="font-medium">Location</div><div className="text-sm text-muted-foreground">Karachi, Pakistan</div></div></li>
            <li className="flex items-start gap-3"><Truck className="h-5 w-5 text-primary mt-0.5" /><div><div className="font-medium">Delivery</div><div className="text-sm text-muted-foreground">Across Karachi · Free over Rs. 2000</div></div></li>
          </ul>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Thanks! We'll get back to you soon."); (e.target as HTMLFormElement).reset(); }}
          className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-4"
        >
          <Field name="name" label="Your Name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="message" label="Message" textarea required />
          <button className="w-full inline-flex justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:opacity-90">Send Message</button>
        </form>
      </section>
    </Layout>
  );
}

function Field({ name, label, type = "text", textarea, required }: { name: string; label: string; type?: string; textarea?: boolean; required?: boolean }) {
  const cls = "w-full mt-1 rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {textarea ? <textarea name={name} required={required} rows={4} className={cls} /> : <input name={name} type={type} required={required} className={cls} />}
    </div>
  );
}
