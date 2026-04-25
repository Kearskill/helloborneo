"use client"

import { X, Zap, Image as ImageIcon, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col w-full relative">
      {/* Camera View Simulation */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Scanning Frame */}
        <div className="relative w-64 h-64">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#1873CC]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#1873CC]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#1873CC]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#1873CC]" />
          
          {/* Scanning Line Animation Simulation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1873CC]/50 shadow-[0_0_15px_#1873CC] animate-scan" />
        </div>
        
        <p className="text-white mt-12 text-sm font-medium">Scan any QR code to pay</p>
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <button 
          onClick={() => router.back()}
          className="bg-black/40 p-2 rounded-full text-white backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>
        <button className="bg-black/40 p-2 rounded-full text-white backdrop-blur-md">
          <Zap className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="bg-black/80 backdrop-blur-xl p-8 pb-24 flex justify-around items-center border-t border-white/10">
        <button className="flex flex-col items-center gap-2">
          <div className="bg-white/10 p-4 rounded-full text-white">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-white text-xs">Album</span>
        </button>

        <button className="flex flex-col items-center gap-2">
          <div className="bg-[#1873CC] p-6 rounded-full text-white shadow-[0_0_20px_rgba(24,115,204,0.4)]">
            <QrCode className="w-8 h-8" />
          </div>
          <span className="text-white text-xs font-bold">My QR</span>
        </button>

        <div className="w-20" /> {/* Spacer */}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s infinite linear;
        }
      `}</style>
    </div>
  );
}
