"use client";

import { useEffect, useState, useRef } from "react";
import { getFlapIndex } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;
  textEn?: string;
  speed?: number; // ms per animation frame
}

// 回転アニメーションのフレーム数
const ANIM_FRAMES = 9;

/**
 * 現在のフラップ番号から目的のフラップ番号までの経路を取得
 * （一方向にしか回らない）
 */
function getFlapRoute(fromIndex: number, toIndex: number): number[] {
  if (fromIndex === toIndex) return [];

  const route: number[] = [];
  const total = 56;
  let current = (fromIndex + 1) % total;

  while (current !== toIndex) {
    route.push(current);
    current = (current + 1) % total;
  }
  route.push(toIndex);
  return route;
}

export default function FlapDisplay({ text, speed = 30 }: FlapDisplayProps) {
  // フラップ番号（0-indexed: 0=flap_01, 1=flap_02, ...）
  const [currentFlap, setCurrentFlap] = useState(() => getFlapIndex(text));
  const [displaySrc, setDisplaySrc] = useState(`/flaps/ekimei/flap_${String(getFlapIndex(text) + 1).padStart(2, "0")}.png`);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevText = useRef(text);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (text === prevText.current) return;

    const fromIndex = getFlapIndex(prevText.current);
    const toIndex = getFlapIndex(text);
    prevText.current = text;

    if (fromIndex === toIndex) return;

    const route = getFlapRoute(fromIndex, toIndex);
    if (route.length === 0) return;

    // 既存アニメーションをキャンセル
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animTimerRef.current) clearTimeout(animTimerRef.current);

    setIsAnimating(true);
    let routeIndex = 0;

    function animateToNextFlap() {
      if (routeIndex >= route.length) {
        setIsAnimating(false);
        return;
      }

      const targetFlap = route[routeIndex];
      let animFrame = 0;

      // 回転アニメーション（9フレーム）
      function showAnimFrame() {
        if (animFrame < ANIM_FRAMES) {
          const src = `/flaps/ekimei_anim/rotate_${String(animFrame + 1).padStart(2, "0")}.png`;
          setDisplaySrc(src);
          animFrame++;
          animTimerRef.current = setTimeout(showAnimFrame, speed);
        } else {
          // 停止フレームを表示
          const flapNum = targetFlap + 1; // 1-indexed
          const src = `/flaps/ekimei/flap_${String(flapNum).padStart(2, "0")}.png`;
          setDisplaySrc(src);
          setCurrentFlap(targetFlap);
          routeIndex++;

          // 次のフラップへ（最後は少し間を置く）
          const delay = routeIndex >= route.length ? 0 : 20;
          timerRef.current = setTimeout(animateToNextFlap, delay);
        }
      }

      showAnimFrame();
    }

    animateToNextFlap();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span className={styles.container}>
      <img
        src={displaySrc}
        alt={text}
        className={styles.flapImage}
        draggable={false}
      />
    </span>
  );
}
