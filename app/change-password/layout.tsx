"use client";

import { Navbar, Navbar2 } from "@/components";
import Sidebar from "@/components/sidebar/Sidebar";
import { getCookie } from "cookies-next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const userInfo = JSON.parse(getCookie("userInfo") as string);

  return (
    <main className={inter.className}>
      <Sidebar
        isOpen={isSidebarOpen}
        handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar />
      <Navbar2
        title={"Change Password"}
        handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      {children}
    </main>
  );
}
