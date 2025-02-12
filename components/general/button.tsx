const Button = ({
  type,
  text,
  size,
  className,
  disable,
  clickHandler,
  action,
}: {
  type: "primary" | "secondary" | "disable" | "danger";
  text: any;
  size: "xs" | "sm" | "md" | "lg";
  className?: string;
  disable?: boolean;
  clickHandler?: Function;
  action?: "button" | "submit" | "reset";
}) => {
  return (
    <div>
      <button
        type={action || "button"}
        disabled={type == "disable" ? true : false}
        onClick={clickHandler ? () => clickHandler() : undefined}
        className={`${
          size === "lg"
            ? "p-4 px-10"
            : size === "md"
            ? "p-3 px-6"
            : size === "sm"
            ? "p-1 px-3 w-full"
            : size === "xs"
            ? "p-1"
            : "p-2"
        } rounded-md ${
          type === "primary"
            ? "bg-white text-black border hover:bg-black hover:text-white transition-all duration-300"
            : type === "secondary"
            ? "bg-primary text-white border border-white hover:bg-white hover:border-black hover:text-black transition-all duration-300"
            : type === "disable"
            ? "bg-gray-300 text-black border"
            : type === "danger"
            ? "bg-red-600 text-white border border-white hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300"
            : "bg-primary text-white border border-white hover:bg-white hover:border-black hover:text-black transition-all duration-300"
        } ${className}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
