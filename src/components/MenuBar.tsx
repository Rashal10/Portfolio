"use client";

import { useEffect, useState } from "react";
import { Mail, FileText, Linkedin } from "lucide-react";
import { AppleGlyph } from "@/components/AppleGlyph";
import { links } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type OpenMenu = "file" | "edit" | "view" | "hire" | null;

type MenuBarProps = {
  onLeaveMessage: () => void;
  onOpenContact: () => void;
  onOpenPhotos: () => void;
  onOpenAbout: () => void;
  onCloseWindow: () => void;
  onToggleRetro?: () => void;
};

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const hireOptions = [
  { label: "Email", href: links.email, icon: Mail, external: false },
  { label: "Resume PDF", href: links.resume, icon: FileText, external: true },
  { label: "LinkedIn", href: links.linkedin, icon: Linkedin, external: true },
] as const;

function MenuDropdown({
  open,
  children,
  align = "left",
}: {
  open: boolean;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute top-full mt-1 w-48 border-2 py-1 z-50 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        align === "right" ? "right-0" : "left-0"
      )}
    >
      {children}
    </div>
  );
}

function MenuDropdownItem({
  children,
  onClick,
  href,
  external,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  const className =
    "flex items-center gap-2 px-4 py-2 cursor-pointer text-sm transition-colors w-full text-left hover:bg-black hover:text-white";

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default function MenuBar({
  onLeaveMessage,
  onOpenContact,
  onOpenPhotos,
  onOpenAbout,
  onCloseWindow,
  onToggleRetro,
}: MenuBarProps) {
  const time = useClock();
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [appleClickCount, setAppleClickCount] = useState(0);

  useEffect(() => {
    if (appleClickCount === 3) {
      onToggleRetro?.();
      setAppleClickCount(0);
    }

    const timer = setTimeout(() => setAppleClickCount(0), 1000);
    return () => clearTimeout(timer);
  }, [appleClickCount, onToggleRetro]);

  const toggleMenu = (menu: Exclude<OpenMenu, null>) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const closeMenu = () => setOpenMenu(null);

  const menuTriggerClass = (menu: Exclude<OpenMenu, null>) =>
    cn(
      "cursor-pointer hover:underline",
      openMenu === menu && "bg-black text-white px-1"
    );

  return (
    <div
      className="menu-bar fixed top-0 left-0 right-0 h-8 border-b-2 border-black bg-white flex items-center justify-between px-2 md:px-4 z-40 font-mono text-sm select-none transition-colors duration-500 gravity-element"
      onClick={closeMenu}
    >
      <div className="flex items-center gap-3 md:gap-6 relative">
        <button
          type="button"
          aria-label="Apple menu"
          className="cursor-pointer hover:opacity-70 active:scale-90 transition-transform select-none flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setAppleClickCount((count) => count + 1);
          }}
        >
          <AppleGlyph size={18} />
        </button>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <span
            role="button"
            tabIndex={0}
            className={menuTriggerClass("file")}
            onClick={() => toggleMenu("file")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu("file");
              }
            }}
          >
            File
          </span>

          <MenuDropdown open={openMenu === "file"}>
            <MenuDropdownItem
              onClick={() => {
                closeMenu();
                onOpenAbout();
              }}
            >
              Open About Me
            </MenuDropdownItem>
            <MenuDropdownItem
              href={links.resume}
              external
              onClick={closeMenu}
            >
              <FileText size={14} />
              Open Resume
            </MenuDropdownItem>
            <MenuDropdownItem
              onClick={() => {
                closeMenu();
                onCloseWindow();
              }}
            >
              Close Window
            </MenuDropdownItem>
          </MenuDropdown>
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <span
            role="button"
            tabIndex={0}
            className={menuTriggerClass("edit")}
            onClick={() => toggleMenu("edit")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu("edit");
              }
            }}
          >
            Edit
          </span>

          <MenuDropdown open={openMenu === "edit"}>
            <MenuDropdownItem
              onClick={() => {
                closeMenu();
                onLeaveMessage();
              }}
            >
              Leave a Message
            </MenuDropdownItem>
          </MenuDropdown>
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <span
            role="button"
            tabIndex={0}
            className={menuTriggerClass("view")}
            onClick={() => toggleMenu("view")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu("view");
              }
            }}
          >
            View
          </span>

          <MenuDropdown open={openMenu === "view"}>
            <MenuDropdownItem
              onClick={() => {
                closeMenu();
                onOpenPhotos();
              }}
            >
              Photos
            </MenuDropdownItem>
          </MenuDropdown>
        </div>

        <span
          role="button"
          tabIndex={0}
          className="cursor-pointer hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
            onOpenContact();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              closeMenu();
              onOpenContact();
            }
          }}
        >
          Help
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => toggleMenu("hire")}
            className="px-2 md:px-3 py-0.5 uppercase text-[10px] md:text-xs font-bold tracking-wider whitespace-nowrap transition-colors bg-black text-white hover:bg-gray-800"
          >
            Hire Me
          </button>

          <MenuDropdown open={openMenu === "hire"} align="right">
            {hireOptions.map(({ label, href, icon: Icon, external }) => (
              <MenuDropdownItem
                key={label}
                href={href}
                external={external}
                onClick={closeMenu}
              >
                <Icon size={14} />
                {label}
              </MenuDropdownItem>
            ))}
          </MenuDropdown>
        </div>

        <span
          className="hidden md:block cursor-pointer select-none px-1 transition-colors min-w-[5.5rem] text-right hover:bg-black hover:text-white"
          suppressHydrationWarning
        >
          {time || "\u00a0"}
        </span>
      </div>
    </div>
  );
}
