import { useState } from "react";
import ToastContainer from "@/components/toast/ToastContainer";
import { createContext } from "react";

export const ToastContext = createContext({} as ToastObject);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast: ToastObject = {
    notify(options) {
      const nextId: number =
        toasts.length === 0
          ? 1
          : Math.max(...toasts.map((toast) => toast.id)) + 1;
      setToasts((prev) => [
        ...prev,
        { id: nextId, type: options.type, message: options.message },
      ]);
      // setTimeout(() => {
      //   setToasts((prev) => prev.filter((toast) => toast.id != nextId));
      // }, 5000);
    },
  };
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};
