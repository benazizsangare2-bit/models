"use client";

import { motion } from "framer-motion";

export default function BackgroundPatterns() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* Subtle grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07] text-gray-800"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Gradient blobs */}
      <motion.div
        className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-rose-500 blur-3xl opacity-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-pink-600 blur-3xl opacity-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-purple-600 blur-3xl opacity-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
    </div>
  );
}
