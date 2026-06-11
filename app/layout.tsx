import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanspastryshoppe.com"),
  title: "Van's Pastry Shoppe — Baked with Century-Old Craft | Grand Rapids, MI",
  description:
    "Grand Rapids' oldest bakery. Four generations of the Vander Meer family baking English Muffin Bread, almond pastries, paczki, and more since 1924. Visit us at 955 Fulton St E.",
  keywords: [
    "bakery",
    "Grand Rapids bakery",
    "Van's Pastry Shoppe",
    "English Muffin Bread",
    "Dutch bakery",
    "paczki",
    "almond pastry",
    "custom cakes",
  ],
  openGraph: {
    title: "Van's Pastry Shoppe — Baked with Century-Old Craft",
    description:
      "Four generations. The same recipes. The oldest bakery in Grand Rapids, est. 1924.",
    url: "https://vanspastryshoppe.com",
    siteName: "Van's Pastry Shoppe",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Fresh artisan bread at Van's Pastry Shoppe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Van's Pastry Shoppe — Baked with Century-Old Craft",
    description:
      "Four generations. The same recipes. The oldest bakery in Grand Rapids, est. 1924.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Van's Pastry Shoppe",
  image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=85",
  description:
    "Grand Rapids' oldest bakery. Four generations of the Vander Meer family baking English Muffin Bread, almond pastries, paczki, and more since 1924.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "955 Fulton St E",
    addressLocality: "Grand Rapids",
    addressRegion: "MI",
    postalCode: "49503",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.9634,
    longitude: -85.6313,
  },
  url: "https://vanspastryshoppe.com",
  telephone: "+16164581637",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "06:00",
      closes: "13:00",
    },
  ],
  servesCuisine: ["Bakery", "Dutch", "American"],
  priceRange: "$",
  foundingDate: "1924",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
