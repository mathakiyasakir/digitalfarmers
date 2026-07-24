import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Digital Farmers - खेधूत और व्यापारी का अपना बाजार",
  description: "अपनी फसल का सही दाम पाएं, सीधे व्यापारी के साथ।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu">
      <body className="antialiased bg-white text-gray-900">
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
