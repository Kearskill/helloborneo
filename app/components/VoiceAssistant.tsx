"use client"

import { useState, useEffect } from "react"
import { Mic } from "lucide-react"
import { cn } from "@/app/components/ui/utils"
import { usePathname } from "next/navigation"

export function VoiceAssistant() {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const [visualizerHeights, setVisualizerHeights] = useState<string[]>([])
  
  useEffect(() => {
    setVisualizerHeights([1, 2, 3, 4, 5].map(() => `${Math.random() * 100 + 20}%`))
  }, [])

  // Visibility logic:
  // 1. Never show on root path
  if (pathname === "/") return null

  // 2. On homepage, always show (active or inactive)
  // 3. On other pages, only show if active
  const isHomepage = pathname === "/homepage"
  if (!isHomepage && !isActive) return null

  return (
    <>
      {/* Blue border overlay when active */}
      {isActive && (
        <div 
          className="fixed inset-0 border-[6px] border-[#1873CC] shadow-[inset_0_0_20px_rgba(24,115,204,0.5)] z-40 pointer-events-none animate-pulse"
        />
      )}

      {/* Button Container */}
      <div className={cn(
        "fixed bottom-6 z-50 transition-all duration-500 pointer-events-none flex items-center justify-center",
        isActive ? "right-6" : "left-0 right-0"
      )}>
        <button
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "pointer-events-auto shadow-2xl transition-all duration-500 transform active:scale-[0.9] flex items-center justify-center overflow-hidden",
            isActive 
              ? "w-14 h-14 rounded-full bg-white border-2 border-[#1873CC] scale-110" 
              : "w-[calc(100%-2rem)] rounded-2xl py-4 gap-3 bg-[#1873CC] text-white"
          )}
        >
          {isActive ? (
            <div className="flex items-center gap-0.5 h-6">
              {visualizerHeights.map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#1873CC] rounded-full animate-bounce"
                  style={{
                    height: `calc(${height} * 0.7)`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s'
                  }}
                />
              ))}
            </div>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold italic">TnG Suara</span>
            </>
          )}
        </button>
      </div>
    </>
  )
}
