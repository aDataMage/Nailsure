"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DecorativeSection, SectionHeader } from "@/components/Section";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
        alt: "Elegant French Tips",
        category: "Classic",
    },
    {
        src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
        alt: "Luxury Nail Art",
        category: "Artistic",
    },
    {
        src: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2070&auto=format&fit=crop",
        alt: "Natural Beauty",
        category: "Natural",
    },
    {
        src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
        alt: "Rose Gold Shimmer",
        category: "Glamour",
    },
    {
        src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
        alt: "Spa Treatment",
        category: "Wellness",
    },
    {
        src: "https://images.unsplash.com/photo-1595867362097-152d261e537e?q=80&w=2070&auto=format&fit=crop",
        alt: "Delicate Designs",
        category: "Artistic",
    },
    {
        src: "https://images.unsplash.com/photo-1599693988667-279582121518?q=80&w=2070&auto=format&fit=crop",
        alt: "Bold Statement",
        category: "Glamour",
    },
    {
        src: "https://images.unsplash.com/photo-1529982412356-903cc66193aa?q=80&w=1974&auto=format&fit=crop",
        alt: "Minimalist Chic",
        category: "Classic",
    },
    {
        src: "https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=1974&auto=format&fit=crop",
        alt: "Seasonal Collection",
        category: "Artistic",
    },
];

// Masonry heights for visual interest
const heights = ["h-72", "h-96", "h-80", "h-88", "h-72", "h-96", "h-80", "h-72", "h-88"];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

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
                            Our Work
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                            Portfolio of
                            <span className="block text-primary">Elegance</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Every nail tells a story. Browse our curated collection of
                            masterpieces, each crafted with precision and artistic vision.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Gallery Grid */}
            <DecorativeSection className="pt-8" orbPosition="left">
                <StaggerContainer className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryImages.map((image, index) => (
                        <StaggerItem key={index}>
                            <motion.div
                                className={`relative ${heights[index]} rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid`}
                                onClick={() => setSelectedImage(image)}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-xs uppercase tracking-wider text-primary mb-1">
                                        {image.category}
                                    </span>
                                    <h3 className="text-lg font-semibold text-white">
                                        {image.alt}
                                    </h3>
                                </div>

                                {/* Zoom icon */}
                                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                    <ZoomIn className="w-5 h-5 text-white" />
                                </div>

                                {/* Border glow on hover */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </DecorativeSection>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        {/* Close button */}
                        <motion.button
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                            onClick={() => setSelectedImage(null)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                            />

                            {/* Image info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-xs uppercase tracking-wider text-primary">
                                    {selectedImage.category}
                                </span>
                                <h3 className="text-xl font-semibold text-white mt-1">
                                    {selectedImage.alt}
                                </h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
