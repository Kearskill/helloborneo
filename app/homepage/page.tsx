"use client"

import { ArrowLeftRight, Scan, History, ChevronRight, Eye, Search, Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGuide } from "@/app/context/GuideContext";

export default function App() {
  const router = useRouter();
  const { guide, advanceGuide } = useGuide();
  const [balance] = useState(251.82);
  const [spending] = useState(450.75);

  const pulseTransfer = guide.active && guide.step === "press-transfer";

  return (
    <div className="min-h-screen h-screen bg-[#F3F4F6] flex flex-col overflow-hidden w-full">
      {/* Status Bar Simulation */}
      {/* <div className="bg-[#1873CC] px-3 pt-2 pb-1.5 flex items-center justify-between text-white text-[10px]">
        <span>20:02</span>
        <div className="flex gap-1 items-center">
          <span>4G+</span>
          <span>📶</span>
          <span>🔋 91</span>
        </div>
      </div> */}

      {/* Header */}
      <div className="bg-[#1873CC] px-3 pt-2 pb-4">
        {/* Top Bar */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
            <span className="text-sm">🇲🇾</span>
            <span className="text-white text-[10px] font-medium">MY</span>
            <ChevronDown className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Find products & services"
              className="flex-1 text-xs text-gray-600 outline-none bg-transparent placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-white text-3xl font-bold">RM {balance.toFixed(2)}</span>
            <Eye className="w-5 h-5 text-white" />
          </div>
          <button className="text-white/90 text-xs flex items-center gap-0.5">
            View balance details
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center">
          <button className="border-2 border-white rounded-full px-4 py-1.5 text-white font-semibold text-xs flex items-center gap-1">
            + Add money
          </button>
          <button
            onClick={() => router.push("/homepage/history")}
            className="text-white font-semibold text-xs flex items-center gap-0.5"
          >
            Transactions
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div >
      </div >

      {/* Main Content */}
      <div className="flex-1 px-3 -mt-3 overflow-y-auto pb-24">
        {/* Main Actions Card */}
        <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => { advanceGuide(); router.push("/TransactionPage"); }}
              className={`flex flex-col items-center gap-1.5 active:opacity-70 py-1 rounded-xl transition-all duration-300 ${
                pulseTransfer ? "ring-2 ring-[#1873CC] ring-offset-2 animate-pulse bg-blue-50" : ""
              }`}
            >
              <ArrowLeftRight className="w-6 h-6 text-[#1873CC] stroke-[1.5]" />
              <span className="text-[11px] text-gray-800">Transfer</span>
            </button>

            <button
              onClick={() => router.push("/homepage/scan")}
              className="flex flex-col items-center gap-1.5 active:opacity-70 py-1"
            >
              <Scan className="w-6 h-6 text-[#1873CC] stroke-[1.5]" />
              <span className="text-[11px] text-gray-800">Scan</span>
            </button>

            <button
              onClick={() => router.push("/homepage/history")}
              className="flex flex-col items-center gap-1.5 active:opacity-70 py-1"
            >
              <History className="w-6 h-6 text-[#1873CC] stroke-[1.5]" />
              <span className="text-[11px] text-gray-800">History</span>
            </button>
          </div >
        </div >

        {/* See More Button */}
        < button onClick={() => router.push("/MoreServices")} className="w-full bg-white rounded-xl p-2.5 flex items-center justify-center gap-1.5 mb-3 shadow-sm active:opacity-70" >
          <span className="text-[#1873CC] font-semibold text-xs">See More</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#1873CC]" />
        </button >

        {/* Summary Section */}
        < div className="bg-white rounded-xl p-3 shadow-sm mb-3" >
          <h3 className="text-gray-800 font-semibold text-sm mb-2">Summary</h3>
          <p className="text-gray-500 text-[10px] mb-0.5">You spent</p>
          <p className="text-gray-900 font-bold text-2xl mb-0.5">RM {spending.toFixed(2)}</p>
          <p className="text-gray-400 text-[10px]">This month</p>
        </div >
      </div >
    </div >
  );
}
