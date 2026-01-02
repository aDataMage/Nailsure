"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DecorativeSection } from "@/components/Section";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, Heart, Sparkles, Globe } from "lucide-react";

const stats = [
    { value: "10+", label: "Years Experience", icon: Award },
    { value: "5,000+", label: "Happy Clients", icon: Heart },
    { value: "50+", label: "Awards Won", icon: Sparkles },
    { value: "3", label: "Countries Trained", icon: Globe },
];

const journey = [
    {
        year: "2014",
        title: "The Beginning",
        description: "Started with a passion for nail artistry in a small studio, focusing on quality over quantity.",
    },
    {
        year: "2017",
        title: "Paris Training",
        description: "Traveled to Paris to learn advanced techniques from world-renowned nail artists.",
    },
    {
        year: "2019",
        title: "Tokyo Masters",
        description: "Completed the prestigious Japanese Nail Art certification, mastering intricate designs.",
    },
    {
        year: "2024",
        title: "Beverly Hills Studio",
        description: "Opened our flagship luxury studio in the heart of Beverly Hills, bringing global expertise home.",
    },
];

export default function AboutPage() {
    const imageRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
                <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center max-w-3xl mx-auto">
                        <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                            Our Story
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                            The Artist Behind
                            <span className="block text-primary">The Art</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Dedicated to perfection, hygiene, and the art of self-care.
                            Every treatment is a journey to beauty.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Main Content */}
            <DecorativeSection orbPosition="right">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image with Parallax */}
                    <AnimatedSection animation="fade-right">
                        <div ref={imageRef} className="relative h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                            <motion.div className="absolute inset-0" style={{ y: imageY }}>
                                <Image
                                    src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop"
                                    alt="Portrait of the Artist"
                                    fill
                                    className="object-cover scale-110"
                                />
                            </motion.div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                    </AnimatedSection>

                    {/* Content */}
                    <div className="space-y-8">
                        <AnimatedSection animation="fade-left">
                            <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
                                My Journey
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-serif font-bold mt-3 mb-6">
                                A Decade of Crafting Beauty
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    It started with a simple bottle of polish and a dream. Over the last decade,
                                    I have honed my craft, traveling to Paris and Tokyo to learn the latest
                                    techniques in nail health and artistry.
                                </p>
                                <p>
                                    I believe that getting your nails done shouldn&apos;t just be a maintenance
                                    task—it should be a ritual. A moment of pause in a busy world where you
                                    can feel pampered and leave feeling empowered.
                                </p>
                                <p>
                                    My philosophy is simple: <span className="text-foreground font-medium">
                                        Healthy nails are beautiful nails.</span> I use only the highest quality,
                                    non-toxic products to ensure that your natural nails thrive under my care.
                                </p>
                            </div>
                        </AnimatedSection>

                        {/* Stats */}
                        <AnimatedSection animation="fade-up" delay={0.3}>
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                {stats.slice(0, 2).map((stat) => (
                                    <GlassCard key={stat.label} className="text-center">
                                        <GlassCardContent>
                                            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                                            <span className="block text-3xl font-bold text-primary">
                                                {stat.value}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {stat.label}
                                            </span>
                                        </GlassCardContent>
                                    </GlassCard>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </DecorativeSection>

            {/* Journey Timeline */}
            <DecorativeSection className="bg-secondary/20" orbPosition="left">
                <AnimatedSection className="text-center mb-16">
                    <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                        The Journey
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold">
                        From Passion to Mastery
                    </h2>
                </AnimatedSection>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

                    <StaggerContainer className="space-y-12">
                        {journey.map((item, index) => (
                            <StaggerItem key={item.year}>
                                <div className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}>
                                    {/* Timeline dot */}
                                    <motion.div
                                        className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 z-10"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                    >
                                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                                    </motion.div>

                                    {/* Content card */}
                                    <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                                        }`}>
                                        <GlassCard>
                                            <GlassCardContent>
                                                <span className="text-sm font-bold text-primary">
                                                    {item.year}
                                                </span>
                                                <h3 className="text-xl font-semibold mt-1 mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm">
                                                    {item.description}
                                                </p>
                                            </GlassCardContent>
                                        </GlassCard>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </DecorativeSection>

            {/* Full Stats */}
            <DecorativeSection>
                <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <StaggerItem key={stat.label}>
                            <GlassCard className="text-center">
                                <GlassCardContent>
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="block text-4xl font-bold text-primary mb-1">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </span>
                                </GlassCardContent>
                            </GlassCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </DecorativeSection>

            <Footer />
        </div>
    );
}
