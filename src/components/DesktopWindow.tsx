"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useDrag } from "@/hooks/useDrag";
import { cn } from "@/lib/utils";

type DesktopWindowProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus?: () => void;
  className?: string;
  initialOffset?: { x: number; y: number };
  zIndex?: number;
  floating?: boolean;
  anchorCenter?: boolean;
};

export default function DesktopWindow({
  title,
  children,
  onClose,
  onFocus,
  className,
  initialOffset = { x: 0, y: 0 },
  zIndex = 10,
  floating = true,
  anchorCenter = false,
}: DesktopWindowProps) {
  const { position, dragHandlers } = useDrag(initialOffset);

  return (
    <div
      className={cn(
        "pointer-events-auto touch-none w-full md:w-[600px] max-w-[95vw]",
        floating &&
          (anchorCenter
            ? "md:absolute md:left-1/2 md:top-[40%]"
            : "md:absolute left-2 top-10 md:left-20 md:top-20")
      )}
      style={{
        transform: floating
          ? anchorCenter
            ? `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
            : `translate(${position.x}px, ${position.y}px)`
          : undefined,
        zIndex: floating ? zIndex : undefined,
      }}
      onPointerDown={onFocus}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col",
          className
        )}
      >
        <div
          className="h-8 border-b-2 border-black flex items-center justify-between px-2 bg-white cursor-grab active:cursor-grabbing select-none handle"
          {...dragHandlers}
        >
          <button
            type="button"
            onClick={onClose}
            className="w-4 h-4 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors shrink-0 cursor-pointer"
            aria-label="Close window"
          >
            <X size={10} />
          </button>
          <span className="font-mono font-bold text-sm uppercase tracking-widest bg-white px-2 truncate flex-1 text-center pointer-events-none">
            {title}
          </span>
          <div className="w-4 shrink-0" />
        </div>

        <div className="window-content p-4 font-mono text-sm h-[60vh] md:h-[400px] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
