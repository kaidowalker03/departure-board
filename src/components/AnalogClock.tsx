"use client";

import { useEffect, useState } from "react";
import styles from "./AnalogClock.module.css";

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = hours * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

  return (
    <div className={styles.clock}>
      <svg viewBox="0 0 200 200" className={styles.svg}>
        {/* 文字盤 */}
        <circle cx="100" cy="100" r="95" fill="#fff" stroke="#333" strokeWidth="4" />

        {/* 時間の目盛り */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 100 + 80 * Math.cos(angle);
          const y1 = 100 + 80 * Math.sin(angle);
          const x2 = 100 + 90 * Math.cos(angle);
          const y2 = 100 + 90 * Math.sin(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000" strokeWidth="3" />
          );
        })}

        {/* 数字 */}
        {Array.from({ length: 12 }, (_, i) => {
          const num = i === 0 ? 12 : i;
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 100 + 68 * Math.cos(angle);
          const y = 100 + 68 * Math.sin(angle);
          return (
            <text
              key={`n${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
              fontFamily="serif"
            >
              {num}
            </text>
          );
        })}

        {/* 時針 */}
        <line
          x1="100" y1="100"
          x2={100 + 45 * Math.cos((hourDeg - 90) * Math.PI / 180)}
          y2={100 + 45 * Math.sin((hourDeg - 90) * Math.PI / 180)}
          stroke="#000" strokeWidth="4" strokeLinecap="round"
        />

        {/* 分針 */}
        <line
          x1="100" y1="100"
          x2={100 + 62 * Math.cos((minuteDeg - 90) * Math.PI / 180)}
          y2={100 + 62 * Math.sin((minuteDeg - 90) * Math.PI / 180)}
          stroke="#000" strokeWidth="3" strokeLinecap="round"
        />

        {/* 秒針 */}
        <line
          x1="100" y1="100"
          x2={100 + 70 * Math.cos((secondDeg - 90) * Math.PI / 180)}
          y2={100 + 70 * Math.sin((secondDeg - 90) * Math.PI / 180)}
          stroke="#cc0000" strokeWidth="1.5" strokeLinecap="round"
        />

        {/* 中心 */}
        <circle cx="100" cy="100" r="4" fill="#000" />
      </svg>
    </div>
  );
}
