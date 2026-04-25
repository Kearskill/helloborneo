"use client"

import { ArrowLeft, Search, Filter, Download } from "lucide-react";
import { useRouter } from "next/navigation";

const transactions = [
  {
    id: 1,
    title: "Family Mart - Mid Valley",
    date: "24 Apr 2026, 12:45 PM",
    amount: -15.50,
    type: "payment",
    category: "Food & Beverage"
  },
  {
    id: 2,
    title: "Reload - Online Banking",
    date: "23 Apr 2026, 10:20 AM",
    amount: 100.00,
    type: "deposit",
    category: "Reload"
  },
  {
    id: 3,
    title: "Grab - Riding",
    date: "22 Apr 2026, 06:15 PM",
    amount: -12.00,
    type: "payment",
    category: "Transport"
  },
  {
    id: 4,
    title: "Shell - Petrol",
    date: "21 Apr 2026, 08:30 AM",
    amount: -50.00,
    type: "payment",
    category: "Transport"
  },
  {
    id: 5,
    title: "Transfer from John Doe",
    date: "20 Apr 2026, 02:00 PM",
    amount: 25.00,
    type: "deposit",
    category: "Transfer"
  },
  {
    id: 6,
    title: "Starbucks Coffee",
    date: "19 Apr 2026, 03:45 PM",
    amount: -18.90,
    type: "payment",
    category: "Food & Beverage"
  }
];

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col w-full">
      {/* Header */}
      <div className="bg-[#1873CC] px-4 pt-4 pb-4 flex items-center gap-4 sticky top-0 z-10">
        <button 
          onClick={() => router.back()}
          className="text-white p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl font-semibold">Transaction History</h1>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white px-4 py-3 flex gap-2 border-b">
        <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search transactions" 
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
        <button className="p-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 border rounded-lg hover:bg-gray-50">
          <Download className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="bg-white mt-2">
          {transactions.map((tx, index) => (
            <div 
              key={tx.id} 
              className={`px-4 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                index !== transactions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'deposit' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    tx.type === 'deposit' ? 'bg-green-600' : 'bg-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{tx.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{tx.date}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{tx.category}</p>
                </div>
              </div>
              <div className={`text-sm font-bold ${
                tx.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-8 text-center">
          <p className="text-gray-400 text-sm">Showing last 30 days of transactions</p>
        </div>
      </div>
    </div>
  );
}
