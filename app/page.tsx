import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { getContent } from "@/lib/cms";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const content = await getContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Nail Art"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {content.home.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light tracking-wide animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {content.home.heroSubtitle}
          </p>
          <Link href="/booking">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400"
            >
              Book Appointment
            </Button>
          </Link>
        </div>
      </section>

      {/* About Teaser */}
      <Section className="bg-secondary/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop"
              alt="Nail Artist"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-primary">
              {content.home.aboutTeaserTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.home.aboutTeaserText}
            </p>
            <Link href="/about">
              <Button variant="outline" className="group">
                Read My Story <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Gallery Teaser */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Our Masterpieces</h2>
          <p className="text-muted-foreground">A glimpse into our portfolio of elegance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2070&auto=format&fit=crop"
          ].map((src, index) => (
            <div key={index} className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/gallery">
            <Button variant="secondary" size="lg">View Full Gallery</Button>
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Shine?</h2>
          <p className="text-xl mb-8 opacity-90">Book your appointment today and experience the difference.</p>
          <Link href="/booking">
            <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-lg">
              Book Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
