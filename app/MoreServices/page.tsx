"use client"
import { useRouter } from "next/navigation";
import {
  ArrowLeft, FileText, Smartphone, Radio, ShoppingCart, ParkingCircle,
  Gift, Tag, TrendingUp, Shield, Banknote, ClipboardList, Briefcase, KeyRound, AlertTriangle
} from "lucide-react";

const SERVICES = [
  { label: "Pay Bills", icon: FileText },
  { label: "Mobile Reload / Top-up", icon: Smartphone },
  { label: "Toll Payment", icon: Radio },
  { label: "Online Payments", icon: ShoppingCart },
  { label: "Parking Payment", icon: ParkingCircle },
  { label: "Cashback & Rewards", icon: Gift },
  { label: "Vouchers / Deals", icon: Tag },
  { label: "GO+ Investment", icon: TrendingUp },
  { label: "Insurance (GOprotect)", icon: Shield },
  { label: "Loans / Financing", icon: Banknote },
  { label: "Sales Tracking", icon: ClipboardList },
  { label: "Business Tools", icon: Briefcase },
  { label: "PIN Security", icon: KeyRound },
  { label: "Fraud Protection", icon: AlertTriangle },
];

export default function MoreServicesPage() {
  const router = useRouter();

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Blue header */}
      <div className="bg-[#0066CC] px-4 pt-10 pb-5">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl font-bold">More Services</h1>
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
