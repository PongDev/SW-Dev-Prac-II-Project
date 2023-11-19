"use client";

import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaSun } from "react-icons/fa6";
export default function ColorModeBtn() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label="Toggle color mode" aria-label="Toggle color mode">
      <IconButton
        aria-label="color-mode"
        icon={<FaSun />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
}
