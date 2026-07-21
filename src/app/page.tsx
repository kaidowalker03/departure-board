"use client";

import DepartureBoard from "@/components/DepartureBoard";
import { useDepartures } from "@/hooks/useDepartures";
import timetableData from "@/data/timetable-keikyu-shinagawa.json";

export default function Home() {
  const departures = useDepartures(timetableData.timetable, 3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <h1 className="text-2xl font-bold text-white mb-8">
        発車標シミュレーター
      </h1>

      <DepartureBoard
        stationName={timetableData.station}
        direction={timetableData.direction}
        departures={departures}
      />

      <p className="mt-8 text-sm text-gray-500">
        ※ ダイヤはサンプルデータです。実際のダイヤとは異なります。
      </p>
    </div>
  );
}
