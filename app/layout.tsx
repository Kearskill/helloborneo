import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VoiceAssistant } from "@/app/components/VoiceAssistant";
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
        {/* The Mobile Phone Physical Frame */}
        <div className="w-full max-w-[430px] h-screen sm:h-[92vh] bg-white sm:rounded-[3rem] sm:border-[12px] sm:border-gray-900 shadow-2xl relative flex flex-col overflow-hidden ring-1 ring-gray-900/5">
          
          {/* NEW: Dynamic Island (Floating Pill) */}
          <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 h-[34px] w-[110px] bg-black rounded-full z-50"></div>

          {/* Fake Status Bar aligned with Dynamic Island */}
          <div className="hidden sm:flex absolute top-0 w-full h-14 justify-between items-center px-8 z-40 text-black font-semibold text-[15px]">
            {/* Time */}
            <span className="mt-1 tracking-tight">9:41</span>
            
            {/* Status Icons */}
            <div className="flex items-center gap-[5px] mt-1">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <BatteryMedium className="w-6 h-6" />
            </div>
          </div>

          {/* The Actual Screen / Scrollable Area */}
          <div className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto relative sm:pt-14 sm:pb-8">
            <main className="w-full min-h-full flex flex-col">
              {children}
            </main>
          </div>
          
          <VoiceAssistant />
          
        </div>
      </body>
    </html>
  );
}