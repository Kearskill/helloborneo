import { ArrowLeft } from "lucide-react";

interface HistoryPageProps {
  onBack: () => void;
}

export default function HistoryPage({ onBack }: HistoryPageProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-[#1873CC] px-3 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white font-bold text-lg">Transaction History</h2>
      </div>
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="bg-white rounded-xl p-3 mb-2">
          <p className="font-semibold text-sm">Starbucks Coffee</p>
          <p className="text-gray-500 text-xs">Today, 14:30</p>
          <p className="text-red-600 font-bold text-sm">- RM 18.50</p>
        </div>
        <div className="bg-white rounded-xl p-3 mb-2">
          <p className="font-semibold text-sm">Parking Fee</p>
          <p className="text-gray-500 text-xs">Today, 12:15</p>
          <p className="text-red-600 font-bold text-sm">- RM 5.00</p>
        </div>
      </div>
    </div>
  );
}
