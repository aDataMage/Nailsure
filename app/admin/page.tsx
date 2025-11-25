"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { contentSchema, ContentFormValues } from "@/lib/schemas";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const form = useForm<ContentFormValues>({
        resolver: zodResolver(contentSchema) as any,
        defaultValues: {
            general: {
                businessName: "",
                phone: "",
                email: "",
                address: "",
                instagram: "",
                facebook: "",
            },
            home: {
                heroTitle: "",
                heroSubtitle: "",
                aboutTeaserTitle: "",
                aboutTeaserText: "",
            },
            services: [],
        },
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch("/api/admin/content");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                form.reset(data);
            } catch (error) {
                toast.error("Failed to load content");
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [form]);

    const onSubmit = async (data: ContentFormValues) => {
        try {
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Failed to update");
            toast.success("Content updated successfully");
        } catch (error) {
            toast.error("Failed to update content");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="general">General Info</TabsTrigger>
                        <TabsTrigger value="home">Home Page</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Information</CardTitle>
                                <CardDescription>Manage your business details and contact info.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="businessName">Business Name</Label>
                                        <Input id="businessName" {...form.register("general.businessName")} />
                                        {form.formState.errors.general?.businessName && (
                                            <p className="text-sm text-destructive">{form.formState.errors.general.businessName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" {...form.register("general.phone")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" {...form.register("general.email")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" {...form.register("general.address")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instagram">Instagram URL</Label>
                                        <Input id="instagram" {...form.register("general.instagram")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="facebook">Facebook URL</Label>
                                        <Input id="facebook" {...form.register("general.facebook")} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="home">
                        <Card>
                            <CardHeader>
                                <CardTitle>Home Page Content</CardTitle>
                                <CardDescription>Edit the hero section and about teaser.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="heroTitle">Hero Title</Label>
                                    <Input id="heroTitle" {...form.register("home.heroTitle")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                                    <Textarea id="heroSubtitle" {...form.register("home.heroSubtitle")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="aboutTeaserTitle">About Teaser Title</Label>
                                    <Input id="aboutTeaserTitle" {...form.register("home.aboutTeaserTitle")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="aboutTeaserText">About Teaser Text</Label>
                                    <Textarea id="aboutTeaserText" {...form.register("home.aboutTeaserText")} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="services">
                        <Card>
                            <CardHeader>
                                <CardTitle>Services</CardTitle>
                                <CardDescription>Manage your service offerings.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {form.watch("services")?.map((_, index) => (
                                    <div key={index} className="p-4 border rounded-lg space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Service Name</Label>
                                                <Input {...form.register(`services.${index}.name`)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Price ($)</Label>
                                                <Input type="number" {...form.register(`services.${index}.price`)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Duration (min)</Label>
                                                <Input type="number" {...form.register(`services.${index}.duration`)} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea {...form.register(`services.${index}.description`)} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-8 flex justify-end">
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
