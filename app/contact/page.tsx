"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DecorativeSection } from "@/components/Section";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
    {
        icon: MapPin,
        title: "Visit Us",
        lines: ["123 Luxury Lane", "Beverly Hills, CA 90210"],
    },
    {
        icon: Phone,
        title: "Call Us",
        lines: ["(555) 123-4567", "Mon-Sat: 9am - 7pm"],
    },
    {
        icon: Mail,
        title: "Email Us",
        lines: ["hello@nailsure.com", "bookings@nailsure.com"],
    },
    {
        icon: Clock,
        title: "Hours",
        lines: ["Mon - Fri: 9am - 7pm", "Sat: 10am - 5pm"],
    },
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Contact Form Data:", data);
            toast.success("Message sent successfully! We'll get back to you soon.");
            form.reset();
        } catch {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

                <div className="relative max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center">
                        <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4 block">
                            Contact
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                            Get in
                            <span className="text-primary"> Touch</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We&apos;d love to hear from you. Whether you have a question, want to book,
                            or just want to say hello.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Main Content */}
            <DecorativeSection className="pt-8" orbPosition="left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactInfo.map((item) => (
                                <StaggerItem key={item.title}>
                                    <GlassCard className="h-full">
                                        <GlassCardContent>
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                                <item.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                            {item.lines.map((line, i) => (
                                                <p key={i} className="text-muted-foreground text-sm">
                                                    {line}
                                                </p>
                                            ))}
                                        </GlassCardContent>
                                    </GlassCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {/* Map */}
                        <AnimatedSection animation="fade-up" delay={0.3}>
                            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220362686!2d-118.4003563235656!3d34.07623997314746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1716300000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Overlay with border */}
                                <div className="absolute inset-0 pointer-events-none border border-primary/20 rounded-2xl" />
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Contact Form */}
                    <AnimatedSection animation="fade-left" delay={0.2}>
                        <GlassCard>
                            <GlassCardContent className="p-8">
                                <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            {...form.register("name")}
                                            placeholder="Your Name"
                                            className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                                        />
                                        {form.formState.errors.name && (
                                            <p className="text-sm text-destructive">
                                                {form.formState.errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...form.register("email")}
                                            placeholder="your@email.com"
                                            className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                                        />
                                        {form.formState.errors.email && (
                                            <p className="text-sm text-destructive">
                                                {form.formState.errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            {...form.register("message")}
                                            placeholder="How can we help you?"
                                            className="min-h-[150px] rounded-xl border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 resize-none"
                                        />
                                        {form.formState.errors.message && (
                                            <p className="text-sm text-destructive">
                                                {form.formState.errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:shadow-[0_8px_30px_rgba(186,147,132,0.4)] transition-all duration-300"
                                        >
                                            {isSubmitting ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                </form>
                            </GlassCardContent>
                        </GlassCard>
                    </AnimatedSection>
                </div>
            </DecorativeSection>

            <Footer />
        </div>
    );
}
