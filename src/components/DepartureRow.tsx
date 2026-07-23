"use client";

import { DepartureEntry } from "@/types/departure";
import { findFlapIndex, shubetsuFlaps, shuppatsuFlaps, noribaFlaps, jikanFlaps, fun10Flaps, fun1Flaps, ryousuFlaps } from "@/data/flap-lists";
import { getFlapIndex } from "@/data/flap-destinations";
import { findBikouIndex } from "@/data/flap-bikou";
import FlapUnit from "./FlapUnit";
import styles from "./DepartureRow.module.css";

interface DepartureRowProps {
  departure: DepartureEntry | null;
  label: string; // "先発", "次発", "次々発"
}

/**
 * 種別名からフラップリスト上の表記に変換
 */
function getShubetsuValue(type: string): string {
  // trainTypeStylesのlabelとフラップリストの表記を合わせる
  const map: Record<string, string> = {
    "通快": "通快",
    "快特": "快特",
    "特急": "特急",
    "急行": "急行",
    "普通": "普通",
    "回送": "回送",
    "士快特": "エアポート快特",
    "士特急": "エアポート特急",
    "士急行": "エアポート急行",
    "ウィング号": "ウィング号",
  };
  return map[type] ?? "";
}

/**
 * 時刻文字列からフラップインデックスを計算
 */
function getTimeIndices(time: string): { hour: number; min10: number; min1: number } {
  const [h, m] = time.split(":").map(Number);
  const hourValue = String(h);
  const min10Value = String(Math.floor(m / 10));
  const min1Value = String(m % 10);

  return {
    hour: findFlapIndex(jikanFlaps, hourValue),
    min10: findFlapIndex(fun10Flaps, min10Value),
    min1: findFlapIndex(fun1Flaps, min1Value),
  };
}

/**
 * 両数からフラップインデックスを取得
 */
function getRyousuValue(cars: number): string {
  return `${cars}両`;
}

export default function DepartureRow({ departure, label }: DepartureRowProps) {
  if (!departure) {
    return <div className={styles.row} />;
  }

  const shuppatsuIdx = findFlapIndex(shuppatsuFlaps, label);
  const noribaIdx = findFlapIndex(noribaFlaps, `${departure.track}番線`);
  const shubetsuIdx = findFlapIndex(shubetsuFlaps, getShubetsuValue(departure.type));
  const ekimeiIdx = getFlapIndex(departure.destination);
  const timeIndices = getTimeIndices(departure.time);
  const ryousuIdx = findFlapIndex(ryousuFlaps, getRyousuValue(departure.cars));
  const bikouIdx = findBikouIndex(departure.note);

  return (
    <div className={styles.row}>
      {/* 出発順 */}
      <FlapUnit
        basePath="/flaps/shuppatsu"
        animPath="/flaps/shuppatsu_anim"
        targetIndex={shuppatsuIdx}
        totalFlaps={20}
      />

      {/* のりば */}
      <FlapUnit
        basePath="/flaps/noriba"
        animPath="/flaps/noriba_anim"
        targetIndex={noribaIdx}
        totalFlaps={20}
      />

      {/* 種別 */}
      <FlapUnit
        basePath="/flaps/shubetsu"
        animPath="/flaps/shubetsu_anim"
        targetIndex={shubetsuIdx}
        totalFlaps={20}
      />

      {/* 駅名 */}
      <FlapUnit
        basePath="/flaps/ekimei"
        animPath="/flaps/ekimei_anim"
        targetIndex={ekimeiIdx}
        totalFlaps={56}
      />

      {/* 時間(時) */}
      <FlapUnit
        basePath="/flaps/jikan"
        animPath="/flaps/jikan_anim"
        targetIndex={timeIndices.hour}
        totalFlaps={30}
      />

      {/* 時間(10分) */}
      <FlapUnit
        basePath="/flaps/fun10"
        animPath="/flaps/fun10_anim"
        targetIndex={timeIndices.min10}
        totalFlaps={20}
      />

      {/* 時間(1分) */}
      <FlapUnit
        basePath="/flaps/fun1"
        animPath="/flaps/fun1_anim"
        targetIndex={timeIndices.min1}
        totalFlaps={20}
      />

      {/* 両数 */}
      <FlapUnit
        basePath="/flaps/ryousu"
        animPath="/flaps/ryousu_anim"
        targetIndex={ryousuIdx}
        totalFlaps={20}
      />

      {/* 備考 */}
      <FlapUnit
        basePath="/flaps/bikou"
        animPath="/flaps/bikou_anim"
        targetIndex={bikouIdx}
        totalFlaps={66}
      />
    </div>
  );
}
