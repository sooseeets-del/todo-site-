import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFade from "@/components/PageFade";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Server Component layout: fast first load, shared shell, SEO-ready.
export const metadata: Metadata = {
  title: "TaskFlow — Simple To-Do App",
  description:
    "Sign up, add tasks with priority and due date, and track what is urgent. Your tasks stay saved in the cloud.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E0C" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${display.variable} min-h-screen bg-bg font-sans text-ink antialiased`}
      >
        <ToastProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">
            <PageFade>{children}</PageFade>
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
