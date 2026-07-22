import { DepartureEntry, TrainType } from "@/types/departure";

interface TrainPattern {
  type: TrainType;
  destination: string;
  destinationEn: string;
  track: number;
  cars: number;
  note: string;
  stops: string[];
}

// 列車パターン（8パターンを繰り返す = 約8分で1サイクル）
const patterns: TrainPattern[] = [
  {
    type: "快特",
    destination: "三崎口",
    destinationEn: "Misakiguchi",
    track: 5,
    cars: 12,
    note: "",
    stops: ["横浜", "上大岡", "金沢文庫", "金沢八景", "横須賀中央", "堀ノ内", "三浦海岸", "三崎口"],
  },
  {
    type: "普通",
    destination: "浦賀",
    destinationEn: "Uraga",
    track: 4,
    cars: 6,
    note: "神奈川新町で快特通過待合わせ",
    stops: ["八丁畷", "鶴見市場", "京急鶴見", "花月総持寺", "生麦", "京急新子安", "子安", "神奈川新町", "京急東神奈川", "神奈川", "横浜", "戸部", "日ノ出町", "黄金町", "南太田", "井土ヶ谷", "弘明寺", "上大岡", "屏風浦", "杉田", "京急富岡", "能見台", "金沢文庫", "金沢八景", "追浜", "京急田浦", "安針塚", "逸見", "汐入", "横須賀中央", "県立大学", "堀ノ内", "京急大津", "馬堀海岸", "浦賀"],
  },
  {
    type: "特急",
    destination: "三崎口",
    destinationEn: "Misakiguchi",
    track: 5,
    cars: 8,
    note: "",
    stops: ["神奈川新町", "横浜", "上大岡", "金沢文庫", "金沢八景", "横須賀中央", "堀ノ内", "三浦海岸", "三崎口"],
  },
  {
    type: "普通",
    destination: "金沢文庫",
    destinationEn: "Kanazawa-bunko",
    track: 4,
    cars: 6,
    note: "生麦で通過列車待合わせ",
    stops: ["八丁畷", "鶴見市場", "京急鶴見", "花月総持寺", "生麦", "京急新子安", "子安", "神奈川新町", "京急東神奈川", "神奈川", "横浜", "戸部", "日ノ出町", "黄金町", "南太田", "井土ヶ谷", "弘明寺", "上大岡", "屏風浦", "杉田", "京急富岡", "能見台", "金沢文庫"],
  },
  {
    type: "急行",
    destination: "逗子・葉山",
    destinationEn: "Zushi-Hayama",
    track: 5,
    cars: 8,
    note: "神奈川新町で快特通過待合わせ",
    stops: ["八丁畷", "京急鶴見", "生麦", "京急新子安", "神奈川新町", "横浜", "日ノ出町", "上大岡", "金沢文庫", "金沢八景", "六浦", "神武寺", "逗子・葉山"],
  },
  {
    type: "快特",
    destination: "三崎口",
    destinationEn: "Misakiguchi",
    track: 5,
    cars: 8,
    note: "",
    stops: ["横浜", "上大岡", "金沢文庫", "金沢八景", "横須賀中央", "堀ノ内", "三浦海岸", "三崎口"],
  },
  {
    type: "普通",
    destination: "浦賀",
    destinationEn: "Uraga",
    track: 4,
    cars: 6,
    note: "",
    stops: ["八丁畷", "鶴見市場", "京急鶴見", "花月総持寺", "生麦", "京急新子安", "子安", "神奈川新町", "京急東神奈川", "神奈川", "横浜", "戸部", "日ノ出町", "黄金町", "南太田", "井土ヶ谷", "弘明寺", "上大岡", "屏風浦", "杉田", "京急富岡", "能見台", "金沢文庫", "金沢八景", "追浜", "京急田浦", "安針塚", "逸見", "汐入", "横須賀中央", "県立大学", "堀ノ内", "京急大津", "馬堀海岸", "浦賀"],
  },
  {
    type: "特急",
    destination: "京急久里浜",
    destinationEn: "Keikyu Kurihama",
    track: 5,
    cars: 8,
    note: "",
    stops: ["神奈川新町", "横浜", "上大岡", "金沢文庫", "金沢八景", "横須賀中央", "堀ノ内", "京急久里浜"],
  },
];

/**
 * 1分おきのダイヤを生成（05:00 〜 翌00:30）
 */
export function generateFullTimetable(): DepartureEntry[] {
  const entries: DepartureEntry[] = [];
  let order = 1;

  // 5:00(300分) 〜 翌0:30(1470分)
  for (let totalMin = 300; totalMin <= 1470; totalMin++) {
    const h = Math.floor(totalMin / 60) % 24;
    const m = totalMin % 60;
    const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const pattern = patterns[(order - 1) % patterns.length];

    entries.push({
      order,
      track: pattern.track,
      type: pattern.type,
      destination: pattern.destination,
      destinationEn: pattern.destinationEn,
      time,
      cars: pattern.cars,
      note: pattern.note,
      stops: pattern.stops,
    });

    order++;
  }

  return entries;
}
