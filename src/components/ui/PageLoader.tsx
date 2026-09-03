"use client";

import { motion } from "framer-motion";
import { LisabaLogo } from "@/components/ui/LisabaLogo";

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.65, duration: 0.45, ease: "easeInOut" }}
      onAnimationComplete={() => {
        const el = document.getElementById("page-loader");
        if (el) el.style.display = "none";
      }}
      id="page-loader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-white"
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <LisabaLogo />
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.2, duration: 0.55, ease: "easeInOut" }}
        className="mt-5 h-0.5 rounded-full bg-brand-orange"
      />
    </motion.div>
  );
}
