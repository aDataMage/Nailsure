"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DecorativeSection, SectionHeader } from "@/components/Section";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Clock, Sparkles, ArrowRight } from "lucide-react";

// Static services data
const services = [
    {
        id: "classic-manicure",
        name: "Classic Manicure",
        price: 45,
        duration: 45,
        description: "A timeless treatment including nail shaping, cuticle care, and your choice of polish. Perfect for maintaining healthy, beautiful nails.",
        popular: false,
    },
    {
        id: "luxury-spa",
        name: "Luxury Spa Manicure",
        price: 75,
        duration: 60,
        description: "An indulgent experience featuring exfoliation, hot towel treatment, extended massage, and paraffin therapy for ultimate relaxation.",
        popular: true,
    },
    {
        id: "gel-extension",
        name: "Gel Extensions",
        price: 120,
        duration: 90,
        description: "Beautiful, durable gel extensions customized to your desired length and shape. Includes full manicure and your choice of color or design.",
        popular: false,
    },
    {
        id: "nail-art",
        name: "Signature Nail Art",
        price: 150,
        duration: 120,
        description: "Bespoke nail artistry featuring hand-painted designs, Swarovski crystals, and premium embellishments. Each set is a unique masterpiece.",
        popular: true,
    },
    {
        id: "express-manicure",
        name: "Express Manicure",
        price: 30,
        duration: 30,
        description: "A quick refresh for busy schedules. Includes nail shaping, cuticle push, and polish application. Be in and out looking fabulous.",
        popular: false,
    },
    {
        id: "bridal-package",
        name: "Bridal Package",
        price: 250,
        duration: 180,
        description: "The complete bridal experience including consultation, trial design, gel extensions, and your custom wedding-day nail art.",
        popular: false,
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
                <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute top-40 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center">
                        <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                            Our Services
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                            Treatments for
                            <span className="block text-primary">Every Occasion</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            From express touch-ups to bridal masterpieces, discover the perfect
                            treatment for your unique style and needs.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Services Grid */}
            <DecorativeSection className="pt-8" orbPosition="both">
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <StaggerItem key={service.id}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                            >
                                <GlassCard className="h-full relative overflow-visible">
                                    {service.popular && (
                                        <div className="absolute -top-3 right-6 z-10">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg">
                                                <Sparkles className="w-3 h-3" />
                                                Popular
                                            </span>
                                        </div>
                                    )}
                                    <GlassCardContent className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-semibold pr-4">{service.name}</h3>
                                            <span className="text-2xl font-bold text-primary whitespace-nowrap">
                                                ${service.price}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span>{service.duration} mins</span>
                                            </div>
                                            <Link href="/booking">
                                                <Button variant="ghost" size="sm" className="group text-primary hover:text-primary hover:bg-primary/10">
                                                    Book Now
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </GlassCardContent>
                                </GlassCard>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </DecorativeSection>

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
                <motion.div
                    className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                            Not Sure Which Service is Right for You?
                        </h2>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                            Book a free consultation and we&apos;ll help you find the perfect treatment
                            for your style and occasion.
                        </p>
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all duration-500"
                            >
                                Get in Touch
                            </Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </div>
    );
}
