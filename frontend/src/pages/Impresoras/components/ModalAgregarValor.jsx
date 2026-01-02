import { useState } from "react";

export default function ModalAgregarValor({ visible, label, onConfirm, onClose }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const valor = inputValue.trim().toUpperCase();
    if (!valor) return;
    onConfirm(valor);
    setInputValue("");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
        
        {/* Título */}
        <h2 className="text-xl font-semibold mb-4">
          Agregar nuevo valor a <span className="text-blue-600">{label}</span>
        </h2>

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Nuevo valor para ${label}`}
          className="
            w-full px-4 py-2 border rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:outline-none
            mb-4
          "
        />

        {/* Botones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg border 
              bg-gray-100 hover:bg-gray-200 
              text-gray-700 transition
            "
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-4 py-2 rounded-lg 
              bg-blue-600 hover:bg-blue-700 
              text-white transition
            "
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}