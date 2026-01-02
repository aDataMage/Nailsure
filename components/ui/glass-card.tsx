import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export function GlassCard({
    children,
    className,
    hover = true,
    glow = false,
}: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl overflow-hidden",
                "bg-white/70 dark:bg-black/40",
                "backdrop-blur-xl",
                "border border-white/30 dark:border-white/10",
                "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
                hover && [
                    "transition-all duration-500 ease-out",
                    "hover:translate-y-[-6px]",
                    "hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]",
                    "hover:border-primary/20",
                ],
                glow && "shadow-[0_0_30px_rgba(186,147,132,0.2)]",
                className
            )}
        >
            {children}
        </div>
    );
}

// Glass card with inner content area
interface GlassCardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function GlassCardContent({ children, className }: GlassCardContentProps) {
    return <div className={cn("p-6 md:p-8", className)}>{children}</div>;
}

// Glass card header
interface GlassCardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function GlassCardHeader({ children, className }: GlassCardHeaderProps) {
    return (
        <div className={cn("px-6 pt-6 md:px-8 md:pt-8", className)}>{children}</div>
    );
}

// Decorative glow orb
interface GlowOrbProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary";
}

export function GlowOrb({ className, size = "md", color = "primary" }: GlowOrbProps) {
    const sizeClasses = {
        sm: "w-48 h-48",
        md: "w-80 h-80",
        lg: "w-[500px] h-[500px]",
    };

    const colorClasses = {
        primary: "bg-primary/20",
        secondary: "bg-secondary/30",
    };

    return (
        <div
            className={cn(
                "absolute rounded-full blur-[80px] pointer-events-none",
                sizeClasses[size],
                colorClasses[color],
                className
            )}
        />
    );
}
