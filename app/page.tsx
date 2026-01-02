"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { DecorativeSection, SectionHeader } from "@/components/Section";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { GlassCard, GlassCardContent, GlowOrb } from "@/components/ui/glass-card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Sparkles, Star, Clock, Shield } from "lucide-react";

// Static content - would normally come from CMS
const heroContent = {
  title: "The Art of",
  titleAccent: "Luxury Nails",
  subtitle: "Experience bespoke nail artistry crafted with precision, passion, and the finest techniques from around the world.",
};

const features = [
  { icon: Star, title: "Premium Quality", description: "Only the finest non-toxic products" },
  { icon: Clock, title: "Personalized Care", description: "Treatments tailored to you" },
  { icon: Shield, title: "Hygiene First", description: "Hospital-grade sterilization" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2070&auto=format&fit=crop",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Nail Art"
            fill
            className="object-cover scale-110"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

          {/* Animated gradient orb */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-white/70">Beverly Hills</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
          >
            {heroContent.title}
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              {heroContent.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/booking">
              <Button
                size="lg"
                className="relative overflow-hidden rounded-full px-10 py-7 text-lg bg-primary text-primary-foreground hover:shadow-[0_10px_40px_rgba(186,147,132,0.5)] transition-all duration-500 group"
              >
                <span className="relative z-10">Book Your Experience</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-7 text-lg border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
              >
                View Portfolio
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <DecorativeSection className="bg-secondary/30" orbPosition="both">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <GlassCard className="h-full">
                <GlassCardContent className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCardContent>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </DecorativeSection>

      {/* About Teaser */}
      <DecorativeSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection animation="fade-right">
            <div className="relative">
              {/* Main image */}
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop"
                  alt="Nail Artist"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating accent card */}
              <motion.div
                className="absolute -bottom-6 -right-6 lg:-right-12"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <GlassCard className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-primary">10+</span>
                      <span className="text-sm text-muted-foreground">Years</span>
                    </div>
                    <div className="w-px h-12 bg-border" />
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-primary">5k+</span>
                      <span className="text-sm text-muted-foreground">Clients</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-left" delay={0.2}>
            <div className="space-y-6">
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
                Our Story
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Where Artistry Meets
                <span className="block text-primary">Self-Care</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                It started with a simple bottle of polish and a dream. Over the last decade,
                we have honed our craft, traveling to Paris and Tokyo to learn the latest
                techniques in nail health and artistry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that getting your nails done shouldn&apos;t just be a maintenance
                task—it should be a ritual. A moment of pause in a busy world.
              </p>
              <Link href="/about" className="inline-flex">
                <Button variant="outline" className="group rounded-full px-6 mt-4">
                  Read My Story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </DecorativeSection>

      {/* Gallery Teaser */}
      <DecorativeSection className="bg-secondary/20">
        <AnimatedSection>
          <SectionHeader
            title="Our Masterpieces"
            subtitle="A curated collection of our finest work, each piece crafted with love and precision."
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="relative h-80 lg:h-96 rounded-2xl overflow-hidden cursor-pointer group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_60px_rgba(186,147,132,0.3)]" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Link href="/gallery">
            <Button size="lg" variant="secondary" className="rounded-full px-8">
              View Full Gallery
            </Button>
          </Link>
        </AnimatedSection>
      </DecorativeSection>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-[80px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.1, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <Sparkles className="w-8 h-8 text-white/80 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Ready to Shine?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Book your appointment today and experience the difference of true luxury nail care.
            </p>
            <Link href="/booking">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.3)] transition-all duration-500"
              >
                Book Your Experience
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
