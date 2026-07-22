"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getFlapSequence, FlapEntry } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;       // 目的の行先（日本語）
  textEn?: string;    // 英語（最終表示用）
  speed?: number;     // 途中フラップの表示間隔(ms)
}

export default function FlapDisplay({ text, textEn = "", speed = 60 }: FlapDisplayProps) {
  const [displayJa, setDisplayJa] = useState(text);
  const [displayEn, setDisplayEn] = useState(textEn);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevText = useRef(text);
  const animating = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const runSequence = useCallback((sequence: FlapEntry[], finalEn: string) => {
    if (sequence.length === 0) {
      animating.current = false;
      setIsFlipping(false);
      return;
    }

    animating.current = true;
    setIsFlipping(true);
    let index = 0;

    const step = () => {
      if (index >= sequence.length) {
        animating.current = false;
        setIsFlipping(false);
        setDisplayEn(finalEn);
        return;
      }

      const entry = sequence[index];
      setDisplayJa(entry.ja || "　");
      setDisplayEn(entry.en);
      index++;

      // 最後の1枚はゆっくり（止まる感じ）
      const delay = index === sequence.length ? speed * 2 : speed;
      timeoutRef.current = setTimeout(step, delay);
    };

    step();
  }, [speed]);

  useEffect(() => {
    if (text === prevText.current) return;

    // 前の行先から新しい行先までのフラップ列を取得
    const sequence = getFlapSequence(prevText.current, text);
    prevText.current = text;

    if (sequence.length > 0) {
      runSequence(sequence, textEn);
    } else {
      setDisplayJa(text);
      setDisplayEn(textEn);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, textEn, runSequence]);

  return (
    <span className={`${styles.flapDisplay} ${isFlipping ? styles.flipping : ""}`}>
      <span className={styles.ja}>{displayJa}</span>
      {displayEn && <span className={styles.en}>{displayEn}</span>}
    </span>
  );
}
