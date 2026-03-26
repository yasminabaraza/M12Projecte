import { ComponentPropsWithoutRef } from "react";

type FormButtonProps = ComponentPropsWithoutRef<"button">;

const FormButton = ({
  className = "",
  children,
  ...props
}: FormButtonProps) => (
  <button
    type="submit"
    className={`p-3 bg-cyan-600 text-abyss-bg font-bold rounded-lg hover:bg-cyan-500 transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default FormButton;
