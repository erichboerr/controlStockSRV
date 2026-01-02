import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContextCreate.jsx";

export function useToast() {
  return useContext(ToastContext);
}