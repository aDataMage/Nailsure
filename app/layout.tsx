import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// SEO-Optimized Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://nailsure.com"),
  title: {
    default: "Nailsure | Luxury Nail Salon Beverly Hills | Premium Nail Art & Spa",
    template: "%s | Nailsure Beverly Hills",
  },
  description:
    "Experience luxury nail care at Beverly Hills' premier salon. Nailsure offers bespoke nail art, spa manicures, gel extensions, and bridal packages using only non-toxic, premium products. Book your appointment today.",
  keywords: [
    "luxury nail salon Beverly Hills",
    "nail art Beverly Hills",
    "spa manicure Los Angeles",
    "gel extensions near me",
    "bridal nail services",
    "non-toxic nail salon",
    "premium nail care",
    "nail salon Beverly Hills CA",
  ],
  authors: [{ name: "Nailsure Beverly Hills" }],
  creator: "Nailsure",
  publisher: "Nailsure",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nailsure.com",
    siteName: "Nailsure",
    title: "Nailsure | Luxury Nail Salon Beverly Hills",
    description:
      "Beverly Hills' premier luxury nail salon. Bespoke nail art, spa manicures, gel extensions, and bridal packages with non-toxic products.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nailsure Luxury Nail Salon Beverly Hills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nailsure | Luxury Nail Salon Beverly Hills",
    description:
      "Experience luxury nail care at Beverly Hills' premier salon. Book your appointment today.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://nailsure.com",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": "https://nailsure.com/#organization",
  name: "Nailsure",
  alternateName: "Nailsure Beverly Hills",
  description:
    "Beverly Hills' premier luxury nail salon offering bespoke nail art, spa manicures, gel extensions, and bridal packages.",
  url: "https://nailsure.com",
  telephone: "+1-555-123-4567",
  email: "hello@nailsure.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Luxury Lane",
    addressLocality: "Beverly Hills",
    addressRegion: "CA",
    postalCode: "90210",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.0762,
    longitude: -118.4003,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  image: "https://nailsure.com/og-image.jpg",
  sameAs: [
    "https://instagram.com/nailsure",
    "https://facebook.com/nailsure",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nail Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Classic Manicure",
          description: "Nail shaping, cuticle care, and polish application",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Luxury Spa Manicure",
          description: "Exfoliation, massage, and paraffin treatment",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gel Extensions",
          description: "Customized gel extensions with full manicure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Signature Nail Art",
          description: "Bespoke hand-painted designs and embellishments",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "328",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
