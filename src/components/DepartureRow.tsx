"use client";

import { DepartureEntry, trainTypeStyles } from "@/types/departure";
import FlipText from "./FlipText";
import FlapDisplay from "./FlapDisplay";
import styles from "./DepartureRow.module.css";

interface DepartureRowProps {
  departure: DepartureEntry | null;
  label: string;
}

export default function DepartureRow({ departure, label }: DepartureRowProps) {
  if (!departure) {
    return (
      <div className={styles.row}>
        <div className={styles.label}>{label}</div>
      </div>
    );
  }

  const typeStyle = trainTypeStyles[departure.type];

  return (
    <div className={styles.row}>
      {/* 先発/次発/次々発 */}
      <div className={styles.label}>{label}</div>

      {/* 番線 */}
      <div className={styles.track}>
        <FlipText text={`${departure.track}番線`} />
      </div>

      {/* 種別 */}
      <div
        className={styles.type}
        style={{
          backgroundColor: typeStyle.bgColor,
          color: typeStyle.textColor,
          border: typeStyle.borderColor
            ? `2px solid ${typeStyle.borderColor}`
            : "2px solid transparent",
        }}
      >
        <FlipText text={typeStyle.label} />
      </div>

      {/* 行先（パタパタで途中駅を通過しながら表示） */}
      <div className={styles.destination}>
        <FlapDisplay
          text={departure.destination}
          textEn={departure.destinationEn}
          speed={60}
        />
      </div>

      {/* 時刻 */}
      <div className={styles.time}>
        <FlipText text={departure.time} />
      </div>

      {/* 両数 */}
      <div className={styles.cars}>
        <span className={styles.carsNum}>
          <FlipText text={String(departure.cars)} />
        </span>
        <span className={styles.carsUnit}>両</span>
      </div>

      {/* 備考 */}
      <div className={styles.note}>
        <FlipText text={departure.note} charDelay={20} />
      </div>
    </div>
  );
}
