import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "TowerTV - Free Live TV Channels",
  description:
    "Watch thousands of free live TV channels from around the world.",
  keywords: ["iptv", "live tv", "streaming", "free tv", "channels"],
  openGraph: {
    title: "TowerTV - Free Live TV Channels",
    description:
      "Watch thousands of free live TV channels from around the world.",
    type: "website",
    siteName: "TowerTV",
  },
  twitter: {
    card: "summary_large_image",
    title: "TowerTV - Free Live TV Channels",
    description:
      "Watch thousands of free live TV channels from around the world.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0806" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            closeButton
            toastOptions={{
              style: {
                background: "hsl(22 20% 6%)",
                border: "1px solid rgb(255 140 26 / 0.3)",
                color: "#ff8c1a",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
