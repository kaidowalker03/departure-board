"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getFlapSequence, FlapEntry } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;
  textEn?: string;
  speed?: number;
}

export default function FlapDisplay({ text, textEn = "", speed = 80 }: FlapDisplayProps) {
  const [currentJa, setCurrentJa] = useState(text);
  const [currentEn, setCurrentEn] = useState(textEn);
  const [prevJa, setPrevJa] = useState<string | null>(null);
  const prevText = useRef(text);
  const queueRef = useRef<FlapEntry[]>([]);
  const runningRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const processNext = useCallback(() => {
    if (queueRef.current.length === 0) {
      runningRef.current = false;
      return;
    }

    const entry = queueRef.current.shift()!;
    setPrevJa(currentJa);
    setCurrentJa(entry.ja || "　");
    setCurrentEn(entry.en);

    // 次のフラップまで待つ
    const delay = queueRef.current.length === 0 ? speed * 2 : speed;
    timerRef.current = setTimeout(() => {
      setPrevJa(null);
      // 少し間を置いて次へ
      timerRef.current = setTimeout(processNext, 20);
    }, delay);
  }, [speed, currentJa]);

  useEffect(() => {
    if (text === prevText.current) return;

    const sequence = getFlapSequence(prevText.current, text);
    prevText.current = text;

    if (sequence.length > 0) {
      queueRef.current = sequence;
      if (!runningRef.current) {
        runningRef.current = true;
        processNext();
      }
    } else {
      setCurrentJa(text);
      setCurrentEn(textEn);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, textEn, processNext]);

  return (
    <span className={styles.container}>
      {/* 現在の文字 */}
      <span className={styles.current}>{currentJa}</span>

      {/* 古い文字が倒れ落ちる */}
      {prevJa !== null && (
        <span className={styles.flipOut}>{prevJa}</span>
      )}

      {/* 英語 */}
      {currentEn && <span className={styles.en}>{currentEn}</span>}
    </span>
  );
}
