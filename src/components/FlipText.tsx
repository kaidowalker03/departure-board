"use client";

import FlipChar from "./FlipChar";

interface FlipTextProps {
  text: string;
  maxLength?: number; // pad to fixed width
  delayPerChar?: number; // stagger delay between chars (ms)
  className?: string;
}

export default function FlipText({
  text,
  maxLength,
  delayPerChar = 30,
  className = "",
}: FlipTextProps) {
  const displayLength = maxLength ?? text.length;
  const paddedText = text.padEnd(displayLength, "\u3000"); // 全角スペースでパディング

  return (
    <div className={`inline-flex ${className}`}>
      {paddedText.split("").slice(0, displayLength).map((char, i) => (
        <FlipChar key={i} char={char} delay={i * delayPerChar} />
      ))}
    </div>
  );
}
