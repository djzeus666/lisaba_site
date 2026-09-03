import React from "react";

/* Pass-through root layout: (frontend) and (payload) each own html/body. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
