"use client"
import { createContext, useContext, useState, ReactNode } from "react"

export type GuideStep =
  | "press-transfer"      // homepage: pulse Transfer button
  | "select-contact"      // TransactionPage: pulse matching contact
  | "enter-amount"        // TransferMoney: amount pre-filled, pulse Next
  | "done"
  | null

export interface GuideState {
  active: boolean
  contactName: string   // e.g. "ali"
  amount: string        // e.g. "50"
  step: GuideStep
}

interface GuideContextValue {
  guide: GuideState
  startGuide: (contactName: string, amount: string) => void
  advanceGuide: () => void
  clearGuide: () => void
}

const defaultGuide: GuideState = { active: false, contactName: "", amount: "", step: null }

const GuideContext = createContext<GuideContextValue>({
  guide: defaultGuide,
  startGuide: () => {},
  advanceGuide: () => {},
  clearGuide: () => {},
})

const STEP_ORDER: GuideStep[] = ["press-transfer", "select-contact", "enter-amount", "done"]

export function GuideProvider({ children }: { children: ReactNode }) {
  const [guide, setGuide] = useState<GuideState>(defaultGuide)

  const startGuide = (contactName: string, amount: string) => {
    setGuide({ active: true, contactName: contactName.toLowerCase(), amount, step: "press-transfer" })
  }

  const advanceGuide = () => {
    setGuide((prev) => {
      const idx = STEP_ORDER.indexOf(prev.step)
      const next = STEP_ORDER[idx + 1] ?? "done"
      return { ...prev, step: next, active: next !== "done" }
    })
  }

  const clearGuide = () => setGuide(defaultGuide)

  return (
    <GuideContext.Provider value={{ guide, startGuide, advanceGuide, clearGuide }}>
      {children}
    </GuideContext.Provider>
  )
}

export const useGuide = () => useContext(GuideContext)
