"use client";

import { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientTransition({
  children,
  locale,
}: PropsWithChildren<{ locale: string }>) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={locale}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
