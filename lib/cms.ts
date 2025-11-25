import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "content.json");

export interface GeneralContent {
    businessName: string;
    phone: string;
    email: string;
    address: string;
    instagram: string;
    facebook: string;
}

export interface HomeContent {
    heroTitle: string;
    heroSubtitle: string;
    aboutTeaserTitle: string;
    aboutTeaserText: string;
}

export interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    description: string;
}

export interface SiteContent {
    general: GeneralContent;
    home: HomeContent;
    services: Service[];
}

export async function getContent(): Promise<SiteContent> {
    try {
        const fileContent = await fs.readFile(dataFilePath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading content file:", error);
        // Return default/fallback content if file read fails
        return {
            general: {
                businessName: "Nailsure",
                phone: "",
                email: "",
                address: "",
                instagram: "",
                facebook: "",
            },
            home: {
                heroTitle: "Welcome",
                heroSubtitle: "",
                aboutTeaserTitle: "",
                aboutTeaserText: "",
            },
            services: [],
        };
    }
}

export async function updateContent(newContent: Partial<SiteContent>): Promise<SiteContent> {
    const currentContent = await getContent();
    const updatedContent = { ...currentContent, ...newContent };

    await fs.writeFile(dataFilePath, JSON.stringify(updatedContent, null, 2), "utf-8");
    return updatedContent;
}
