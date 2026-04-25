"use client"
import { ArrowLeft, User, RefreshCw, ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGuide } from "@/app/context/GuideContext";
import { useLanguage } from '../context/LanguageContext';

const CONTACTS = [
  { name: "Ali", phone: "+60 11-5123 4567" },
  { name: "Bob", phone: "+60 14-5566 7788" },
  { name: "Danish", phone: "+60 10-1122 3344" },
];

export default function TransactionPage() {
  const router = useRouter();
  const { guide, advanceGuide } = useGuide();
  const [search, setSearch] = useState("");
  const balance = 125.50;
  const { t } = useLanguage(); // Called inside the component

  // Auto-populate search from guide
  const effectiveSearch = guide.active && guide.step === "select-contact" && !search
    ? guide.contactName
    : search;

  const filtered = CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      c.phone.includes(effectiveSearch)
  );

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Blue Header */}
      <div className="bg-[#0066CC] px-4 pt-10 pb-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()} className="text-white p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl font-bold">{t.transfer || "Transfer"}</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/30">

        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {/* Country code */}
          <button className="flex items-center gap-1 text-gray-700 font-medium text-sm border border-gray-300 rounded-lg px-3 py-2">
            <span>+60</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.enterNameOrPhone || "Enter name or phone..."}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none py-2"
          />

          {/* Refresh */}
          <button className="text-[#0066CC]">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((contact, i) => {
          const isGuided = guide.active && guide.step === "select-contact" &&
            contact.name.toLowerCase().includes(guide.contactName)
          return (
            <button
              key={i}
              onClick={() => {
                if (isGuided) advanceGuide()
                router.push(
                  `/TransferMoney?name=${encodeURIComponent(contact.name)}&phone=${encodeURIComponent(contact.phone)}`
                )
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 transition-colors border-b border-gray-100 ${isGuided
                ? "bg-blue-50 ring-2 ring-inset ring-[#1873CC] animate-pulse"
                : "hover:bg-gray-50 active:bg-gray-100"
                }`}
            >
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-[#E8F0FB] flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-[#0066CC]" />
              </div>

              {/* Info */}
              <div className="text-left">
                <p className="text-gray-900 font-semibold text-sm">{contact.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{contact.phone}</p>
              </div>
            </button>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <User className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">{t.noContactFound || "No contacts found"}</p>
          </div>
        )}
      </div>

      {/* Bottom balance bar */}
      <div className="px-4 py-3 pb-24 border-t border-gray-200 bg-white flex items-center justify-center gap-2">
        <p className="text-gray-600 text-sm">
          {t.transferableEWalletBalance || "Transferable eWallet balance: "}{" "}
          <span className="font-semibold text-gray-800">RM {balance.toFixed(2)}</span>
        </p>
        <button className="text-[#0066CC]">
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
