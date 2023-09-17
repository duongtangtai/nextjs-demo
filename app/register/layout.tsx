import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WrapperProvider from "@/context/WrapperProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Register",
  description: "Register Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={inter.className}>{children}</main>;
}
