import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "発車標シミュレーター",
  description:
    "駅の発車案内表示器（発車標）をWebでリアルタイムに再現。京急パタパタ表示器のシミュレーター。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-sans-jp)]">
        {children}
      </body>
    </html>
  );
}
