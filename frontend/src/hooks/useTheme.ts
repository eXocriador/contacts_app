// frontend/src/hooks/useTheme.ts
// Повертаємо оригінальний функціонал, а не хардкод

import { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
