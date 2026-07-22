"use client";

import { useEffect, useState, useRef } from "react";
import { getFlapIndex } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;
  speed?: number; // ms per animation frame
}

const ANIM_FRAMES = 9;

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

function getFlapSrc(flapIndex: number): string {
  const flapNum = flapIndex + 1;
  return `/flaps/ekimei/flap_${String(flapNum).padStart(2, "0")}.png`;
}

export default function FlapDisplay({ text, speed = 30 }: FlapDisplayProps) {
  const initialIndex = getFlapIndex(text);
  const [displaySrc, setDisplaySrc] = useState(getFlapSrc(initialIndex));
  const currentFlapRef = useRef(initialIndex);
  const prevText = useRef(text);
  const initializedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 初回は静止画を表示するだけ（アニメーションしない）
    if (!initializedRef.current) {
      initializedRef.current = true;
      const idx = getFlapIndex(text);
      currentFlapRef.current = idx;
      setDisplaySrc(getFlapSrc(idx));
      prevText.current = text;
      return;
    }

    if (text === prevText.current) return;

    const fromIndex = currentFlapRef.current;
    const toIndex = getFlapIndex(text);
    prevText.current = text;

    if (fromIndex === toIndex) return;

    const route = getFlapRoute(fromIndex, toIndex);
    if (route.length === 0) return;

    // 既存アニメーションをキャンセル
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animTimerRef.current) clearTimeout(animTimerRef.current);

    let routeIndex = 0;

    function animateToNextFlap() {
      if (routeIndex >= route.length) {
        return;
      }

      const targetFlap = route[routeIndex];
      let animFrame = 0;

      function showAnimFrame() {
        if (animFrame < ANIM_FRAMES) {
          const src = `/flaps/ekimei_anim/rotate_${String(animFrame + 1).padStart(2, "0")}.png`;
          setDisplaySrc(src);
          animFrame++;
          animTimerRef.current = setTimeout(showAnimFrame, speed);
        } else {
          // 停止フレーム
          setDisplaySrc(getFlapSrc(targetFlap));
          currentFlapRef.current = targetFlap;
          routeIndex++;

          // 次のフラップへ
          if (routeIndex < route.length) {
            timerRef.current = setTimeout(animateToNextFlap, 20);
          }
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
