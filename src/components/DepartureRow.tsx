"use client";

import FlipText from "./FlipText";
import styles from "./DepartureRow.module.css";

export interface DepartureInfo {
  time: string; // "06:00"
  type: string; // "快特", "特急", "急行", "普通"
  destination: string; // "三崎口"
  note?: string; // "8両" etc.
}

interface DepartureRowProps {
  departure: DepartureInfo | null;
  label?: string; // "次発", "次々発"
}

const typeColors: Record<string, string> = {
  快特: "#e60012",
  特急: "#0068b7",
  急行: "#f5a623",
  エアポート急行: "#f5a623",
  普通: "#00a650",
  "": "transparent",
};

export default function DepartureRow({ departure, label }: DepartureRowProps) {
  const info = departure ?? { time: "", type: "", destination: "", note: "" };
  const bgColor = typeColors[info.type] ?? "#333";

  return (
    <div className={styles.row}>
      {label && <div className={styles.label}>{label}</div>}

      {/* 時刻 */}
      <div className={styles.time}>
        <FlipText text={info.time} maxLength={5} />
      </div>

      {/* 種別 */}
      <div className={styles.type} style={{ backgroundColor: bgColor }}>
        <FlipText text={info.type} maxLength={5} />
      </div>

      {/* 行先 */}
      <div className={styles.destination}>
        <FlipText text={info.destination} maxLength={6} />
      </div>

      {/* 備考 */}
      <div className={styles.note}>
        <FlipText text={info.note ?? ""} maxLength={4} />
      </div>
    </div>
  );
}
