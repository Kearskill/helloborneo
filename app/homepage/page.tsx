"use client"

import { ArrowLeftRight, Scan, History, ChevronRight, Eye, Search, Bell, User, ChevronDown, LayoutGrid } from "lucide-react";
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
    <div className="h-screen bg-[#F3F4F6] flex flex-col overflow-hidden w-full">

      {/* ── Blue Header ── */}
      <div className="bg-[#1873CC] px-4 pt-3 pb-5">
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
            <span className="text-sm">🇲🇾</span>
            <span className="text-white text-[11px] font-medium">MY</span>
            <ChevronDown className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1 bg-white rounded-full px-3 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Find products & services"
              className="flex-1 text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-4xl font-bold tracking-tight">RM {balance.toFixed(2)}</span>
            <Eye className="w-5 h-5 text-white/80" />
          </div>
          <button className="text-white/80 text-xs flex items-center gap-0.5">
            View balance details
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Add money / Transactions */}
        <div className="flex gap-2 items-center">
          <button className="border-2 border-white rounded-full px-4 py-1.5 text-white font-semibold text-sm">
            + Add money
          </button>
          <button
            onClick={() => router.push("/homepage/history")}
            className="text-white/90 font-semibold text-sm flex items-center gap-0.5"
          >
            Transactions
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4 space-y-4">

        {/* Summary card — directly below header */}
        <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-gray-400 text-xs mb-1">Monthly Summary</p>
          <p className="text-gray-900 font-bold text-3xl leading-tight">RM {spending.toFixed(2)}</p>
          <p className="text-gray-400 text-xs mt-1">spent this month</p>
        </div>

        {/* 2×2 action grid */}
        <div className="grid grid-cols-2 gap-3">

          {/* Transfer */}
          <button
            onClick={() => { advanceGuide(); router.push("/TransactionPage"); }}
            className={`bg-white rounded-2xl py-10 flex flex-col items-center justify-center gap-4 shadow-sm active:opacity-70 transition-all duration-300 ${
              pulseTransfer ? "ring-2 ring-[#1873CC] ring-offset-2 animate-pulse bg-blue-50" : ""
            }`}
          >
            <div className="w-16 h-16 bg-[#EBF3FF] rounded-full flex items-center justify-center">
              <ArrowLeftRight className="w-8 h-8 text-[#1873CC] stroke-[1.5]" />
            </div>
            <span className="text-base font-semibold text-gray-800">Transfer</span>
          </button>

          {/* Scan */}
          <button
            onClick={() => router.push("/homepage/scan")}
            className="bg-white rounded-2xl py-10 flex flex-col items-center justify-center gap-4 shadow-sm active:opacity-70"
          >
            <div className="w-16 h-16 bg-[#EBF3FF] rounded-full flex items-center justify-center">
              <Scan className="w-8 h-8 text-[#1873CC] stroke-[1.5]" />
            </div>
            <span className="text-base font-semibold text-gray-800">Scan</span>
          </button>

          {/* History */}
          <button
            onClick={() => router.push("/homepage/history")}
            className="bg-white rounded-2xl py-10 flex flex-col items-center justify-center gap-4 shadow-sm active:opacity-70"
          >
            <div className="w-16 h-16 bg-[#EBF3FF] rounded-full flex items-center justify-center">
              <History className="w-8 h-8 text-[#1873CC] stroke-[1.5]" />
            </div>
            <span className="text-base font-semibold text-gray-800">History</span>
          </button>

          {/* See More */}
          <button
            onClick={() => router.push("/MoreServices")}
            className="bg-white rounded-2xl py-10 flex flex-col items-center justify-center gap-4 shadow-sm active:opacity-70"
          >
            <div className="w-16 h-16 bg-[#EBF3FF] rounded-full flex items-center justify-center">
              <LayoutGrid className="w-8 h-8 text-[#1873CC] stroke-[1.5]" />
            </div>
            <span className="text-base font-semibold text-gray-800">See More</span>
          </button>

        </div>
      </div>
    </div>
  );
}
