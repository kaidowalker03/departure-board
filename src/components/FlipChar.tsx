"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./FlipChar.module.css";

interface FlipCharProps {
  char: string;
  delay?: number;
}

export default function FlipChar({ char, delay = 0 }: FlipCharProps) {
  const [current, setCurrent] = useState(char);
  const [prev, setPrev] = useState<string | null>(null);
  const prevChar = useRef(char);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (char === prevChar.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setPrev(prevChar.current);
      setCurrent(char);
      prevChar.current = char;
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [char, delay]);

  const handleAnimationEnd = () => {
    setPrev(null);
  };

  return (
    <span className={styles.flipContainer}>
      {/* 現在の文字（常に表示） */}
      <span className={styles.staticText}>{current}</span>

      {/* 古い文字が倒れ落ちるアニメーション */}
      {prev !== null && (
        <span className={styles.flipOut} onAnimationEnd={handleAnimationEnd}>
          {prev}
        </span>
      )}
    </span>
  );
}
