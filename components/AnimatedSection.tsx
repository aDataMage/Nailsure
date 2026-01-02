"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationType =
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "fade"
    | "scale"
    | "blur";

interface AnimatedSectionProps {
    children: React.ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    threshold?: number;
}

const animationVariants: Record<AnimationType, Variants> = {
    "fade-up": {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
    blur: {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
    },
};

export function AnimatedSection({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 0.6,
    className,
    once = true,
    threshold = 0.2,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: threshold });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={animationVariants[animation]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Staggered container for animating lists
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    once = true,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Stagger item (use inside StaggerContainer)
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                    },
                },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Parallax wrapper
interface ParallaxProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
    return (
        <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: -50 * speed }}
            transition={{ duration: 0 }}
            viewport={{ once: false, amount: "some" }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Hover scale wrapper
interface HoverScaleProps {
    children: React.ReactNode;
    className?: string;
    scale?: number;
}

export function HoverScale({ children, className, scale = 1.05 }: HoverScaleProps) {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
