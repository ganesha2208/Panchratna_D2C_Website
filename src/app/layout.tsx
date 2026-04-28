import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import CursorGlow from "@/components/motion/CursorGlow";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.productName} — 100% Organic Fertilizer | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "organic fertilizer",
    "Panchratna",
    "Green Raise Agro",
    "Jaivik fertilizer",
    "organic farming India",
    "vermicompost",
    "natural fertilizer for farmers",
  ],
  openGraph: {
    title: `${site.productName} — 100% Organic Fertilizer`,
    description: site.description,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {isAdmin ? (
          children
        ) : (
          <>
            <CursorGlow />
            <Header />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
            <WhatsAppFab />
          </>
        )}
      </body>
    </html>
  );
}
