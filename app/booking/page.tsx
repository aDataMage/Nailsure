"use client";

import { DecorativeSection } from "@/components/Section";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles } from "lucide-react";

// Static services data - normally from CMS
const services = [
    {
        id: "classic-manicure",
        name: "Classic Manicure",
        price: 45,
        duration: 45,
        description: "A timeless treatment including nail shaping, cuticle care, and polish application.",
    },
    {
        id: "luxury-spa",
        name: "Luxury Spa Manicure",
        price: 75,
        duration: 60,
        description: "An indulgent experience with exfoliation, massage, and paraffin treatment.",
    },
    {
        id: "gel-extension",
        name: "Gel Extensions",
        price: 120,
        duration: 90,
        description: "Beautiful, durable gel extensions customized to your desired length and shape.",
    },
    {
        id: "nail-art",
        name: "Signature Nail Art",
        price: 150,
        duration: 120,
        description: "Bespoke nail artistry featuring hand-painted designs and premium embellishments.",
    },
];

export default function BookingPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
                                Book Now
                            </span>
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                            Book Your
                            <span className="text-primary"> Experience</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Select your service, choose a location, and find a time that works for you.
                            We bring luxury to your doorstep or welcome you to our studio.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Booking Wizard */}
            <DecorativeSection className="pt-8 pb-24" orbPosition="both">
                <AnimatedSection animation="fade-up" delay={0.2}>
                    <BookingWizard services={services} />
                </AnimatedSection>
            </DecorativeSection>

            <Footer />
        </div>
    );
}
