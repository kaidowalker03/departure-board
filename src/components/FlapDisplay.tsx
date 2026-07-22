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
 * - 「京急」で始まる場合: prefix="京急", body=残り
 * - それ以外: prefix="", body=全体
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
 * 本体文字数に応じたCSSクラスを返す
 */
function getCharsClass(body: string): string {
  const len = body.length;
  if (len <= 2) return styles.chars2;
  if (len === 3) return styles.chars3;
  if (len === 4) return styles.chars4;
  return styles.chars5plus;
}

function FlapContent({ ja, en }: { ja: string; en: string }) {
  const { prefix, body } = parseStationName(ja);
  const charsClass = getCharsClass(body);

  return (
    <>
      <div className={styles.jaRow}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <span className={`${styles.jaText} ${charsClass}`}>{body}</span>
      </div>
      <div className={styles.enText}>{en}</div>
    </>
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

      // 古い板を倒す
      setOutgoingJa(prevJa);
      setOutgoingEn(prevEn);
      setFlipId((id) => id + 1);

      // 新しい文字を背面に
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
      {/* 新しい文字（背面） */}
      <span className={styles.current}>
        <FlapContent ja={currentJa} en={currentEn} />
      </span>

      {/* 古い文字が倒れ落ちる板 */}
      {outgoingJa !== null && (
        <span key={flipId} className={styles.flipOut}>
          <FlapContent ja={outgoingJa} en={outgoingEn} />
        </span>
      )}
    </span>
  );
}
