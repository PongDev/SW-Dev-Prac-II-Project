"use client";

import { useColorMode } from "@chakra-ui/react";

type BtnColor = "Submit" | "Danger";

export default function Button({
  type,
  disabled,
  text,
  color,
}: {
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean | undefined;
  text: string;
  color: BtnColor;
}) {
  const { colorMode } = useColorMode();
  let btnBgColor = "";

  switch (color) {
    case "Submit":
      btnBgColor =
        colorMode === "light"
          ? "bg-green-300 hover:bg-green-500"
          : "bg-green-700 hover:bg-green-600";
      break;
    case "Danger":
      btnBgColor =
        colorMode === "light"
          ? "bg-red-400 hover:bg-red-500"
          : "bg-red-600 hover:bg-red-400";
      break;
  }
  return (
    <button
      className={`${btnBgColor} rounded-md my-3 border border-black py-1`}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
