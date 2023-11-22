import { HTMLInputTypeAttribute } from "react";

export default function FormTextInput({
  name,
  placeholder,
  type,
  required,
}: {
  name?: string | undefined;
  placeholder?: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  required?: boolean | undefined;
}) {
  return (
    <input
      type={type ?? "text"}
      className="border border-black my-1 px-2 py-1 rounded-md shadow-md"
      name={name}
      placeholder={placeholder}
      required={required}
    />
  );
}
