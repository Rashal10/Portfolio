import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rashal Jeet Singh | Portfolio",
  description:
    "CS student building with AI, machine learning, and robotics. Projects in LLMs, computer vision, reinforcement learning, and full-stack development.",
  metadataBase: new URL("https://portfolio-rashal.vercel.app"),
  openGraph: {
    title: "Rashal Jeet Singh | Portfolio",
    description:
      "CS student building with AI, machine learning, and robotics.",
    url: "https://portfolio-rashal.vercel.app",
    siteName: "Rashal Jeet Singh",
    locale: "en_US",
    type: "website",
    images: ["/images/avatar.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashal Jeet Singh | Portfolio",
    description:
      "CS student building with AI, machine learning, and robotics.",
    images: ["/images/avatar.png"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="intro-pending">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
