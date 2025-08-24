"use client";

import { useEffect, useState } from "react";
import { useRealtime } from "./use-realtime";

type Summary = {
  _id?: string;
  id?: string;
  meeting: string;
  date: string;
  duration: string;
  participants: number;
  summary: string;
  keyPoints: string[];
  actionItems: number;
  sentiment: "positive" | "neutral" | "negative";
};

export function useSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // initial fetch
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/ai/summaries", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load summaries");
        if (mounted) setSummaries(data.summaries || []);
      } catch (e: any) {
        if (mounted) setError(e.message || "Request failed");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // real-time: listen for newly created summaries
  useRealtime(undefined, {
    onNew: (doc) => {
      setSummaries((prev) => [doc, ...prev]); // prepend newest
    },
  });

  return { summaries, setSummaries, loading, error };
}
