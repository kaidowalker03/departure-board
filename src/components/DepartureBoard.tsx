"use client";

import DepartureRow, { DepartureInfo } from "./DepartureRow";
import styles from "./DepartureBoard.module.css";

interface DepartureBoardProps {
  stationName: string;
  direction: string;
  departures: (DepartureInfo | null)[];
}

export default function DepartureBoard({
  stationName,
  direction,
  departures,
}: DepartureBoardProps) {
  const labels = ["先発", "次発", "次々発"];

  return (
    <div className={styles.board}>
      {/* ヘッダー */}
      <div className={styles.header}>
        <span className={styles.stationName}>{stationName}</span>
        <span className={styles.direction}>{direction}</span>
      </div>

      {/* 列ヘッダー */}
      <div className={styles.columnHeader}>
        <span className={styles.colLabel}></span>
        <span className={styles.colTime}>時刻</span>
        <span className={styles.colType}>種別</span>
        <span className={styles.colDest}>行先</span>
        <span className={styles.colNote}>備考</span>
      </div>

      {/* 3行表示 */}
      {[0, 1, 2].map((i) => (
        <DepartureRow
          key={i}
          departure={departures[i] ?? null}
          label={labels[i]}
        />
      ))}
    </div>
  );
}
