"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { User, Scissors, MapPin, Calendar, Check, ChevronRight, ChevronLeft, Home, Building2 } from "lucide-react";

// Schemas
const userInfoSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Valid phone number is required"),
});

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

const steps = [
    { id: 1, title: "Your Info", icon: User },
    { id: 2, title: "Service", icon: Scissors },
    { id: 3, title: "Location", icon: MapPin },
    { id: 4, title: "Schedule", icon: Calendar },
];

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

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-10 relative">
                {/* Progress line background */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted" />
                {/* Progress line fill */}
                <motion.div
                    className="absolute top-6 left-0 h-0.5 bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {steps.map((s, index) => (
                    <div key={s.id} className="relative z-10 flex flex-col items-center">
                        <motion.div
                            className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                                step > s.id
                                    ? "bg-primary text-primary-foreground"
                                    : step === s.id
                                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(186,147,132,0.5)]"
                                        : "bg-muted text-muted-foreground"
                            )}
                            initial={false}
                            animate={{
                                scale: step === s.id ? 1.1 : 1,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {step > s.id ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <s.icon className="w-5 h-5" />
                            )}
                        </motion.div>
                        <span
                            className={cn(
                                "mt-2 text-xs font-medium transition-colors duration-300 hidden sm:block",
                                step >= s.id ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {s.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait" custom={step}>
                {step === 1 && (
                    <motion.div
                        key="step1"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <GlassCard>
                            <GlassCardContent className="p-8">
                                <h2 className="text-2xl font-serif font-bold mb-6">Your Information</h2>
                                <form id="step1-form" onSubmit={userInfoForm.handleSubmit(onUserInfoSubmit)} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            {...userInfoForm.register("name")}
                                            className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-all duration-300"
                                            placeholder="Jane Doe"
                                        />
                                        {userInfoForm.formState.errors.name && (
                                            <p className="text-sm text-destructive">{userInfoForm.formState.errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...userInfoForm.register("email")}
                                            className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-all duration-300"
                                            placeholder="jane@example.com"
                                        />
                                        {userInfoForm.formState.errors.email && (
                                            <p className="text-sm text-destructive">{userInfoForm.formState.errors.email.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            {...userInfoForm.register("phone")}
                                            className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-all duration-300"
                                            placeholder="(555) 123-4567"
                                        />
                                        {userInfoForm.formState.errors.phone && (
                                            <p className="text-sm text-destructive">{userInfoForm.formState.errors.phone.message}</p>
                                        )}
                                    </div>
                                </form>
                                <div className="flex justify-end mt-8">
                                    <Button type="submit" form="step1-form" className="rounded-full px-8">
                                        Next: Select Service
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </GlassCardContent>
                        </GlassCard>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <GlassCard>
                            <GlassCardContent className="p-8">
                                <h2 className="text-2xl font-serif font-bold mb-6">Select Your Service</h2>
                                <form id="step2-form" onSubmit={serviceForm.handleSubmit(onServiceSubmit)}>
                                    <RadioGroup
                                        onValueChange={(val) => serviceForm.setValue("serviceId", val)}
                                        defaultValue={serviceForm.getValues("serviceId")}
                                        className="grid gap-4"
                                    >
                                        {services.map((service) => (
                                            <div key={service.id}>
                                                <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
                                                <Label
                                                    htmlFor={service.id}
                                                    className={cn(
                                                        "flex flex-col rounded-xl border-2 border-muted p-5 cursor-pointer transition-all duration-300",
                                                        "hover:border-primary/30 hover:bg-primary/5",
                                                        "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                                                    )}
                                                >
                                                    <div className="flex w-full justify-between items-center mb-2">
                                                        <span className="font-semibold text-lg">{service.name}</span>
                                                        <span className="font-bold text-primary text-lg">${service.price}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                                                    <span className="text-xs font-medium bg-secondary/50 px-3 py-1 rounded-full w-fit">
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
                                <div className="flex justify-between mt-8">
                                    <Button variant="outline" onClick={goBack} className="rounded-full px-6">
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <Button type="submit" form="step2-form" className="rounded-full px-8">
                                        Next: Location
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </GlassCardContent>
                        </GlassCard>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <GlassCard>
                            <GlassCardContent className="p-8">
                                <h2 className="text-2xl font-serif font-bold mb-6">Choose Location</h2>
                                <RadioGroup
                                    defaultValue={formData.locationType || "studio"}
                                    onValueChange={(val) => setFormData((prev) => ({ ...prev, locationType: val }))}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div>
                                        <RadioGroupItem value="studio" id="studio" className="peer sr-only" />
                                        <Label
                                            htmlFor="studio"
                                            className={cn(
                                                "flex flex-col items-center justify-center rounded-xl border-2 border-muted p-6 cursor-pointer transition-all duration-300 h-40",
                                                "hover:border-primary/30 hover:bg-primary/5",
                                                "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                                            )}
                                        >
                                            <Building2 className="w-8 h-8 text-primary mb-3" />
                                            <span className="font-semibold text-lg mb-1">In-Studio</span>
                                            <span className="text-xs text-center text-muted-foreground">Visit our Beverly Hills salon</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                                        <Label
                                            htmlFor="mobile"
                                            className={cn(
                                                "flex flex-col items-center justify-center rounded-xl border-2 border-muted p-6 cursor-pointer transition-all duration-300 h-40",
                                                "hover:border-primary/30 hover:bg-primary/5",
                                                "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                                            )}
                                        >
                                            <Home className="w-8 h-8 text-primary mb-3" />
                                            <span className="font-semibold text-lg mb-1">Mobile Service</span>
                                            <span className="text-xs text-center text-muted-foreground">We come to you</span>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {formData.locationType === "mobile" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6 pt-6 border-t border-border/50"
                                    >
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Your Address</Label>
                                                <Input
                                                    id="address"
                                                    placeholder="123 Example St, Los Angeles, CA"
                                                    className="h-12 rounded-xl border-border/50 bg-background/50"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="w-full rounded-xl"
                                                onClick={() => toast.info("Calculating distance... Travel fee: $25")}
                                            >
                                                Check Availability & Travel Fee
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="flex justify-between mt-8">
                                    <Button variant="outline" onClick={goBack} className="rounded-full px-6">
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <Button onClick={() => setStep(4)} className="rounded-full px-8">
                                        Next: Schedule
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </GlassCardContent>
                        </GlassCard>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <GlassCard>
                            <GlassCardContent className="p-8">
                                <h2 className="text-2xl font-serif font-bold mb-6">Select Date & Time</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Date</Label>
                                        <Input
                                            type="date"
                                            className="h-12 rounded-xl border-border/50 bg-background/50"
                                            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Available Time Slots</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "4:00 PM", "5:30 PM"].map((slot) => (
                                                <motion.button
                                                    key={slot}
                                                    type="button"
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className={cn(
                                                        "py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all duration-300",
                                                        formData.timeSlot === slot
                                                            ? "border-primary bg-primary text-primary-foreground"
                                                            : "border-muted hover:border-primary/30 hover:bg-primary/5"
                                                    )}
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, timeSlot: slot }));
                                                        toast.success(`Selected ${slot}`);
                                                    }}
                                                >
                                                    {slot}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-8">
                                    <Button variant="outline" onClick={goBack} className="rounded-full px-6">
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            className="rounded-full px-8 bg-primary hover:shadow-[0_8px_30px_rgba(186,147,132,0.5)] transition-all duration-300"
                                            onClick={async () => {
                                                try {
                                                    const res = await fetch("/api/booking", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify(formData),
                                                    });

                                                    if (!res.ok) throw new Error("Booking failed");

                                                    toast.success("Booking Confirmed! Check your email for details.");
                                                } catch {
                                                    toast.error("Failed to confirm booking. Please try again.");
                                                }
                                            }}
                                            disabled={!formData.timeSlot || !formData.date}
                                        >
                                            <Check className="w-4 h-4 mr-2" />
                                            Confirm Booking
                                        </Button>
                                    </motion.div>
                                </div>
                            </GlassCardContent>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
