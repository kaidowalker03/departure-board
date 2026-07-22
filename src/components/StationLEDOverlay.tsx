"use client";

import styles from "./StationLEDOverlay.module.css";
import stationsData from "@/data/stations-keikyu-south.json";

interface StationLEDOverlayProps {
  stops: string[];
}

// 本線全駅（LED丸の位置に対応）
const mainStations = stationsData.mainLine;

export default function StationLEDOverlay({ stops }: StationLEDOverlayProps) {
  const stopsSet = new Set(stops);

  return (
    <div className={styles.container}>
      {mainStations.map((station) => (
        <div
          key={station}
          className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`}
        />
      ))}
    </div>
  );
}
