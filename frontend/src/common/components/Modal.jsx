export default function Modal({ show, onHide, children, maxWidth = "max-w-4xl" }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${maxWidth} max-h-[85vh] overflow-y-auto relative animate-fadeIn pt-6`}
      >
        <button
          onClick={onHide}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow z-10"
          title="Cerrar"
        >
          <i className="bi bi-x-lg text-lg" />
        </button>

        {children}
      </div>
    </div>
  );
}
