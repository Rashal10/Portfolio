"use client";

import { FileText, Folder } from "lucide-react";
import type { WindowId } from "@/data/portfolio";
import { desktopIcons } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type DesktopIconsProps = {
  openKinds: NonNullable<WindowId>[];
  onSelect: (id: NonNullable<WindowId>) => void;
};

export default function DesktopIcons({
  openKinds,
  onSelect,
}: DesktopIconsProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-3 w-full md:w-auto mt-4 md:mt-8 ml-2 md:ml-8 pointer-events-auto select-none">
      {desktopIcons.map((icon) => {
        const isOpen = openKinds.includes(icon.id);
        return (
          <button
            key={icon.id}
            type="button"
            onClick={() => onSelect(icon.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 w-24 p-1 cursor-pointer group transition-colors",
              isOpen ? "opacity-100" : "opacity-90 hover:opacity-100"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 border-2 border-black bg-white flex items-center justify-center shrink-0 transition-colors",
                isOpen ? "bg-gray-100" : "group-hover:bg-gray-50"
              )}
            >
              {icon.type === "folder" ? (
                <Folder
                  size={28}
                  strokeWidth={1.5}
                  className="text-black fill-white"
                />
              ) : (
                <FileText size={28} strokeWidth={1.5} className="text-black" />
              )}
            </div>
            <span
              className={cn(
                "text-[10px] md:text-xs text-center font-mono leading-tight px-1",
                isOpen && "font-bold underline decoration-1 underline-offset-2"
              )}
            >
              {icon.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
