import { BookingWizard } from "@/components/booking/BookingWizard";
import { getContent } from "@/lib/cms";
import { Section } from "@/components/Section";

export default async function BookingPage() {
    const content = await getContent();

    return (
        <div className="min-h-screen pt-20 pb-12 bg-background">
            <Section>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">
                        Book Your Appointment
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Select your service, choose a location, and find a time that works for you.
                        We bring luxury to your doorstep or welcome you to our studio.
                    </p>
                </div>

                <BookingWizard services={content.services} />
            </Section>
        </div>
    );
}
