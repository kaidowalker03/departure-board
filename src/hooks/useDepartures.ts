"use client";

import { useState, useEffect, useRef } from "react";
import { DepartureEntry } from "@/types/departure";

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h < 4 ? h + 24 : h) * 60 + m;
}

function getCurrentMinutes(): number {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  return (h < 4 ? h + 24 : h) * 60 + m;
}

export function useDepartures(
  timetable: DepartureEntry[],
  count: number = 3
): DepartureEntry[] {
  const [departures, setDepartures] = useState<DepartureEntry[]>([]);
  const prevKey = useRef<string>("");

  useEffect(() => {
    function update() {
      const currentMinutes = getCurrentMinutes();

      // 現在時刻以降の列車を探す
      const upcoming = timetable.filter(
        (entry) => timeToMinutes(entry.time) > currentMinutes
      );

      // count件取得（足りなければ翌日の始発から補完）
      let result: DepartureEntry[];
      if (upcoming.length >= count) {
        result = upcoming.slice(0, count);
      } else {
        result = [...upcoming, ...timetable.slice(0, count - upcoming.length)];
      }

      // 先発が変わった時だけ更新（パタパタを発動させる）
      const newKey = result.map((d) => d.time + d.destination).join("|");
      if (newKey !== prevKey.current) {
        prevKey.current = newKey;
        setDepartures(result);
      }
    }

    update();
    // 5秒ごとにチェック（1分の切り替わりを逃さないように）
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [timetable, count]);

  return departures;
}
