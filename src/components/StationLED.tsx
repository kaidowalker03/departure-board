"use client";

import styles from "./StationLED.module.css";
import stationsData from "@/data/stations-keikyu-south.json";

interface StationLEDProps {
  stops: string[];
}

// 本線（京急川崎以南）
const mainStations = stationsData.mainLine;
// 浦賀分岐
const uragaBranch = stationsData.uraga.slice(1);
// 逗子線
const zushiBranch = stationsData.zushi.slice(1);

export default function StationLED({ stops }: StationLEDProps) {
  const stopsSet = new Set(stops);

  return (
    <div className={styles.container}>
      {/* 本線 */}
      <div className={styles.stationRow}>
        {mainStations.map((station) => (
          <div key={station} className={styles.station}>
            <div className={styles.nameArea}>
              <span className={styles.name}>{station}</span>
            </div>
            <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
          </div>
        ))}
      </div>

      {/* 分岐線 */}
      <div className={styles.branches}>
        {/* 逗子線 */}
        <div className={styles.branchLine}>
          <span className={styles.branchLabel}>逗子線</span>
          <div className={styles.branchStations}>
            {zushiBranch.map((station) => (
              <div key={station} className={styles.station}>
                <div className={styles.nameArea}>
                  <span className={styles.name}>{station}</span>
                </div>
                <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
              </div>
            ))}
          </div>
        </div>

        {/* 浦賀方面 */}
        <div className={styles.branchLine}>
          <span className={styles.branchLabel}>浦賀方面</span>
          <div className={styles.branchStations}>
            {uragaBranch.map((station) => (
              <div key={station} className={styles.station}>
                <div className={styles.nameArea}>
                  <span className={styles.name}>{station}</span>
                </div>
                <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
