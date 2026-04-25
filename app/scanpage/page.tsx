import { ArrowLeft } from "lucide-react";

interface ScanPageProps {
  onBack: () => void;
}

export default function ScanPage({ onBack }: ScanPageProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-[#1873CC] px-3 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white font-bold text-lg">Scan QR</h2>
      </div>
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="w-64 h-64 border-4 border-white rounded-2xl"></div>
      </div>
    </div>
  );
}
