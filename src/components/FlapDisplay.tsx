"use client";

import { useEffect, useState, useRef } from "react";
import { getFlapSequence } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;
  textEn?: string;
  speed?: number;
}

/**
 * 駅名を表示用に分解する
 */
function parseStationName(name: string): { prefix: string; body: string } {
  if (name.startsWith("京急")) {
    return { prefix: "京急", body: name.slice(2) };
  }
  if (name.startsWith("京成")) {
    return { prefix: "京成", body: name.slice(2) };
  }
  return { prefix: "", body: name };
}

/**
 * 本体文字数に応じたCSSクラス
 */
function getCharsClass(body: string): string {
  const len = body.length;
  if (len <= 2) return styles.chars2;
  if (len === 3) return styles.chars3;
  if (len === 4) return styles.chars4;
  return styles.chars5plus;
}

/**
 * 英語を長い場合に2行に分割
 * スペースで区切って、だいたい半分で折る
 */
function formatEn(en: string): string {
  if (!en || en.length <= 12) return en;
  // スペースで分割して2行に
  const parts = en.split(/[-\s]/);
  if (parts.length >= 2) {
    const mid = Math.ceil(parts.length / 2);
    const line1 = parts.slice(0, mid).join(" ");
    const line2 = parts.slice(mid).join(" ");
    return `${line1}\n${line2}`;
  }
  return en;
}

function FlapContent({ ja, en }: { ja: string; en: string }) {
  const { prefix, body } = parseStationName(ja);
  const charsClass = getCharsClass(body);
  const formattedEn = formatEn(en);

  return (
    <span className={styles.flapInner}>
      <span className={styles.jaArea}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <span className={`${styles.jaText} ${charsClass}`}>{body}</span>
      </span>
      {formattedEn && <span className={styles.enArea}>{formattedEn}</span>}
    </span>
  );
}

export default function FlapDisplay({ text, textEn = "", speed = 80 }: FlapDisplayProps) {
  const [currentJa, setCurrentJa] = useState(text);
  const [currentEn, setCurrentEn] = useState(textEn);
  const [outgoingJa, setOutgoingJa] = useState<string | null>(null);
  const [outgoingEn, setOutgoingEn] = useState("");
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

    if (timerRef.current) clearTimeout(timerRef.current);

    let index = 0;
    let prevJa = currentJa;
    let prevEn = currentEn;

    function step() {
      if (index >= sequence.length) {
        setOutgoingJa(null);
        return;
      }

      const entry = sequence[index];
      const newJa = entry.ja || "　";
      const newEn = entry.en;

      setOutgoingJa(prevJa);
      setOutgoingEn(prevEn);
      setFlipId((id) => id + 1);

      setCurrentJa(newJa);
      setCurrentEn(newEn);

      prevJa = newJa;
      prevEn = newEn;
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
      <span className={styles.current}>
        <FlapContent ja={currentJa} en={currentEn} />
      </span>

      {outgoingJa !== null && (
        <span key={flipId} className={styles.flipOut}>
          <FlapContent ja={outgoingJa} en={outgoingEn} />
        </span>
      )}
    </span>
  );
}
