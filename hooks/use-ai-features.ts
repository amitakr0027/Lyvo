"use client"

import { useState } from "react"
import type { AISummary, AIRecap } from "@/lib/types"
import { api } from "@/lib/api"

export function useAIFeatures() {
  const [summary, setSummary] = useState<AISummary | null>(null)
  const [recap, setRecap] = useState<AIRecap | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSummary = async (meetingId: string) => {
    setLoading(true)
    try {
      const result = await api.ai.generateSummary(meetingId)
      if (result.success) {
        setSummary(result.data)
      } else {
        setError(result.error || "Failed to generate summary")
      }
    } catch (err) {
      setError("Failed to generate summary")
    } finally {
      setLoading(false)
    }
  }

  const generateRecap = async (meetingId: string) => {
    setLoading(true)
    try {
      const result = await api.ai.generateRecap(meetingId)
      if (result.success) {
        setRecap(result.data)
      } else {
        setError(result.error || "Failed to generate recap")
      }
    } catch (err) {
      setError("Failed to generate recap")
    } finally {
      setLoading(false)
    }
  }

  return {
    summary,
    recap,
    loading,
    error,
    generateSummary,
    generateRecap,
  }
}
