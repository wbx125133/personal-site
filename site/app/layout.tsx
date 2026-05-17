import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "王柏晰 Silas Wang | AI Product Manager",
  description: "王柏晰的个人 Hub 站，聚合 AI 产品经历、作品、文章与联系方式。",
  openGraph: {
    title: "王柏晰 Silas Wang | AI Product Manager",
    description: "让 AI 真正落地的人",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
