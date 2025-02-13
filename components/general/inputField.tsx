import React, { useState } from "react";

const InputField = ({
  id,
  name,
  value,
  type = "text",
  labelText,
  error,
  onChange,
  handleBlur,
  touched,
  className,
  disable,
}: {
  id: string | any;
  name: string;
  value: any;
  type?: string;
  labelText: string;
  error: any;
  onChange: any;
  handleBlur: any;
  touched: any;
  className?: any;
  disable?: boolean | false;
}) => {
  const [focused, setFocused] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleFocus = () => setFocused(true);

  const handleBlur2 = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    setErrorText(error);
  };

  return (
    <div
      className={`relative  ${
        error ? "mb-1" : "mb-2"
      } flex flex-col items-start `}
    >
      <label
        htmlFor={id}
        className={`absolute left-2 text-gray-400 transition-all duration-100 text-sm ${
          focused ||
          (type === "text" && value && value.length > 0) ||
          (type === "number" && value !== undefined && value !== null)
            ? "top-0 transform text-xs"
            : "top-2 transform translate-y-0.5"
        } `}
      >
        {labelText}
      </label>

      <input
        disabled={disable}
        id={id}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur2}
        className={`w-[260px]  h-12 border rounded px-2 text-sm pt-0.5  ${
          touched && error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-[#090909] ${
          className || "max-w-[300px]"
        }`}
      />

      {error && touched && (
        <span className="text-red-600 text-xs mt-1">{errorText}</span>
      )}
    </div>
  );
};

export default InputField;
