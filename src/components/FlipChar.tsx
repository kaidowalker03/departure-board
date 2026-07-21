"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./FlipChar.module.css";

interface FlipCharProps {
  char: string;
  delay?: number;
}

export default function FlipChar({ char, delay = 0 }: FlipCharProps) {
  const [displayChar, setDisplayChar] = useState(char);
  const [nextChar, setNextChar] = useState(char);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(char);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (char === prevRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setNextChar(char);
      setFlipping(true);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [char, delay]);

  const handleAnimationEnd = () => {
    setDisplayChar(nextChar);
    setFlipping(false);
    prevRef.current = nextChar;
  };

  return (
    <span className={styles.char}>
      <span className={styles.static}>{displayChar}</span>
      {flipping && (
        <>
          <span className={styles.flipOut} onAnimationEnd={handleAnimationEnd}>
            {displayChar}
          </span>
          <span className={styles.flipIn}>
            {nextChar}
          </span>
        </>
      )}
    </span>
  );
}
