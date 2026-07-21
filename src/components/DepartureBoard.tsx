"use client";

import { DepartureEntry } from "@/types/departure";
import DepartureRow from "./DepartureRow";
import StationLED from "./StationLED";
import AnalogClock from "./AnalogClock";
import styles from "./DepartureBoard.module.css";

interface DepartureBoardProps {
  station: string;
  direction: string;
  directionEn: string;
  tracks: number[];
  departures: DepartureEntry[];
}

export default function DepartureBoard({
  station,
  direction,
  directionEn,
  tracks,
  departures,
}: DepartureBoardProps) {
  const labels = ["先発", "次発", "次々発"];
  const firstDeparture = departures[0];

  return (
    <div className={styles.board}>
      {/* 番線・方面ヘッダー */}
      <div className={styles.header}>
        <div className={styles.trackNumber}>{tracks[0]}</div>
        <div className={styles.directionArea}>
          <div className={styles.directionJa}>{direction}</div>
          <div className={styles.directionEn}>{directionEn}</div>
        </div>
        <div className={styles.trackNumber}>{tracks[1]}</div>
      </div>

      {/* 停車駅LED */}
      <StationLED stops={firstDeparture?.stops ?? []} />

      {/* 発車標本体 + 時計 */}
      <div className={styles.body}>
        <div className={styles.rows}>
          {labels.map((label, i) => (
            <DepartureRow
              key={i}
              departure={departures[i] ?? null}
              label={label}
            />
          ))}
        </div>
        <div className={styles.clockArea}>
          <AnalogClock />
        </div>
      </div>
    </div>
  );
}
