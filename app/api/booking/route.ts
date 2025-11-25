import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userInfo, service, locationType, timeSlot, date } = body;

        // Mock Email Sending (replace with real SMTP in production)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.example.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || "user",
                pass: process.env.SMTP_PASS || "pass",
            },
        });

        // In a real scenario, we would send the email here.
        // await transporter.sendMail({ ... });

        console.log("Booking Received:", body);
        console.log("Simulating email sent to:", userInfo.email);
        console.log("Simulating email sent to owner");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { error: "Failed to process booking" },
            { status: 500 }
        );
    }
}
