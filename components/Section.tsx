"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export function Section({ children, className, id, delay = 0 }: SectionProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={cn("py-16 md:py-24 px-6", className)}
        >
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </motion.section>
    );
}
