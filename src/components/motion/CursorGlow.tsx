"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const handler = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="cursor-spotlight"
      style={{
        // CSS vars on element override globals.css fallback
        // @ts-expect-error CSS custom properties
        "--x": "var(--cursor-x, 50%)",
        "--y": "var(--cursor-y, 50%)",
      }}
    />
  );
}
