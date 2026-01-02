// src/common/components/Button.jsx
export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  ...rest
}) {
  const base =
    "px-4 py-2 rounded-lg font-semibold transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 ",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
