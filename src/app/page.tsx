"use client";

import DepartureBoard from "@/components/DepartureBoard";
import { useDepartures } from "@/hooks/useDepartures";
import { generateFullTimetable } from "@/data/timetable-generator";
import { useMemo } from "react";

export default function Home() {
  // 1分おきのダイヤを生成（メモ化して再生成を防ぐ）
  const timetable = useMemo(() => generateFullTimetable(), []);
  const departures = useDepartures(timetable, 3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#2a2a2a]">
      <DepartureBoard
        station="京急川崎"
        direction="横浜・上大岡・浦賀・三浦海岸 方面"
        directionEn="for Yokohama, Kamiōoka, Uraga, Miurakaigan"
        tracks={[4, 5]}
        departures={departures}
      />

      <p className="mt-4 text-xs text-gray-600">
        ※ ダイヤはサンプルデータです。実際のダイヤとは異なります。
      </p>
    </div>
  );
}
