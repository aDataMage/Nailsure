"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/Section";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Contact Form Data:", data);
            toast.success("Message sent successfully! We'll get back to you soon.");
            form.reset();
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 bg-background">
            <Section>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">Get in Touch</h1>
                    <p className="text-xl text-muted-foreground">
                        We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-secondary rounded-lg space-y-4">
                                <MapPin className="w-8 h-8 text-primary" />
                                <h3 className="font-bold text-lg">Visit Us</h3>
                                <p className="text-muted-foreground">
                                    123 Luxury Lane<br />
                                    Beverly Hills, CA 90210
                                </p>
                            </div>
                            <div className="p-6 bg-secondary rounded-lg space-y-4">
                                <Phone className="w-8 h-8 text-primary" />
                                <h3 className="font-bold text-lg">Call Us</h3>
                                <p className="text-muted-foreground">
                                    (555) 123-4567<br />
                                    Mon-Sat: 9am - 7pm
                                </p>
                            </div>
                            <div className="p-6 bg-secondary rounded-lg space-y-4">
                                <Mail className="w-8 h-8 text-primary" />
                                <h3 className="font-bold text-lg">Email Us</h3>
                                <p className="text-muted-foreground">
                                    hello@nailsure.com<br />
                                    bookings@nailsure.com
                                </p>
                            </div>
                            <div className="p-6 bg-secondary rounded-lg space-y-4">
                                <Clock className="w-8 h-8 text-primary" />
                                <h3 className="font-bold text-lg">Opening Hours</h3>
                                <p className="text-muted-foreground">
                                    Mon - Fri: 9:00 AM - 7:00 PM<br />
                                    Sat: 10:00 AM - 5:00 PM
                                </p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-80 bg-muted rounded-lg overflow-hidden relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220362686!2d-118.4003563235656!3d34.07623997314746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1716300000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card border border-border p-8 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" {...form.register("name")} placeholder="Your Name" />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...form.register("email")} placeholder="your@email.com" />
                                {form.formState.errors.email && (
                                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    {...form.register("message")}
                                    placeholder="How can we help you?"
                                    className="min-h-[150px]"
                                />
                                {form.formState.errors.message && (
                                    <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>
                </div>
            </Section>
        </div>
    );
}
