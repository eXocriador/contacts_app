import { useEffect } from "react";

// Simplified to just apply the dark theme as per the new design.
export const useTheme = () => {
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove 'light' if it exists and ensure 'dark' is present.
    root.classList.remove("light");
    root.classList.add("dark");
  }, []);
};
