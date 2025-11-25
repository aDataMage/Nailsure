"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Schema for Step 1: User Info
const userInfoSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Valid phone number is required"),
});

// Schema for Step 2: Service Selection
const serviceSchema = z.object({
    serviceId: z.string().min(1, "Please select a service"),
});

type UserInfo = z.infer<typeof userInfoSchema>;
type ServiceSelection = z.infer<typeof serviceSchema>;

interface BookingWizardProps {
    services: { id: string; name: string; price: number; duration: number; description: string }[];
}

interface BookingData {
    userInfo?: UserInfo;
    service?: ServiceSelection;
    locationType?: string;
    timeSlot?: string;
    date?: string;
}

export function BookingWizard({ services }: BookingWizardProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<BookingData>({});

    const userInfoForm = useForm<UserInfo>({
        resolver: zodResolver(userInfoSchema),
        defaultValues: formData.userInfo,
    });

    const serviceForm = useForm<ServiceSelection>({
        resolver: zodResolver(serviceSchema),
        defaultValues: formData.service,
    });

    const onUserInfoSubmit = (data: UserInfo) => {
        setFormData((prev) => ({ ...prev, userInfo: data }));
        setStep(2);
    };

    const onServiceSubmit = (data: ServiceSelection) => {
        setFormData((prev) => ({ ...prev, service: data }));
        setStep(3);
    };

    const goBack = () => {
        setStep((prev) => Math.max(1, prev - 1));
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10" />
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors bg-background border-2",
                            step >= s
                                ? "border-primary text-primary"
                                : "border-muted text-muted-foreground"
                        )}
                    >
                        {s}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form id="step1-form" onSubmit={userInfoForm.handleSubmit(onUserInfoSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" {...userInfoForm.register("name")} />
                                        {userInfoForm.formState.errors.name && (
                                            <p className="text-sm text-destructive">{userInfoForm.formState.errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" {...userInfoForm.register("email")} />
                                        {userInfoForm.formState.errors.email && (
                                            <p className="text-sm text-destructive">{userInfoForm.formState.errors.email.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" {...userInfoForm.register("phone")} />
                                        {userInfoForm.formState.errors.phone && (
                                            <p className="text-sm text-destructive">{userInfoForm.formState.errors.phone.message}</p>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button type="submit" form="step1-form">Next: Select Service</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Service</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form id="step2-form" onSubmit={serviceForm.handleSubmit(onServiceSubmit)}>
                                    <RadioGroup
                                        onValueChange={(val) => serviceForm.setValue("serviceId", val)}
                                        defaultValue={serviceForm.getValues("serviceId")}
                                        className="grid gap-4"
                                    >
                                        {services.map((service) => (
                                            <div key={service.id}>
                                                <RadioGroupItem
                                                    value={service.id}
                                                    id={service.id}
                                                    className="peer sr-only"
                                                />
                                                <Label
                                                    htmlFor={service.id}
                                                    className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                                >
                                                    <div className="flex w-full justify-between items-center mb-2">
                                                        <span className="font-semibold text-lg">{service.name}</span>
                                                        <span className="font-bold text-primary">${service.price}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                                                    <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                                                        {service.duration} mins
                                                    </span>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {serviceForm.formState.errors.serviceId && (
                                        <p className="text-sm text-destructive mt-2">{serviceForm.formState.errors.serviceId.message}</p>
                                    )}
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={goBack}>Back</Button>
                                <Button type="submit" form="step2-form">Next: Location</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Choose Location</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <RadioGroup
                                    defaultValue={formData.locationType || "studio"}
                                    onValueChange={(val) => setFormData((prev) => ({ ...prev, locationType: val }))}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div>
                                        <RadioGroupItem value="studio" id="studio" className="peer sr-only" />
                                        <Label
                                            htmlFor="studio"
                                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-32"
                                        >
                                            <span className="font-semibold text-lg mb-2">In-Studio</span>
                                            <span className="text-sm text-center text-muted-foreground">Visit our luxury salon in Beverly Hills</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                                        <Label
                                            htmlFor="mobile"
                                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-32"
                                        >
                                            <span className="font-semibold text-lg mb-2">Mobile Service</span>
                                            <span className="text-sm text-center text-muted-foreground">We come to you (Travel fee applies)</span>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {formData.locationType === "mobile" && (
                                    <div className="space-y-4 border-t pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Your Address</Label>
                                            <Input id="address" placeholder="123 Example St, Los Angeles, CA" />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="w-full"
                                            onClick={() => toast.info("Calculating distance... (Mock: 5 miles)")}
                                        >
                                            Check Availability & Travel Fee
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={goBack}>Back</Button>
                                <Button onClick={() => setStep(4)}>Next: Schedule</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Select a Time</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        className="w-full"
                                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Available Slots</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"].map((slot) => (
                                            <Button
                                                key={slot}
                                                variant={formData.timeSlot === slot ? "default" : "outline"}
                                                className="w-full"
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, timeSlot: slot }));
                                                    toast.success(`Selected ${slot}`);
                                                }}
                                            >
                                                {slot}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={goBack}>Back</Button>
                                <Button
                                    onClick={async () => {
                                        try {
                                            const res = await fetch("/api/booking", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify(formData),
                                            });

                                            if (!res.ok) throw new Error("Booking failed");

                                            toast.success("Booking Confirmed! Check your email.");
                                            // Optional: Redirect to a success page or reset form
                                        } catch (error) {
                                            toast.error("Failed to confirm booking. Please try again.");
                                        }
                                    }}
                                    disabled={!formData.timeSlot || !formData.date}
                                >
                                    Confirm Booking
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
