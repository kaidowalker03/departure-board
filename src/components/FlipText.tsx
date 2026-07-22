"use client";

import FlipChar from "./FlipChar";

interface FlipTextProps {
  text: string;
  className?: string;
  charDelay?: number; // stagger per char in ms (左から右に少しずつ遅れる)
}

export default function FlipText({ text, className = "", charDelay = 50 }: FlipTextProps) {
  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <FlipChar key={i} char={char} delay={i * charDelay} />
      ))}
    </span>
  );
}
