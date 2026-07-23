"use client";

import DepartureRows from "@/components/DepartureRows";
import AnalogClock from "@/components/AnalogClock";
import StationLEDOverlay from "@/components/StationLEDOverlay";
import { useDepartures } from "@/hooks/useDepartures";
import { generateFullTimetable } from "@/data/timetable-generator";
import { useMemo } from "react";
import styles from "./page.module.css";

export default function Home() {
  const timetable = useMemo(() => generateFullTimetable(), []);
  const departures = useDepartures(timetable, 3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#2a2a2a]">
      <div className={styles.boardContainer}>
        {/* 背景画像（ヘッダー + 停車駅LED + 白線 + 3行分の枠） */}
        <img
          src="/keikyu-kawasaki_kudari_base.png"
          alt="京急川崎 下り 発車標"
          className={styles.bgImage}
          draggable={false}
        />

        {/* 停車駅LED（動的に点灯） */}
        <div className={styles.ledOverlay}>
          <StationLEDOverlay stops={departures[0]?.stops ?? []} />
        </div>

        {/* パタパタ3行（背景画像の枠内に収める） */}
        <div className={styles.dynamicArea}>
          <DepartureRows departures={departures} />
        </div>

        {/* 時計 */}
        <div className={styles.clockArea}>
          <AnalogClock />
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600">
        ※ ダイヤはサンプルデータです。実際のダイヤとは異なります。
      </p>
    </div>
  );
}
