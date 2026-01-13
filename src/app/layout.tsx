import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://app-hub-puce.vercel.app/"),
  title: "App Hub",
  description: "Aplicação para centralizar links internos e externos",
  authors: [{ name: "Ricardo Martins "}, { name: "Lara Vieira" }],
  openGraph: {
    title: "App Hub",
    description: "Aplicação para centralizar links internos e externos",
    url: "https://app-hub-puce.vercel.app/",
    siteName: "App Hub",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "/israelfrota.png",
        alt: "App Hub",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
