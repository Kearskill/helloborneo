"use client"
import { ArrowLeft, User, ShieldCheck, Info } from "lucide-react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function TransferMoneyContent() {
  const router = useRouter();
  const params = useSearchParams();

  const name = params.get("name") ?? "Unknown";
  const phone = params.get("phone") ?? "";

  const balance = 125.50;
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Fund Transfer");

  const numericAmount = parseFloat(amount) || 0;
  const isValid = numericAmount > 0 && numericAmount <= balance;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and a single decimal point
    const val = e.target.value.replace(/[^0-9.]/g, "");
    const parts = val.split(".");
    if (parts.length > 2) return;
    if (parts[1]?.length > 2) return;
    setAmount(val);
  };

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Blue header */}
      <div className="bg-[#0066CC] px-4 pt-10 pb-5">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl font-bold">Transfer Money</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Transfer to */}
        <div>
          <p className="text-[#0066CC] text-sm font-semibold mb-2">Transfer to</p>

          {/* Recipient card */}
          <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-4 bg-gray-50">
            <div className="w-12 h-12 rounded-full bg-[#E8F0FB] flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-[#0066CC]" />
            </div>
            <div>
              <p className="text-gray-900 font-bold text-base uppercase tracking-wide">
                {name}
              </p>
              <p className="text-gray-500 text-sm mt-0.5">{phone}</p>
            </div>
          </div>

          {/* Verify notice */}
          <div className="mt-2 flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
            <ShieldCheck className="w-4 h-4 text-[#0066CC] shrink-0" />
            <p className="text-xs text-gray-600">
              Always verify recipient name before transferring.
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="border-b border-gray-200 pb-4">
          <p className="text-gray-500 text-sm mb-1">Amount</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[#0066CC] text-2xl font-bold">RM</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="text-[#0066CC] text-4xl font-bold outline-none bg-transparent w-full placeholder-[#0066CC]/40"
            />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-gray-400 text-xs">
              You can transfer up to{" "}
              <span className="font-semibold text-gray-600">RM {balance.toFixed(2)}</span>
            </p>
            <Info className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* Transfer note */}
        <div className="border-b border-gray-200 pb-4">
          <p className="text-gray-400 text-xs mb-1">What&apos;s the transfer for?</p>
          <input
            type="text"
            value={note}
            onChange={(e) => {
              if (e.target.value.length <= 50) setNote(e.target.value);
            }}
            className="w-full text-gray-900 font-semibold text-base outline-none bg-transparent"
          />
          <p className="text-right text-xs text-gray-400 mt-1">{note.length}/50</p>
        </div>
      </div>

      {/* Next button */}
      <div className="px-4 pb-8 pt-3">
        <button
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity ${
            isValid ? "bg-[#0066CC] active:opacity-80" : "bg-[#0066CC]/40 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function TransferMoneyPage() {
  return (
    <Suspense>
      <TransferMoneyContent />
    </Suspense>
  );
}
