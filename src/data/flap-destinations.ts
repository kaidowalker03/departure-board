// パタパタ行先フラップのリスト（実物の順番通り）
// 空きは空文字列で表現

export interface FlapEntry {
  ja: string;
  en: string;
}

export const destinationFlaps: FlapEntry[] = [
  { ja: "通過", en: "Passage" },             // 01
  { ja: "当駅止まり", en: "Termination" },   // 02
  { ja: "", en: "" },                         // 03 (空き)
  { ja: "", en: "" },                         // 04 (空き)
  { ja: "遅れが出ています", en: "Delayed" }, // 05
  { ja: "成田", en: "Narita" },              // 06
  { ja: "東中山", en: "Higashi-Nakayama" },  // 07
  { ja: "小岩", en: "Koiwa" },              // 08
  { ja: "高砂", en: "Takasago" },            // 09
  { ja: "青砥", en: "Aoto" },               // 10
  { ja: "押上", en: "Oshiage" },             // 11
  { ja: "浅草橋", en: "Asakusabashi" },      // 12
  { ja: "泉岳寺", en: "Sengakuji" },        // 13
  { ja: "品川", en: "Shinagawa" },           // 14
  { ja: "京急川崎", en: "Keikyu Kawasaki" }, // 15
  { ja: "神奈川新町", en: "Kanagawa-shimmachi" }, // 16
  { ja: "横浜", en: "Yokohama" },            // 17
  { ja: "上大岡", en: "Kamiooka" },          // 18
  { ja: "金沢文庫", en: "Kanazawa-bunko" },  // 19
  { ja: "金沢八景", en: "Kanazawa-hakkei" }, // 20
  { ja: "逗子・葉山", en: "Zushi-Hayama" },  // 21
  { ja: "堀ノ内", en: "Horinouchi" },        // 22
  { ja: "浦賀", en: "Uraga" },              // 23
  { ja: "京急久里浜", en: "Keikyu Kurihama" }, // 24
  { ja: "三浦海岸", en: "Miurakaigan" },     // 25
  { ja: "三崎口", en: "Misakiguchi" },       // 26
  { ja: "新鎌ヶ谷", en: "Shin Kamagaya" },  // 27
  { ja: "西白井", en: "Nishi-Shiroi" },      // 28
  { ja: "千葉ニュータウン中央", en: "Chiba New Town Chuo" }, // 29
  { ja: "金町", en: "Kanamachi" },           // 30
  { ja: "うすい", en: "Usui" },              // 31
  { ja: "佐倉", en: "Sakura" },             // 32
  { ja: "宗吾参道", en: "Sogosando" },       // 33
  { ja: "東成田", en: "Higashi-Narita" },    // 34
  { ja: "成田空港", en: "Narita Airport" },  // 35
  { ja: "", en: "" },                         // 36 (空き)
  { ja: "京急蒲田", en: "Keikyu Kamata" },   // 37
  { ja: "羽田空港", en: "Haneda Airport" },  // 38
  { ja: "印西牧の原", en: "Inzai-makinohara" }, // 39
  { ja: "京成津田沼", en: "Keisei Tsudanuma" }, // 40
  { ja: "印旛日本医大", en: "Imba Nihon-idai" }, // 41
  { ja: "", en: "" },                         // 42 (空き)
  { ja: "京急久里浜・逗子・葉山", en: "" },   // 43
  { ja: "三崎口・逗子・葉山", en: "" },       // 44
  { ja: "京急久里浜・浦賀", en: "" },         // 45
  { ja: "三崎口・浦賀", en: "" },             // 46
  { ja: "", en: "" },                         // 47 (空き)
  { ja: "", en: "" },                         // 48 (空き)
  { ja: "", en: "" },                         // 49 (空き)
  { ja: "", en: "" },                         // 50 (空き)
  { ja: "", en: "" },                         // 51 (空き)
  { ja: "", en: "" },                         // 52 (空き)
  { ja: "", en: "" },                         // 53 (空き)
  { ja: "", en: "" },                         // 54 (空き)
  { ja: "", en: "" },                         // 55 (空き)
  { ja: "", en: "" },                         // 56 (空き → 01に戻る)
];

/**
 * 指定の行先のフラップインデックスを取得
 */
export function getFlapIndex(destination: string): number {
  const index = destinationFlaps.findIndex((f) => f.ja === destination);
  return index >= 0 ? index : 0;
}

/**
 * 現在のインデックスから目的のインデックスまでの経路を取得
 * （フラップは一方向にしか回らないので、常に前進）
 */
export function getFlapSequence(fromDest: string, toDest: string): FlapEntry[] {
  const fromIndex = getFlapIndex(fromDest);
  const toIndex = getFlapIndex(toDest);

  if (fromIndex === toIndex) return [];

  const sequence: FlapEntry[] = [];
  const total = destinationFlaps.length;

  let current = (fromIndex + 1) % total;
  while (current !== toIndex) {
    const entry = destinationFlaps[current];
    // 空きはスキップせず通過する（実物もフラップは全部回る）
    sequence.push(entry);
    current = (current + 1) % total;
  }
  sequence.push(destinationFlaps[toIndex]);

  return sequence;
}
