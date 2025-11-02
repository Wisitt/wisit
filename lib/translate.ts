// src/utils/translate.ts
// Simple wrapper for LibreTranslate (public instance by default).
// NOTE: For production or sensitive data, self-host LibreTranslate and change LIBRE_URL.

const LIBRE_URL = process.env.NEXT_PUBLIC_LIBRETRANSLATE_URL || "https://libretranslate.de";

type LibreResponse = {
  translatedText: string;
};

export async function libreTranslateOne(text: string, target: string, source = "auto"): Promise<string> {
  if (!text || text.trim() === "") return text;
  // rate-limit / safety: limit text length (optional)
  const safeText = text.length > 5000 ? text.slice(0, 5000) : text;

  const url = `${LIBRE_URL}/translate`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: safeText,
        source,
        target,
        format: "text"
      }),
    });

    if (!res.ok) {
      throw new Error(`LibreTranslate error ${res.status}`);
    }

    const json: LibreResponse = await res.json();
    return json.translatedText;
  } catch (err) {
    // bubble up so caller can fallback
    console.warn("libreTranslateOne failed:", err);
    throw err;
  }
}
