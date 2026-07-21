"use client";

import DepartureBoard from "@/components/DepartureBoard";
import { useDepartures } from "@/hooks/useDepartures";
import timetableData from "@/data/timetable-keikyu-kawasaki-down.json";
import { TimetableData } from "@/types/departure";

const data = timetableData as unknown as TimetableData;

export default function Home() {
  const departures = useDepartures(data.timetable, 3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#3a3a3a]">
      <DepartureBoard
        station={data.station}
        direction={data.direction}
        directionEn={data.directionEn}
        tracks={data.tracks}
        departures={departures}
      />

      <p className="mt-4 text-xs text-gray-500">
        ※ ダイヤはサンプルデータです。実際のダイヤとは異なります。
      </p>
    </div>
  );
}
