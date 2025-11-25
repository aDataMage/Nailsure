"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const code = formData.get("code") as string;
    const accessCode = process.env.ADMIN_ACCESS_CODE || "luxury123";

    if (code === accessCode) {
        const cookieStore = await cookies();
        cookieStore.set("admin_access", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        redirect("/admin");
    } else {
        return { error: "Invalid access code" };
    }
}
