
import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { LoadingProvider } from "@/contexts/loading-context";
import ParticleBackground from "@/components/particle-background";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shreyan Panda — Full Stack Developer & AI/ML Enthusiast",
  description:
    "Portfolio of Shreyan Panda, a Computer Science student at KIIT University. Full Stack Developer, AI/ML enthusiast, SIH 2024 Finalist, and open-source contributor.",
  keywords: ["Shreyan Panda", "Full Stack Developer", "AI ML", "React", "Next.js", "Portfolio", "KIIT"],
  openGraph: {
    title: "Shreyan Panda — Full Stack Developer",
    description: "Building impactful software with AI, web, and open source.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${robotoMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <LoadingProvider>
          {/* Particle Background */}
          <ParticleBackground />

          {/* Sticky header */}
          <Header />

          {/* Main content */}
          <main className="flex-grow container mx-auto px-4 py-4 md:py-6 relative z-10">
            <MotionProvider>
              {children}
            </MotionProvider>
          </main>

          {/* Footer */}
          <Footer />
        </LoadingProvider>

        <Toaster />
      </body>
    </html>
  );
}
