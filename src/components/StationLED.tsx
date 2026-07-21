"use client";

import styles from "./StationLED.module.css";
import stationsData from "@/data/stations-keikyu-south.json";

interface StationLEDProps {
  stops: string[];
}

const mainStations = stationsData.mainLine;
const uragaBranch = stationsData.uraga.slice(1);
const zushiBranch = stationsData.zushi.slice(1);

const kanazawaHakkeiIndex = mainStations.indexOf("金沢八景");
const horinochiIndex = mainStations.indexOf("堀ノ内");

export default function StationLED({ stops }: StationLEDProps) {
  const stopsSet = new Set(stops);

  return (
    <div className={styles.container}>
      {/* 分岐線（上部に飛び出す） */}
      <div className={styles.branchArea}>
        {/* 逗子線分岐 */}
        <div
          className={styles.branch}
          style={{ left: `${((kanazawaHakkeiIndex + 0.5) / mainStations.length) * 100}%` }}
        >
          {zushiBranch.map((station) => (
            <div key={station} className={styles.branchStation}>
              <span className={styles.branchName}>{station}</span>
              <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
            </div>
          ))}
        </div>

        {/* 浦賀分岐 */}
        <div
          className={styles.branch}
          style={{ left: `${((horinochiIndex + 0.5) / mainStations.length) * 100}%` }}
        >
          {uragaBranch.map((station) => (
            <div key={station} className={styles.branchStation}>
              <span className={styles.branchName}>{station}</span>
              <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 本線（横一列） */}
      <div className={styles.mainLine}>
        {mainStations.map((station, i) => (
          <div key={station} className={styles.station}>
            <span className={`${styles.name} ${i === 0 ? styles.origin : ""}`}>
              {station}
            </span>
            <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
