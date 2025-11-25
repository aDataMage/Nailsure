"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface BookingSystemProps {
    serviceId?: string; // Optional, if we want to pre-select a service
}

export function BookingSystem({ serviceId }: BookingSystemProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [slots, setSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock fetching slots based on date
    useEffect(() => {
        if (date) {
            // In a real app, fetch from API: /api/booking/slots?date=...
            // For now, use static slots
            setSlots(["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]);
        }
    }, [date]);

    const handleSlotClick = (slot: string) => {
        setSelectedSlot(slot);
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    serviceId: serviceId || "general",
                    date: date?.toISOString(),
                    slot: selectedSlot, // Note: backend doesn't explicitly store slot yet, but good to send
                    customerName: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                }),
            });

            if (!response.ok) throw new Error("Booking failed");

            toast.success("Booking confirmed!");
            setIsDialogOpen(false);
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            toast.error("Failed to book appointment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Select a Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date()} // Disable past dates
                    />
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Available Slots</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {slots.map((slot) => (
                            <Button
                                key={slot}
                                variant="outline"
                                onClick={() => handleSlotClick(slot)}
                            >
                                {slot}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>
                            Book appointment for {date?.toLocaleDateString()} at {selectedSlot}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
