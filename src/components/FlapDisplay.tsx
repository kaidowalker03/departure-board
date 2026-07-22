"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { getFlapIndex } from "@/data/flap-destinations";
import styles from "./FlapDisplay.module.css";

interface FlapDisplayProps {
  text: string;
  speed?: number;
}

const ANIM_FRAMES = 9;

function getFlapRoute(fromIndex: number, toIndex: number): number[] {
  if (fromIndex === toIndex) return [];
  const route: number[] = [];
  const total = 56;
  let current = (fromIndex + 1) % total;
  let safety = 0;
  while (current !== toIndex && safety < 56) {
    route.push(current);
    current = (current + 1) % total;
    safety++;
  }
  route.push(toIndex);
  return route;
}

function getFlapSrc(flapIndex: number): string {
  return `/flaps/ekimei/flap_${String(flapIndex + 1).padStart(2, "0")}.png`;
}

/**
 * フラップ遷移時の回転アニメーションフレームのパスを返す
 * targetFlapIndex: 遷移先のフラップ(0-indexed)
 * frameNum: 1~9
 */
function getRotateSrc(targetFlapIndex: number, frameNum: number): string {
  const flapNum = targetFlapIndex + 1; // 1-indexed
  return `/flaps/ekimei_anim/to_${String(flapNum).padStart(2, "0")}/r_${String(frameNum).padStart(2, "0")}.png`;
}

export default function FlapDisplay({ text, speed = 30 }: FlapDisplayProps) {
  const [src, setSrc] = useState("/flaps/ekimei/flap_01.png");
  const currentFlapRef = useRef<number>(-1);
  const animatingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cancelAnimation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    animatingRef.current = false;
  }, []);

  useEffect(() => {
    const targetIndex = getFlapIndex(text);

    // 初回: 静止画を表示して終了
    if (currentFlapRef.current === -1) {
      currentFlapRef.current = targetIndex;
      setSrc(getFlapSrc(targetIndex));
      return;
    }

    // 同じフラップなら何もしない
    if (targetIndex === currentFlapRef.current) return;

    // アニメーション中なら前のをキャンセル
    cancelAnimation();

    const route = getFlapRoute(currentFlapRef.current, targetIndex);
    if (route.length === 0) return;

    animatingRef.current = true;
    let routeIdx = 0;
    let animFrame = 0;

    function tick() {
      if (!animatingRef.current) return;

      if (animFrame < ANIM_FRAMES) {
        // 回転中フレーム（遷移先フラップ固有の画像）
        const targetFlap = route[routeIdx];
        setSrc(getRotateSrc(targetFlap, animFrame + 1));
        animFrame++;
        timerRef.current = setTimeout(tick, speed);
      } else {
        // 停止フレーム到達
        const flapIdx = route[routeIdx];
        setSrc(getFlapSrc(flapIdx));
        currentFlapRef.current = flapIdx;
        routeIdx++;
        animFrame = 0;

        if (routeIdx < route.length) {
          timerRef.current = setTimeout(tick, 10);
        } else {
          animatingRef.current = false;
        }
      }
    }

    tick();

    return () => cancelAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={styles.container}>
      <img src={src} alt={text} className={styles.flapImage} draggable={false} />
    </span>
  );
}
