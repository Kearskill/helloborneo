"use client"
import { ArrowLeftRight, Scan, History, Mic, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [balance] = useState(125.50);
  const [spending] = useState(450.75);

  return (
    <div className="size-full bg-gradient-to-b from-[#0066CC] to-[#0052A3] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-white text-3xl font-bold tracking-tight">Touch 'n Go</h1>
        <p className="text-white/80 text-sm mt-1">eWallet</p>
      </div>

      {/* Balance Card */}
      <div className="mx-6 mb-6 bg-white rounded-2xl shadow-lg p-5">
        <p className="text-gray-500 text-sm mb-1">Available Balance</p>
        <p className="text-4xl font-bold text-[#0066CC] mb-4">RM {balance.toFixed(2)}</p>
        <div className="flex gap-2">
          <button className="flex-1 bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Reload
          </button>
          <button className="flex-1 border-2 border-[#0066CC] text-[#0066CC] px-4 py-2 rounded-lg text-sm font-medium">
            Pay
          </button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6 mb-6 flex-1">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <button
            onClick={() => router.push("/TransactionPage")}
            className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 shadow-md active:scale-[0.98] transition-transform">
            <div className="bg-[#0066CC] rounded-full p-3">
              <ArrowLeftRight className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Transfer</span>
          </button>

          <button className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 shadow-md active:scale-[0.98] transition-transform">
            <div className="bg-[#0066CC] rounded-full p-3">
              <Scan className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Scan</span>
          </button>

          <button className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 shadow-md active:scale-[0.98] transition-transform">
            <div className="bg-[#0066CC] rounded-full p-3">
              <History className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">History</span>
          </button>
        </div>

        <button className="w-full bg-white/30 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center gap-2 border border-white/40 active:scale-[0.98] transition-transform">
          <span className="text-white font-semibold">See More</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Summary Section */}
        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
          <h3 className="text-white font-semibold text-lg mb-2">Monthly Summary</h3>
          <p className="text-white/90">You spent <span className="font-bold text-xl">RM {spending.toFixed(2)}</span></p>
          <p className="text-white/70 text-sm mt-1">This month</p>
        </div>
      </div>

      {/* Voice Assistant Button */}
      <div className="px-6 pb-8">
        <button className="w-full bg-white rounded-2xl p-6 flex items-center justify-center gap-4 shadow-xl active:scale-[0.98] transition-transform">
          <div className="bg-[#0066CC] rounded-full p-3">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#0066CC]">TnG Suara</span>
        </button>
      </div>
    </div>
  );
}