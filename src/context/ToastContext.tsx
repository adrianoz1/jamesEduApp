import React, { createContext, useState, useContext } from "react";
import { Toast } from "../components/ToastAlert";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: any) => {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage !== "" && <Toast message={toastMessage} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
