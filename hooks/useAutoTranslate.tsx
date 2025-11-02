// src/hooks/useAutoTranslate.tsx
import { libreTranslateOne } from "@/lib/translate";
import { useCallback, useMemo, useState } from "react";

/**
 * useAutoTranslate
 * - translate(text, target) -> returns translated string (uses sessionStorage cache)
 * - translateBatch(mapOfKeysToText, target) -> translates multiple entries and returns object
 *
 * Cache key format: translate:{target}:{hash(text)}
 */

function hashString(s: string) {
  // simple hash to avoid super long keys
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return (h >>> 0).toString(36);
}

export function useAutoTranslate() {
  const [loading, setLoading] = useState(false);

  const translate = useCallback(async (text: string, target: string, fallback?: string) => {
    if (!text) return text;
    const key = `translate:${target}:${hashString(text)}`;
    const cached = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    if (cached) return cached;

    setLoading(true);
    try {
      const translated = await libreTranslateOne(text, target);
      try {
        sessionStorage.setItem(key, translated);
      } catch (e) {
        // ignore storage errors
      }
      setLoading(false);
      return translated;
    } catch (e) {
      setLoading(false);
      return fallback ?? text;
    }
  }, []);

  const translateBatch = useCallback(
    async (entries: Record<string, string>, target: string, fallbackPrefix = "") => {
      // entries: { key1: text1, key2: text2, ... }
      const keys = Object.keys(entries);
      const results: Record<string, string> = {};
      setLoading(true);

      // sequential approach to be gentle on rate limits; could be changed to parallel
      for (const k of keys) {
        try {
          const r = await translate(entries[k], target, entries[k]);
          results[k] = r;
        } catch {
          results[k] = fallbackPrefix + entries[k];
        }
      }

      setLoading(false);
      return results;
    },
    [translate]
  );

  return useMemo(
    () => ({
      loading,
      translate,
      translateBatch
    }),
    [loading, translate, translateBatch]
  );
}
