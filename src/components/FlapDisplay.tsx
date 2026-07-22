"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getFlapSequence, FlapEntry } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;
  textEn?: string;
  speed?: number; // ms per flap
}

export default function FlapDisplay({ text, textEn = "", speed = 80 }: FlapDisplayProps) {
  const [currentJa, setCurrentJa] = useState(text);
  const [currentEn, setCurrentEn] = useState(textEn);
  const [nextJa, setNextJa] = useState(text);
  const [flipping, setFlipping] = useState(false);
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
    setNextJa(entry.ja || "　");
    setFlipping(true);

    // フリップアニメーション完了後に次へ
    timerRef.current = setTimeout(() => {
      setCurrentJa(entry.ja || "　");
      setCurrentEn(entry.en);
      setFlipping(false);

      // 少し間を置いて次のフラップへ
      timerRef.current = setTimeout(() => {
        processNext();
      }, queueRef.current.length === 0 ? 0 : 30);
    }, speed);
  }, [speed]);

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
      {/* 上半分 */}
      <span className={styles.upper}>
        <span className={styles.text}>{currentJa}</span>
      </span>

      {/* 下半分 */}
      <span className={styles.lower}>
        <span className={styles.text}>
          {flipping ? nextJa : currentJa}
        </span>
      </span>

      {/* フリップする上半分（倒れ落ちる） */}
      {flipping && (
        <span className={styles.flapTop}>
          <span className={styles.text}>{currentJa}</span>
        </span>
      )}

      {/* フリップする下半分（起き上がる） */}
      {flipping && (
        <span className={styles.flapBottom}>
          <span className={styles.text}>{nextJa}</span>
        </span>
      )}

      {/* 英語表示 */}
      {currentEn && !flipping && (
        <span className={styles.en}>{currentEn}</span>
      )}
    </span>
  );
}
