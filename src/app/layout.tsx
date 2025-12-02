import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Cousine } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const cousine = Cousine({
    variable: "--font-cousine-sans",
    subsets: ["latin"],
    weight: "700",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mesa Solutions",
    description: "Mesa Solutions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable}${cousine.variable}${inter.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
