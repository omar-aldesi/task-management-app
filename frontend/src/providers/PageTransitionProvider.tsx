"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const variants = {
    // Hidden state for the page (completely transparent)
    hidden: { opacity: 0 },
    // Visible state for the page
    enter: { opacity: 1 },
    // Exit state for the page (completely transparent)
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{
          type: "tween", // A simple, time-based animation
          duration: 0.3, // A quick, subtle transition
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
