"use client"
import { CheckCircle } from "lucide-react";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGuide } from "@/app/context/GuideContext";
import { useLanguage } from '../context/LanguageContext';

function TransferSuccessContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { clearGuide } = useGuide();

  const { t } = useLanguage(); // Called inside the component

  const name = params.get("name") ?? "Unknown";
  const phone = params.get("phone") ?? "";
  const amount = params.get("amount") ?? "0.00";
  const note = params.get("note") ?? "Fund Transfer";

  const [ref, setRef] = useState("");

  useEffect(() => { clearGuide(); }, [clearGuide]);
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    setRef("TNG" + Date.now().toString().slice(-8));

    const now = new Date();
    setDateStr(now.toLocaleDateString("en-MY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }));
    setTimeStr(now.toLocaleTimeString("en-MY", {
      hour: "2-digit",
      minute: "2-digit",
    }));
  }, []);

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Blue top section */}
      <div className="bg-[#0066CC] flex flex-col items-center pt-16 pb-10 px-6">
        {/* Success icon */}
        <div className="bg-white rounded-full p-3 mb-4 shadow-lg">
          <CheckCircle className="w-14 h-14 text-[#0066CC]" strokeWidth={1.5} />
        </div>
        <p className="text-white/80 text-sm font-medium">{t.transferSuccessful || "Transfer Successful"}</p>
        <p className="text-white text-5xl font-bold mt-2">
          RM {parseFloat(amount).toFixed(2)}
        </p>
      </div>

      {/* Receipt card */}
      <div className="mx-5 -mt-5 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Recipient row */}
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-gray-400 text-xs mb-1">{t.transferTo || "Transferred to"}</p>
          <p className="text-gray-900 font-bold text-base uppercase">{name}</p>
          <p className="text-gray-500 text-sm">{phone}</p>
        </div>

        {/* Details grid */}
        <div className="px-5 py-4 space-y-3">
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">{t.date || "Date"}</p>
            <p className="text-gray-800 text-sm font-medium">{dateStr}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">{t.time || "Time"}</p>
            <p className="text-gray-800 text-sm font-medium">{timeStr}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">{t.note || "Note"}</p>
            <p className="text-gray-800 text-sm font-medium">{note}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">{t.reference || "Reference"}</p>
            <p className="text-gray-800 text-sm font-medium">{ref}</p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Back to home button */}
      <div className="px-5 pb-24 pt-4">
        <button
          onClick={() => router.push("/homepage")}
          className="w-full py-4 bg-[#0066CC] text-white font-bold text-base rounded-2xl active:opacity-80 transition-opacity"
        >
          {t.backToHome || "Back to Home"}
        </button>
      </div>
    </div>
  );
}

export default function TransferSuccessPage() {
  return (
    <Suspense>
      <TransferSuccessContent />
    </Suspense>
  );
}
