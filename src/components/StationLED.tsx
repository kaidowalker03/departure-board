"use client";

import styles from "./StationLED.module.css";
import stationsData from "@/data/stations-keikyu-south.json";

interface StationLEDProps {
  stops: string[];
}

const mainStations = stationsData.mainLine;
const uragaBranch = stationsData.uraga.slice(1); // 京急大津, 馬堀海岸, 浦賀
const zushiBranch = stationsData.zushi.slice(1); // 六浦, 神武寺, 逗子・葉山

// 分岐位置のインデックス
const kanazawaHakkeiIndex = mainStations.indexOf("金沢八景");
const horinochiIndex = mainStations.indexOf("堀ノ内");

export default function StationLED({ stops }: StationLEDProps) {
  const stopsSet = new Set(stops);

  return (
    <div className={styles.container}>
      {/* 分岐線エリア */}
      <div className={styles.branchArea}>
        {/* 逗子線分岐（金沢八景の上に飛び出す） */}
        <div
          className={styles.branchGroup}
          style={{ left: `${((kanazawaHakkeiIndex) / mainStations.length) * 100}%` }}
        >
          <div className={styles.branchBox}>
            {zushiBranch.map((station) => (
              <div key={station} className={styles.branchItem}>
                <span className={styles.branchStationName}>{station}</span>
              </div>
            ))}
          </div>
          <div className={styles.branchConnector} />
        </div>

        {/* 浦賀分岐（堀ノ内の上に飛び出す） */}
        <div
          className={styles.branchGroup}
          style={{ left: `${((horinochiIndex) / mainStations.length) * 100}%` }}
        >
          <div className={styles.branchBox}>
            {uragaBranch.map((station) => (
              <div key={station} className={styles.branchItem}>
                <span className={styles.branchStationName}>{station}</span>
              </div>
            ))}
          </div>
          <div className={styles.branchConnector} />
        </div>
      </div>

      {/* 本線（横一列） */}
      <div className={styles.mainLine}>
        {mainStations.map((station, i) => (
          <div key={station} className={styles.station}>
            <span className={`${styles.stationName} ${i === 0 ? styles.origin : ""}`}>
              {station}
            </span>
            <div className={`${styles.dot} ${stopsSet.has(station) ? styles.active : ""}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
