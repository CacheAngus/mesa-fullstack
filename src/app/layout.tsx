import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Cousine, Genos } from "next/font/google";
import "./globals.css";
import { RouteProvider } from "@/src/providers/route-provider";
import { ThemeProvider } from "@/src/providers/theme-provider";

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

const genos = Genos({
    variable: "--font-genos",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mesa Solutions",
    description: "Mesa Solutions",
};

export const viewport: Viewport = {
    colorScheme: "light",
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
                <RouteProvider>
                    <ThemeProvider>{children} </ThemeProvider>
                </RouteProvider>
            </body>
        </html>
    );
}
