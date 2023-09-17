"use client";

import { Navbar2 } from "@/components";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useCallback, useContext, useState } from "react";
import ToastContainer from "@/components/toast/ToastContainer";
import { render, unmountComponentAtNode } from "react-dom";
import Toast from "@/components/toast/Toast";
import { ToastContext } from "@/context/toast/ToastProvider";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [num, setNum] = useState(1)
  //const toast = useContext(ToastContext)
  const toast : ToastObject = useContext(ToastContext);
  /*
    toast.info({
      message: ...;
      duration: ...;
    })
    toast.error({
      message: ...;
      duration: ...;
    })
  */
  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar />
      <Navbar2
        title={"HOME PAGE"}
        handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <button
        onClick={() => {
          toast.notify({ type: "info", message: "Hello thererrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrr rrrrrrrrrrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr rrrrrr rrrr rrrrrrrrrrrrrrrrr rrrrrrrr rrrrrrrrrrrrrrrrr"})
        }}
      >
        Info Toast
      </button>
      <button
        onClick={() => {
          toast.notify({ type: "success", message: "Hello thererrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrr rrrrrrrrrrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr rrrrrr rrrr rrrrrrrrrrrrrrrrr rrrrrrrr rrrrrrrrrrrrrrrrr"})
        }}
      >
        Success Toast
      </button>
      <button
        onClick={() => {
          toast.notify({ type: "warning", message: "Hello thererrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrr rrrrrrrrrrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr rrrrrr rrrr rrrrrrrrrrrrrrrrr rrrrrrrr rrrrrrrrrrrrrrrrr"})
        }}
      >
        Warning Toast
      </button>
      <button
        onClick={() => {
          toast.notify({ type: "error", message: "Hello thererrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrr rrrrrrrrrrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr rrrrrr rrrr rrrrrrrrrrrrrrrrr rrrrrrrr rrrrrrrrrrrrrrrrr"})
        }}
      >
        Error Toast
      </button>
    </>
  );
}
