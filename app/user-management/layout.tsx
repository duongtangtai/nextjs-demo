import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WrapperProvider from "@/context/WrapperProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Management",
  description: "User Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <WrapperProvider>{children}</WrapperProvider>
      </body>
    </html>
  );
}
