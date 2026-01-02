function LoginRow({ keyName, label, type = "text", value, onChange, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      <input
        name={keyName}
        type={type}
        value={value}
        onChange={onChange}
        className="
          border border-gray-300 rounded-lg px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500 transition
        "
        {...rest}
      />
    </div>
  );
}

export default LoginRow;