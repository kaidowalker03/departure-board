"use client";

import { useEffect, useState, useRef } from "react";
import { getFlapSequence } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;
  textEn?: string;
  speed?: number;
}

export default function FlapDisplay({ text, textEn = "", speed = 80 }: FlapDisplayProps) {
  const [currentJa, setCurrentJa] = useState(text);
  const [currentEn, setCurrentEn] = useState(textEn);
  const [outgoingJa, setOutgoingJa] = useState<string | null>(null);
  const [flipId, setFlipId] = useState(0);
  const prevText = useRef(text);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (text === prevText.current) return;

    const sequence = getFlapSequence(prevText.current, text);
    prevText.current = text;

    if (sequence.length === 0) {
      setCurrentJa(text);
      setCurrentEn(textEn);
      return;
    }

    // 既存のアニメーションをキャンセル
    if (timerRef.current) clearTimeout(timerRef.current);

    let index = 0;
    let prevJa = currentJa;

    function step() {
      if (index >= sequence.length) {
        setOutgoingJa(null);
        return;
      }

      const entry = sequence[index];
      const newJa = entry.ja || "　";

      // 古い文字を倒れ落ちる板に設定
      setOutgoingJa(prevJa);
      setFlipId((id) => id + 1);

      // 新しい文字を背面に設定
      setCurrentJa(newJa);
      setCurrentEn(entry.en);

      prevJa = newJa;
      index++;

      const delay = index >= sequence.length ? speed * 2 : speed;
      timerRef.current = setTimeout(step, delay);
    }

    step();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, textEn, speed]);

  return (
    <span className={styles.container}>
      {/* 新しい文字（背面に常に表示） */}
      <span className={styles.current}>{currentJa}</span>

      {/* 古い文字が倒れ落ちる板 */}
      {outgoingJa !== null && (
        <span key={flipId} className={styles.flipOut}>
          {outgoingJa}
        </span>
      )}

      {/* 英語 */}
      {currentEn && !outgoingJa && (
        <span className={styles.en}>{currentEn}</span>
      )}
    </span>
  );
}
