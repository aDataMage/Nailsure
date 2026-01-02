import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    fullWidth?: boolean;
}

export function Section({ children, className, id, fullWidth = false }: SectionProps) {
    return (
        <section id={id} className={cn("py-16 md:py-24 lg:py-32", className)}>
            <div className={cn(
                fullWidth ? "px-0" : "max-w-7xl mx-auto px-6"
            )}>
                {children}
            </div>
        </section>
    );
}

// Section with decorative background elements
interface DecorativeSectionProps extends SectionProps {
    showOrbs?: boolean;
    orbPosition?: "left" | "right" | "both";
}

export function DecorativeSection({
    children,
    className,
    id,
    fullWidth = false,
    showOrbs = true,
    orbPosition = "right",
}: DecorativeSectionProps) {
    return (
        <section id={id} className={cn("relative py-16 md:py-24 lg:py-32 overflow-hidden", className)}>
            {/* Decorative orbs */}
            {showOrbs && (orbPosition === "right" || orbPosition === "both") && (
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            )}
            {showOrbs && (orbPosition === "left" || orbPosition === "both") && (
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            )}

            <div className={cn(
                "relative",
                fullWidth ? "px-0" : "max-w-7xl mx-auto px-6"
            )}>
                {children}
            </div>
        </section>
    );
}

// Section header component
interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeader({
    title,
    subtitle,
    align = "center",
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-12 md:mb-16",
                align === "center" && "text-center max-w-2xl mx-auto",
                className
            )}
        >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-foreground">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
