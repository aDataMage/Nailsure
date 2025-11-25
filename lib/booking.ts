import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const bookingsFilePath = path.join(process.cwd(), "data", "bookings.json");

export interface Booking {
    id: string;
    serviceId: string;
    date: string; // ISO string
    customerName: string;
    email: string;
    phone: string;
    status: "pending" | "confirmed" | "cancelled";
}

export async function getBookings(): Promise<Booking[]> {
    try {
        const fileContent = await fs.readFile(bookingsFilePath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function createBooking(bookingData: Omit<Booking, "id" | "status">): Promise<Booking> {
    const bookings = await getBookings();

    const newBooking: Booking = {
        ...bookingData,
        id: uuidv4(),
        status: "pending",
    };

    bookings.push(newBooking);

    // Ensure directory exists
    try {
        await fs.access(path.dirname(bookingsFilePath));
    } catch {
        await fs.mkdir(path.dirname(bookingsFilePath), { recursive: true });
    }

    await fs.writeFile(bookingsFilePath, JSON.stringify(bookings, null, 2), "utf-8");
    return newBooking;
}

export async function getAvailableSlots(date: Date): Promise<string[]> {
    // Mock availability logic
    // In a real app, this would check against existing bookings and business hours
    // For now, return a fixed set of slots
    const slots = [
        "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
    ];

    // TODO: Filter out slots that are already booked for the given date

    return slots;
}
