import { useState } from "react";
import ToastContainer from "@/components/toast/ToastContainer";
import { createContext } from "react";
import uuid from "react-uuid";

export const ToastContext = createContext({} as ToastObject);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast: ToastObject = {
    notify(options) {
      const nextId: string = uuid();
      const timeoutId = setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id != nextId));
      }, 4000);
      setToasts((prev) => [
        ...prev,
        { 
          id: nextId, 
          type: options.type, 
          message: options.message, 
          close() {
            console.log("close toast")
            clearTimeout(timeoutId);
            setToasts((prev) => prev.filter((toast) => toast.id != nextId));
          }
        },
      ]);
    },
  };
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

//   const toast: ToastObject = {
//     notify(options) {
//       const nextId: string = uuid();
//       setToasts((prev) => [
//         ...prev,
//         { id: nextId, type: options.type, message: options.message},
//       ]);
//       setTimeout(() => {
//         setToasts((prev) => prev.filter((toast) => toast.id != nextId));
//       }, 4000);
//     },
//   };
//   return (
//     <ToastContext.Provider value={toast}>
//       {children}
//       <ToastContainer toasts={toasts} />
//     </ToastContext.Provider>
//   );
// };
