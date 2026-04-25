"use client"

import { useState, useEffect } from "react"
import { Mic, Send } from "lucide-react" 
import { cn } from "@/app/components/ui/utils"
import { usePathname } from "next/navigation"

export function VoiceAssistant() {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const [visualizerHeights, setVisualizerHeights] = useState<string[]>([])
  const [transcript, setTranscript] = useState("")

  useEffect(() => {
    setVisualizerHeights([1, 2, 3, 4, 5].map(() => `${Math.random() * 100 + 20}%`))
  }, [])

  // --- SMART VISIBILITY LOGIC ---
  // 1. Never show on the root onboarding page.
  if (pathname === "/") return null

  // 2. Check if we are currently on the homepage.
  const isHomepage = pathname === "/homepage"
  
  // 3. If we are NOT on the homepage, AND the assistant is NOT active, hide it.
  // This means it will stay visible on other pages ONLY if the user is actively using it.
  if (!isHomepage && !isActive) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() 
    if (transcript.trim()) {
      console.log("Submitting query:", transcript)
      // TODO: Add your AI processing logic here
      setTranscript("")
    }
  }

  return (
    <>
      {/* Screen Edge Glow */}
      {isActive && (
        <div 
          className="absolute inset-0 border-[4px] border-[#1873CC]/80 shadow-[inset_0_0_15px_rgba(24,115,204,0.4)] z-40 animate-pulse pointer-events-none"
          style={{ touchAction: 'none' }} 
        />
      )}

      {/* Text Box Pill */}
      {isActive && (
        <div className="absolute bottom-6 left-4 right-24 z-50 animate-in slide-in-from-right-8 duration-300">
          <form 
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-full shadow-2xl border border-gray-200 flex items-center h-14 relative pl-6 pr-14"
          >
            <input 
              type="text"
              placeholder="Ask TnG Suara..."
              className="w-full h-full bg-transparent border-none outline-none text-[#1873CC] placeholder-[#1873CC]/50 font-medium text-base"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <button 
                type="submit"
                disabled={!transcript.trim()}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 touch-manipulation",
                  transcript.trim() 
                    ? "bg-[#1873CC] text-white shadow-md active:scale-95" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                <Send className="w-[18px] h-[18px] ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* The Toggle Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          "absolute bottom-6 z-50 shadow-2xl transition-all duration-500 transform active:scale-[0.98] flex items-center justify-center overflow-hidden touch-manipulation",
          isActive 
            ? "right-4 w-14 h-14 rounded-full bg-white border-2 border-[#1873CC]" 
            : "left-4 right-4 h-14 rounded-2xl bg-[#1873CC] text-white"
        )}
      >
        {isActive ? (
          <div className="flex items-center gap-[3px] h-6">
            {visualizerHeights.map((height, i) => (
              <div
                key={i}
                className="w-[3px] bg-[#1873CC] rounded-full animate-bounce"
                style={{
                  height: `calc(${height} * 0.6)`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.7s'
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="relative flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold italic">TnG Suara</span>
          </div>
        )}
      </button>
    </>
  )
}