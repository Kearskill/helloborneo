"use client"

import { useState, useEffect } from "react"
import { Mic, Send, Loader2 } from "lucide-react"
import { cn } from "@/app/components/ui/utils"
import { usePathname } from "next/navigation"
import { useGuide } from "@/app/context/GuideContext"
import { processAiQuery } from "@/app/actions"

export function VoiceAssistant() {
  const pathname = usePathname()
  const { startGuide } = useGuide()
  const [isActive, setIsActive] = useState(false)
  const [visualizerHeights, setVisualizerHeights] = useState<string[]>([])
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setVisualizerHeights([1, 2, 3, 4, 5].map(() => `${Math.random() * 100 + 20}%`))
  }, [])

  if (pathname === "/") return null
  const isHomepage = pathname === "/homepage"

  // If we are NOT on the homepage, AND the assistant is NOT active, hide it.
  if (!isHomepage && !isActive) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const query = transcript.trim()
    if (!query || isProcessing) return

    setTranscript("")
    setIsProcessing(true)

    try {
      const result = await processAiQuery(query)
      console.log("Qwen AI Response:", result);

      if (result.error) {
        setFeedback(`Error: ${result.error}`)
      } else if (result.data) {
        const { type, recipient, amount, reasoning } = result.data

        if (type === "transaction" && recipient && amount) {
          startGuide(recipient.toString(), amount.toString())
          setFeedback(`Guiding: Transfer RM${amount} to ${recipient}`)
          setIsActive(false)
        } else {
          setFeedback(reasoning || "How else can I help you today?")
        }
      } else if (result.text) {
        setFeedback(result.text)
      }
    } catch (err) {
      console.error("Failed to process AI query:", err)
      setFeedback("Sorry, I encountered an error. Please try again.")
    } finally {
      setIsProcessing(false)
      setTimeout(() => setFeedback(""), 5000)
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

      {/* Feedback toast */}
      {feedback && (
        <div className="absolute bottom-24 left-4 right-4 z-50 bg-[#1873CC] text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg text-center">
          {feedback}
        </div>
      )}

      {/* Text input pill */}
      {isActive && (
        <div className="absolute bottom-6 left-4 right-24 z-50 animate-in slide-in-from-right-8 duration-300">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-full shadow-2xl border border-gray-200 flex items-center h-14 relative pl-6 pr-14"
          >
            <input
              type="text"
              placeholder='e.g. "transfer to Ali RM50"'
              className="w-full h-full bg-transparent border-none outline-none text-[#1873CC] placeholder-[#1873CC]/50 font-medium text-sm"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              autoFocus
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <button
                type="submit"
                disabled={!transcript.trim() || isProcessing}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 touch-manipulation",
                  transcript.trim() && !isProcessing
                    ? "bg-[#1873CC] text-white shadow-md active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-[18px] h-[18px] ml-0.5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle button */}
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
                style={{ height: `calc(${height} * 0.6)`, animationDelay: `${i * 0.1}s`, animationDuration: "0.7s" }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <Mic className="w-6 h-6 text-white" />
            <span className="text-xl font-bold italic">TnG Suara</span>
          </div>
        )}
      </button>
    </>
  )
}
