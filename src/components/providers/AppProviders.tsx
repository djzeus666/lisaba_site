"use client";

import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider>
      <CustomCursor />
      {children}
    </AccessibilityProvider>
  );
}
