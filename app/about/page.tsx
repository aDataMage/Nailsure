import Image from "next/image";
import { Section } from "@/components/Section";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-background">
            <Section>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">The Artist Behind the Art</h1>
                    <p className="text-xl text-muted-foreground">
                        Dedicated to perfection, hygiene, and the art of self-care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop"
                            alt="Portrait of the Artist"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold">My Journey</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            It started with a simple bottle of polish and a dream. Over the last decade, I have honed my craft, traveling to Paris and Tokyo to learn the latest techniques in nail health and artistry.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            I believe that getting your nails done shouldn't just be a maintenance task—it should be a ritual. A moment of pause in a busy world where you can feel pampered and leave feeling empowered.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            My philosophy is simple: Healthy nails are beautiful nails. I use only the highest quality, non-toxic products to ensure that your natural nails thrive under my care.
                        </p>

                        <div className="pt-6 grid grid-cols-2 gap-6">
                            <div className="text-center p-4 bg-secondary rounded-lg">
                                <span className="block text-3xl font-bold text-primary mb-2">10+</span>
                                <span className="text-sm text-muted-foreground">Years Experience</span>
                            </div>
                            <div className="text-center p-4 bg-secondary rounded-lg">
                                <span className="block text-3xl font-bold text-primary mb-2">5k+</span>
                                <span className="text-sm text-muted-foreground">Happy Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
