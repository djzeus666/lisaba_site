"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type AccessibilityMode = "default" | "impaired" | "high-contrast";

type AccessibilityContextValue = {
  mode: AccessibilityMode;
  toggle: () => void;
  isImpaired: boolean;
  isHighContrast: boolean;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

const MODES: AccessibilityMode[] = ["default", "impaired", "high-contrast"];

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AccessibilityMode>("default");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("a11y-impaired", "a11y-high-contrast");
    if (mode === "impaired") root.classList.add("a11y-impaired");
    if (mode === "high-contrast") root.classList.add("a11y-high-contrast");
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((prev) => {
      const idx = MODES.indexOf(prev);
      return MODES[(idx + 1) % MODES.length];
    });
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        mode,
        toggle,
        isImpaired: mode === "impaired",
        isHighContrast: mode === "high-contrast",
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
