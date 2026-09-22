"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function highlightJson(json: string): string {
  const esc = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return esc.replace(
    /("(?:\\.|[^"\\])*":?)|\b(true|false)\b|\b(null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (m, str, bool, nul, num) => {
      if (str) {
        return str.endsWith(":")
          ? `<span class="text-sky-400">${str}</span>`
          : `<span class="text-emerald-400">${str}</span>`;
      }
      if (bool) return `<span class="text-violet-400">${m}</span>`;
      if (nul) return `<span class="text-slate-500">${m}</span>`;
      if (num) return `<span class="text-amber-400">${m}</span>`;
      return m;
    }
  );
}

export function JsonCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard در دسترس نیست
    }
  };

  return (
    <div dir="ltr" className="relative rounded-xl border border-custom bg-[#0b1220] overflow-hidden">
      <button
        onClick={copy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        aria-label="کپی کد"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
      <pre
        className="p-4 pr-14 overflow-auto max-h-96 text-xs leading-relaxed text-slate-300 font-mono"
        dangerouslySetInnerHTML={{ __html: highlightJson(code) }}
      />
    </div>
  );
}