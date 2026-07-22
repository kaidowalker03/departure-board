"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./FlipChar.module.css";

interface FlipCharProps {
  char: string;
  delay?: number;
}

export default function FlipChar({ char, delay = 0 }: FlipCharProps) {
  const [current, setCurrent] = useState(char);
  const [next, setNext] = useState(char);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevChar = useRef(char);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (char === prevChar.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setNext(char);
      setIsFlipping(true);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [char, delay]);

  const handleFlipComplete = () => {
    setCurrent(next);
    setIsFlipping(false);
    prevChar.current = next;
  };

  return (
    <span className={styles.flipContainer}>
      {/* 上半分 - 現在の文字 */}
      <span className={styles.upper}>
        <span className={styles.upperText}>{current}</span>
      </span>

      {/* 下半分 - 次の文字（フリップ中に見える） */}
      <span className={styles.lower}>
        <span className={styles.lowerText}>
          {isFlipping ? next : current}
        </span>
      </span>

      {/* フリップする上半分（現在の文字が倒れ落ちる） */}
      {isFlipping && (
        <span
          className={styles.flapFront}
          onAnimationEnd={handleFlipComplete}
        >
          <span className={styles.upperText}>{current}</span>
        </span>
      )}

      {/* フリップする下半分（次の文字が起き上がる） */}
      {isFlipping && (
        <span className={styles.flapBack}>
          <span className={styles.lowerText}>{next}</span>
        </span>
      )}
    </span>
  );
}
