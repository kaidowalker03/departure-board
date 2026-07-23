"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import styles from "./FlapUnit.module.css";

interface FlapUnitProps {
  /** フラップ画像のベースパス (例: "/flaps/shubetsu") */
  basePath: string;
  /** 回転画像のベースパス (例: "/flaps/shubetsu_anim") */
  animPath: string;
  /** 現在表示すべきフラップのindex (0-indexed) */
  targetIndex: number;
  /** フラップの総数 */
  totalFlaps: number;
  /** 回転フレーム間隔(ms) */
  speed?: number;
}

const ANIM_FRAMES = 9;

function getRoute(from: number, to: number, total: number): number[] {
  if (from === to) return [];
  const route: number[] = [];
  let current = (from + 1) % total;
  let safety = 0;
  while (current !== to && safety < total) {
    route.push(current);
    current = (current + 1) % total;
    safety++;
  }
  route.push(to);
  return route;
}

export default function FlapUnit({
  basePath,
  animPath,
  targetIndex,
  totalFlaps,
  speed = 15,
}: FlapUnitProps) {
  const [src, setSrc] = useState(`${basePath}/flap_${String(targetIndex).padStart(2, "0")}.png`);
  const currentRef = useRef<number>(-1);
  const animatingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    animatingRef.current = false;
  }, []);

  useEffect(() => {
    // 初回
    if (currentRef.current === -1) {
      currentRef.current = targetIndex;
      setSrc(`${basePath}/flap_${String(targetIndex).padStart(2, "0")}.png`);
      return;
    }

    if (targetIndex === currentRef.current) return;

    cancel();

    const route = getRoute(currentRef.current, targetIndex, totalFlaps);
    if (route.length === 0) return;

    animatingRef.current = true;
    let routeIdx = 0;
    let animFrame = 0;

    function tick() {
      if (!animatingRef.current) return;

      if (animFrame < ANIM_FRAMES) {
        const target = route[routeIdx];
        setSrc(`${animPath}/to_${String(target).padStart(2, "0")}/r_${String(animFrame + 1).padStart(2, "0")}.png`);
        animFrame++;
        timerRef.current = setTimeout(tick, speed);
      } else {
        const flapIdx = route[routeIdx];
        setSrc(`${basePath}/flap_${String(flapIdx).padStart(2, "0")}.png`);
        currentRef.current = flapIdx;
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

    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex]);

  return (
    <img src={src} alt="" className={styles.flapImg} draggable={false} />
  );
}
