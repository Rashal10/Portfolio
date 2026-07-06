"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Folder, Github, Linkedin, Mail } from "lucide-react";
import { links } from "@/data/portfolio";
import { XIcon } from "@/lib/icons";

type DockProps = {
  onProjectsClick?: () => void;
};

type DockItem = {
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  action: () => void;
};

export default function Dock({ onProjectsClick }: DockProps) {
  const items: DockItem[] = [
    { label: "Files", icon: Folder, action: () => onProjectsClick?.() },
    {
      label: "X",
      icon: XIcon,
      action: () => window.open(links.twitter, "_blank", "noopener,noreferrer"),
    },
    {
      label: "GitHub",
      icon: Github,
      action: () => window.open(links.github, "_blank", "noopener,noreferrer"),
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      action: () => window.open(links.linkedin, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Mail",
      icon: Mail,
      action: () => {
        window.location.href = links.email;
      },
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 md:px-0 select-none">
      <motion.div
        className="flex items-end justify-center gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-3 backdrop-blur-md border-2 rounded-2xl shadow-lg w-fit mx-auto transition-colors duration-500 gravity-element bg-white/80 border-black"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              type="button"
              aria-label={item.label}
              className="relative group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
              whileHover={{ scale: 1.2, y: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={item.action}
            >
              <div className="p-2 md:p-3 rounded-xl border-2 shadow-sm group-hover:shadow-md transition-all bg-white border-black hover:bg-black hover:text-white">
                <Icon size={20} className="md:w-6 md:h-6" />
              </div>
              <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded font-mono whitespace-nowrap hidden md:block bg-black text-white pointer-events-none">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
