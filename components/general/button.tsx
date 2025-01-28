const Button = ({
  type,
  text,
  size,
  className,
  disable,
  clickHandler,
}: {
  type: "primary" | "secondary" | "disable";
  text: any;
  size: "xs" | "sm" | "md" | "lg";
  className?: string;
  disable?: boolean;
  clickHandler?: Function;
}) => {
  return (
    <div>
      <button
        type="button"
        disabled={disable}
        onClick={clickHandler ? () => clickHandler() : undefined}
        className={`${
          size === "lg"
            ? "p-4 px-10"
            : size === "md"
            ? "p-3 px-6"
            : size === "sm"
            ? "p-1 px-3"
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
            : "bg-primary text-white border border-white hover:bg-white hover:border-black hover:text-black transition-all duration-300"
        } ${className}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
