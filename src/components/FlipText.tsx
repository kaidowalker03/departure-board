"use client";

import FlipChar from "./FlipChar";

interface FlipTextProps {
  text: string;
  className?: string;
  charDelay?: number; // stagger per char in ms
}

export default function FlipText({ text, className = "", charDelay = 40 }: FlipTextProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <FlipChar key={i} char={char} delay={i * charDelay} />
      ))}
    </span>
  );
}
