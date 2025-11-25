"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/Section";
import { X } from "lucide-react";

const galleryImages = [
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595867362097-152d261e537e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599693988667-279582121518?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529982412356-903cc66193aa?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=1974&auto=format&fit=crop",
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="min-h-screen pt-20 pb-12 bg-background">
            <Section>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">Our Portfolio</h1>
                    <p className="text-xl text-muted-foreground">
                        A curated collection of our finest work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((src, index) => (
                        <motion.div
                            key={index}
                            layoutId={`image-${index}`}
                            className="relative h-80 rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => setSelectedImage(src)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </Section>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative w-full max-w-5xl h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected Gallery Image"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
