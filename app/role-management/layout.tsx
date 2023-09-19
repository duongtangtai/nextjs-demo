import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Role Management",
  description: "Role Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={inter.className}>{children}</main>;
}
