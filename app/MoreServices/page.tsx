"use client"
import { useRouter } from "next/navigation";
import {
  ArrowLeft, FileText, Smartphone, Radio, ShoppingCart, ParkingCircle,
  Gift, Tag, TrendingUp, Shield, Banknote, ClipboardList, Briefcase, KeyRound, AlertTriangle
} from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

export default function MoreServicesPage() {
  const router = useRouter();
  const { t } = useLanguage(); // Called inside the component

  // Define the array inside the component so it has access to 't'
  const SERVICES = [
    { label: t.payBills, icon: FileText },
    { label: t.mobileReload, icon: Smartphone },
    { label: t.tollPayment, icon: Radio },
    { label: t.onlinePayments, icon: ShoppingCart },
    { label: t.parkingPayment, icon: ParkingCircle },
    { label: t.cashbackNRewards, icon: Gift },
    { label: t.vouchersNDeals, icon: Tag },
    { label: t.GOInvestment, icon: TrendingUp },
    { label: t.insuranceGoProtect, icon: Shield },
    { label: t.loansFinancing, icon: Banknote },
    { label: t.salesTracking, icon: ClipboardList },
    { label: t.businessTools, icon: Briefcase },
    { label: t.pinSecurity, icon: KeyRound },
    { label: t.fraudProtection, icon: AlertTriangle },
  ];

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Blue header */}
      <div className="bg-[#0066CC] px-4 pt-10 pb-5">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          {/* Use localized title if available, or stay as 'More Services' */}
          <h1 className="text-white text-xl font-bold">{t.moreServices || "More Services"}</h1>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4">
          {SERVICES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm active:scale-[0.97] transition-transform"
            >
              <div className="bg-[#E8F0FB] rounded-full p-3">
                <Icon className="w-6 h-6 text-[#0066CC]" />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}