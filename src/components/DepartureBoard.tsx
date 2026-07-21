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
          <span className={styles.directionText}>
            {direction}　{directionEn}
          </span>
        </div>
        <div className={styles.trackNumber}>{tracks[1]}</div>
      </div>

      {/* 停車駅LED（黒背景、上下に白線） */}
      <div className={styles.ledDividerTop} />
      <StationLED stops={firstDeparture?.stops ?? []} />
      <div className={styles.ledDividerBottom} />

      {/* 発車標本体 + 時計 */}
      <div className={styles.body}>
        <div className={styles.rows}>
          {labels.map((label, i) => (
            <div key={i}>
              {i > 0 && <div className={styles.rowDivider} />}
              <DepartureRow
                departure={departures[i] ?? null}
                label={label}
              />
            </div>
          ))}
        </div>
        <div className={styles.clockDivider} />
        <div className={styles.clockArea}>
          <AnalogClock />
        </div>
      </div>
    </div>
  );
}
