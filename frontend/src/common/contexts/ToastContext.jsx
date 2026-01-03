import { useState, useCallback } from "react";
import ToastFeedback from "../components/ToastFeedback.jsx";
import { ToastContext } from "./ToastContextCreate.jsx";
import { v4 as uuidv4 } from "uuid";


export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = uuidv4();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* ✅ Stack de toasts con Tailwind */}
      <div
        className="
          fixed top-20 right-4 
          flex flex-col gap-3 
          z-50
        "
      >
        {toasts.map((t) => (
          <ToastFeedback
            key={t.id}
            message={t.message}
            type={t.type}
            duration={t.duration}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}