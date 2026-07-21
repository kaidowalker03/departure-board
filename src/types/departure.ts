export type TrainType =
  | "通快"
  | "快特"
  | "特急"
  | "急行"
  | "普通"
  | "回送"
  | "士快特"
  | "士特急"
  | "士急行"
  | "ウィング号";

export interface TrainTypeStyle {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
}

export const trainTypeStyles: Record<TrainType, TrainTypeStyle> = {
  通快: { label: "通快", bgColor: "#ffffff", textColor: "#008000", borderColor: "#ff0000" },
  快特: { label: "快特", bgColor: "#ffffff", textColor: "#008000" },
  特急: { label: "特急", bgColor: "#ffffff", textColor: "#ff0000" },
  急行: { label: "急行", bgColor: "#ffffff", textColor: "#0000ff" },
  普通: { label: "普通", bgColor: "#ffffff", textColor: "#000000" },
  回送: { label: "回送", bgColor: "#000000", textColor: "#ffffff" },
  士快特: { label: "✈快特", bgColor: "#008000", textColor: "#ffffff" },
  士特急: { label: "✈特急", bgColor: "#ff0000", textColor: "#ffffff" },
  士急行: { label: "✈急行", bgColor: "#0000ff", textColor: "#ffffff" },
  ウィング号: { label: "Wing", bgColor: "#000000", textColor: "#ffffff" },
};

export interface DepartureEntry {
  order: number; // 出発順序
  track: number; // 発車番線 (4 or 5)
  type: TrainType;
  destination: string; // 行先（日本語）
  destinationEn: string; // 行先（英語）
  time: string; // "HH:MM"
  cars: number; // 両数
  note: string; // 備考
  stops: string[]; // 停車駅リスト
}

export interface TimetableData {
  station: string;
  stationEn: string;
  direction: string;
  directionEn: string;
  tracks: number[];
  timetable: DepartureEntry[];
}
