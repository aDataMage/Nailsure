import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/cms";

export async function GET() {
    try {
        const content = await getContent();
        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch content" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const updatedContent = await updateContent(body);
        return NextResponse.json(updatedContent);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update content" },
            { status: 500 }
        );
    }
}
