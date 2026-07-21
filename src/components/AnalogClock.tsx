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
      <div className={styles.face}>
        {/* 時間の目盛り */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={styles.hourMark}
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
        {/* 分の目盛り */}
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={`m${i}`}
            className={styles.minuteMark}
            style={{ transform: `rotate(${i * 6}deg)` }}
          />
        ))}
        {/* 数字 */}
        {Array.from({ length: 12 }, (_, i) => {
          const num = i === 0 ? 12 : i;
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const radius = 38;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <span
              key={`n${i}`}
              className={styles.number}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {num}
            </span>
          );
        })}
        {/* 針 */}
        <div
          className={styles.hourHand}
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        <div
          className={styles.minuteHand}
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />
        <div
          className={styles.secondHand}
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />
        <div className={styles.center} />
      </div>
    </div>
  );
}
