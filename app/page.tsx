"use client"

import { Navbar2 } from "@/components";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div style={{
        position: "relative"
      }}>
        <Sidebar isOpen={isSidebarOpen} handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Navbar />
        <Navbar2 title={"HOME PAGE"} handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
      </div>
      <main>Home</main>
    </>
  );
}
