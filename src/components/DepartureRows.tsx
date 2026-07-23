"use client";

import { DepartureEntry } from "@/types/departure";
import DepartureRow from "./DepartureRow";
import styles from "./DepartureRows.module.css";

interface DepartureRowsProps {
  departures: DepartureEntry[];
}

const labels = ["先発", "次発", "次々発"];

export default function DepartureRows({ departures }: DepartureRowsProps) {
  return (
    <div className={styles.container}>
      {labels.map((label, i) => (
        <div key={i} className={styles.rowWrapper}>
          <DepartureRow departure={departures[i] ?? null} label={label} />
        </div>
      ))}
    </div>
  );
}
