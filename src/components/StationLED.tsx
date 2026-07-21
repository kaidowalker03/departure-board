"use client";

import styles from "./StationLED.module.css";
import stationsData from "@/data/stations-keikyu-south.json";

interface StationLEDProps {
  stops: string[];
}

// 本線（京急川崎以南）
const mainStations = stationsData.mainLine;
// 浦賀分岐（堀ノ内の次から）
const uragaBranch = stationsData.uraga.slice(1);
// 逗子線（金沢八景の次から）
const zushiBranch = stationsData.zushi.slice(1);

// 金沢八景と堀ノ内のインデックスを取得
const kanazawaHakkeiIndex = mainStations.indexOf("金沢八景");
const horinochiIndex = mainStations.indexOf("堀ノ内");

export default function StationLED({ stops }: StationLEDProps) {
  const stopsSet = new Set(stops);

  return (
    <div className={styles.container}>
      <div className={styles.boardArea}>
        {/* 分岐線（上に配置） */}
        <div className={styles.branchArea}>
          {/* 逗子線分岐（金沢八景の上） */}
          <div
            className={styles.branch}
            style={{ left: `${((kanazawaHakkeiIndex) / mainStations.length) * 100}%` }}
          >
            {zushiBranch.map((station) => (
              <div key={station} className={styles.branchStation}>
                <span className={styles.branchName}>{station}</span>
                <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
              </div>
            ))}
          </div>

          {/* 浦賀分岐（堀ノ内の上） */}
          <div
            className={styles.branch}
            style={{ left: `${((horinochiIndex) / mainStations.length) * 100}%` }}
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
          {mainStations.map((station) => (
            <div key={station} className={styles.station}>
              <span className={styles.name}>{station}</span>
              <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
