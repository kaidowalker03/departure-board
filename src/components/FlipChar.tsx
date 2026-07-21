"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./FlipChar.module.css";

interface FlipCharProps {
  char: string;
  delay?: number; // ms delay before flip starts
}

export default function FlipChar({ char, delay = 0 }: FlipCharProps) {
  const [currentChar, setCurrentChar] = useState(char);
  const [nextChar, setNextChar] = useState(char);
  const [flipping, setFlipping] = useState(false);
  const prevCharRef = useRef(char);

  useEffect(() => {
    if (char === prevCharRef.current) return;

    const timeout = setTimeout(() => {
      setNextChar(char);
      setFlipping(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [char, delay]);

  const handleAnimationEnd = () => {
    setCurrentChar(nextChar);
    setFlipping(false);
    prevCharRef.current = nextChar;
  };

  return (
    <div className={styles.flipChar}>
      {/* Upper half - static current */}
      <div className={styles.top}>
        <span>{currentChar}</span>
      </div>

      {/* Lower half - static current (revealed after flip) */}
      <div className={styles.bottom}>
        <span>{flipping ? nextChar : currentChar}</span>
      </div>

      {/* Upper flap - flips down to reveal next char */}
      {flipping && (
        <div
          className={styles.flipTop}
          onAnimationEnd={handleAnimationEnd}
        >
          <span>{currentChar}</span>
        </div>
      )}

      {/* Lower flap - flips down to show next char bottom */}
      {flipping && (
        <div className={styles.flipBottom}>
          <span>{nextChar}</span>
        </div>
      )}
    </div>
  );
}
