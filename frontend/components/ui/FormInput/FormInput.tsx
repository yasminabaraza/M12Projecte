import { ComponentPropsWithoutRef } from "react";

type FormInputProps = ComponentPropsWithoutRef<"input">;

const FormInput = ({ className = "", ...props }: FormInputProps) => (
  <input
    className={`p-3 rounded-lg bg-abyss-bg text-cyan-50 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
    {...props}
  />
);

export default FormInput;
