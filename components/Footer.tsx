"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, MapPin, Phone, Sparkles } from "lucide-react";

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
];

const contactInfo = [
    { icon: MapPin, text: "123 Luxury Lane, Beverly Hills, CA" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "hello@nailsure.com" },
];

export function Footer() {
    return (
        <footer className="relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-secondary/50 dark:from-background dark:via-secondary/10 dark:to-secondary/20" />

            {/* Decorative orb */}
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />

            <div className="relative">
                {/* Main footer content */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="lg:col-span-2 space-y-6">
                            <Link href="/" className="inline-flex items-center gap-2 group">
                                <span className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                    Nailsure
                                </span>
                                <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                            <p className="text-muted-foreground max-w-md leading-relaxed">
                                Experience the art of luxury nail care. Dedicated to perfection,
                                hygiene, and creating beautiful moments of self-care.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        className="p-3 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_20px_rgba(186,147,132,0.2)] transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                                Quick Links
                            </h4>
                            <nav className="flex flex-col gap-3">
                                {[
                                    { name: "About Us", href: "/about" },
                                    { name: "Services", href: "/services" },
                                    { name: "Gallery", href: "/gallery" },
                                    { name: "Book Now", href: "/booking" },
                                    { name: "Contact", href: "/contact" },
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 w-fit"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                                Contact Us
                            </h4>
                            <ul className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                                        <item.icon size={18} className="text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border/50">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            &copy; {new Date().getFullYear()} Nailsure. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <Link
                                href="/admin"
                                className="hover:text-primary transition-colors duration-300"
                            >
                                Admin
                            </Link>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <Link
                                href="#"
                                className="hover:text-primary transition-colors duration-300"
                            >
                                Privacy
                            </Link>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <Link
                                href="#"
                                className="hover:text-primary transition-colors duration-300"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
