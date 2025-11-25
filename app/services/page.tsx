import { getContent } from "@/lib/cms";
import { BookingSystem } from "@/components/BookingSystem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/Section";

export default async function ServicesPage() {
    const content = await getContent();
    const services = content.services;

    return (
        <main className="pt-20">
            <Section className="bg-neutral-50 dark:bg-neutral-900">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Experience luxury and care with our premium nail treatments.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {services.map((service) => (
                        <Card key={service.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>{service.name}</span>
                                    <span className="text-lg font-normal">${service.price}</span>
                                </CardTitle>
                                <CardDescription>{service.duration} mins</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section id="booking">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold mb-4">Book an Appointment</h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Select a date and time to reserve your spot.
                    </p>
                </div>
                <BookingSystem />
            </Section>
        </main>
    );
}
