import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";
import { VoiceAssistant } from "@/app/components/VoiceAssistant";
import { GuideProvider } from "@/app/context/GuideContext";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TnG Suara App",
  description: "Touch 'n Go Voice Assistant Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen flex items-center justify-center`}
      >
        <LanguageProvider>
          {/* Container with 19.5:9 aspect ratio */}
          <div className="w-full max-w-[430px] aspect-[9/19.5] bg-white shadow-2xl relative flex flex-col overflow-hidden">

            {/* The Actual Screen / Scrollable Area */}
            <div className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto relative sm:pt-14 sm:pb-8">
              <GuideProvider>
                <main className="w-full min-h-full flex flex-col">
                  {children}
                </main>
                <VoiceAssistant />
              </GuideProvider>
            </div>

          </div>
        </LanguageProvider >
      </body >
    </html >
  );
}
