"use client";

import styles from "./StationLED.module.css";
import stationsData from "@/data/stations-keikyu-south.json";

interface StationLEDProps {
  stops: string[]; // 先発列車の停車駅
}

// 全駅リスト（京急川崎以南 + 浦賀分岐 + 逗子線分岐）
// 表示用に統合した駅順を定義
const allStations = [
  ...stationsData.mainLine.slice(1), // 京急川崎自体は除く
];

// 浦賀分岐（堀ノ内以降）
const uragaBranch = stationsData.uraga.slice(1); // 堀ノ内は本線に含まれるので除く

// 逗子線分岐（金沢八景以降）
const zushiBranch = stationsData.zushi.slice(1); // 金沢八景は本線に含まれるので除く

export default function StationLED({ stops }: StationLEDProps) {
  const stopsSet = new Set(stops);

  return (
    <div className={styles.container}>
      {/* 本線 */}
      <div className={styles.lineRow}>
        {allStations.map((station) => (
          <div key={station} className={styles.stationItem}>
            <div
              className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`}
            />
            <span className={styles.stationName}>{station}</span>
          </div>
        ))}
      </div>

      {/* 浦賀分岐 */}
      <div className={styles.branchRow}>
        <span className={styles.branchLabel}>浦賀方面</span>
        {uragaBranch.map((station) => (
          <div key={station} className={styles.stationItem}>
            <div
              className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`}
            />
            <span className={styles.stationName}>{station}</span>
          </div>
        ))}
      </div>

      {/* 逗子線分岐 */}
      <div className={styles.branchRow}>
        <span className={styles.branchLabel}>逗子線</span>
        {zushiBranch.map((station) => (
          <div key={station} className={styles.stationItem}>
            <div
              className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`}
            />
            <span className={styles.stationName}>{station}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
