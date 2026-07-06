"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

type IntroSplashProps = {
  onComplete: () => void;
};

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onComplete, 350);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.35 }}
      onClick={dismiss}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") dismiss();
      }}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-mono lowercase tracking-tighter cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -10 : 0 }}
        transition={{ duration: 0.35, delay: leaving ? 0 : 0.15 }}
      >
        {profile.introText}
      </motion.h1>
    </motion.div>
  );
}
