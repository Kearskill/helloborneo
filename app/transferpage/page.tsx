import { ArrowLeft } from "lucide-react";

interface TransferPageProps {
  onBack: () => void;
}

export default function TransferPage({ onBack }: TransferPageProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-[#1873CC] px-3 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white font-bold text-lg">Transfer</h2>
      </div>
      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="bg-white rounded-xl p-4 mb-3">
          <p className="text-gray-600 text-sm mb-2">Transfer to</p>
          <input
            type="text"
            placeholder="Phone number or email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-gray-600 text-sm mb-2">Amount</p>
          <input
            type="number"
            placeholder="RM 0.00"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
