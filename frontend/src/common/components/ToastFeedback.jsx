import { useEffect } from "react";

export default function ToastFeedback({
  message,
  type,
  duration = 3000,
  onClose,
}) {
  const baseStyles = "px-4 py-2 rounded shadow-md animate-fade-in-up";
  const typeStyles = {
    info: "bg-sky-500 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
  };

  const colorClass = typeStyles[type] || typeStyles.info;

  // Auto-cierre
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={`${baseStyles} ${colorClass}`}>{message}</div>;
}
