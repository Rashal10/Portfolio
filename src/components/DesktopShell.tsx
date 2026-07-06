"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { ProjectId, WindowId } from "@/data/portfolio";
import { projects } from "@/data/portfolio";
import MenuBar from "@/components/MenuBar";
import DesktopIcons from "@/components/DesktopIcons";
import ProfileCard from "@/components/ProfileCard";
import StatusWidget from "@/components/StatusWidget";
import Dock from "@/components/Dock";
import DesktopWindow from "@/components/DesktopWindow";
import DesktopBackground from "@/components/DesktopBackground";
import IntroSplash from "@/components/IntroSplash";
import AboutContent from "@/components/windows/AboutContent";
import EducationContent from "@/components/windows/EducationContent";
import ExperienceContent from "@/components/windows/ExperienceContent";
import SkillsContent from "@/components/windows/SkillsContent";
import ProjectsContent from "@/components/windows/ProjectsContent";
import ContactContent from "@/components/windows/ContactContent";
import LeaveMessageContent from "@/components/windows/LeaveMessageContent";
import PhotosContent from "@/components/windows/PhotosContent";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const windowTitles: Record<NonNullable<WindowId>, string> = {
  about: "ABOUT ME.TXT",
  education: "EDUCATION.TXT",
  experience: "WORK EXPERIENCE.TXT",
  skills: "SKILLS.TXT",
  projects: "PROJECTS",
  contact: "CONTACT INFO.TXT",
};

type WindowKind = NonNullable<WindowId> | "message" | "photos";

type OpenWindow = {
  instanceId: string;
  kind: WindowKind;
  zIndex: number;
  initialOffset: { x: number; y: number };
  projectId?: ProjectId | null;
};

let windowIdCounter = 0;

function createWindow(
  kind: WindowKind,
  zIndex: number,
  offsetIndex: number,
  projectId?: ProjectId | null
): OpenWindow {
  windowIdCounter += 1;
  return {
    instanceId: `${kind}-${windowIdCounter}`,
    kind,
    zIndex,
    initialOffset:
      kind === "about"
        ? { x: 0, y: 0 }
        : { x: offsetIndex * 28, y: offsetIndex * 28 },
    projectId: kind === "projects" ? (projectId ?? null) : undefined,
  };
}

export default function DesktopShell() {
  const [showIntro, setShowIntro] = useState(true);
  const [isCrtMode, setIsCrtMode] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>(() => [
    createWindow("about", 1, 0),
  ]);

  const completeIntro = useCallback(() => setShowIntro(false), []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setShowIntro(false);
    }
  }, []);

  useEffect(() => {
    if (!showIntro) {
      document.documentElement.classList.remove("intro-pending");
    }
  }, [showIntro]);

  const bringToFront = useCallback((instanceId: string) => {
    setOpenWindows((prev) => {
      const target = prev.find((w) => w.instanceId === instanceId);
      if (!target) return prev;
      const nextZ = Math.max(...prev.map((w) => w.zIndex)) + 1;
      return prev.map((w) =>
        w.instanceId === instanceId ? { ...w, zIndex: nextZ } : w
      );
    });
  }, []);

  const closeWindow = useCallback((instanceId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.instanceId !== instanceId));
  }, []);

  const openWindow = useCallback(
    (id: NonNullable<WindowId>) => {
      setOpenWindows((prev) => {
        const existing = prev.find((w) => w.kind === id);
        if (existing) {
          const nextZ = Math.max(...prev.map((w) => w.zIndex)) + 1;
          return prev.map((w) =>
            w.instanceId === existing.instanceId
              ? { ...w, zIndex: nextZ }
              : w
          );
        }
        const nextZ = Math.max(...prev.map((w) => w.zIndex), 0) + 1;
        return [...prev, createWindow(id, nextZ, prev.length)];
      });
    },
    []
  );

  const openMessage = useCallback(() => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.kind === "message");
      if (existing) {
        const nextZ = Math.max(...prev.map((w) => w.zIndex)) + 1;
        return prev.map((w) =>
          w.instanceId === existing.instanceId ? { ...w, zIndex: nextZ } : w
        );
      }
      const nextZ = Math.max(...prev.map((w) => w.zIndex), 0) + 1;
      return [...prev, createWindow("message", nextZ, prev.length)];
    });
  }, []);

  const openPhotos = useCallback(() => {
    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.kind === "photos");
      if (existing) {
        const nextZ = Math.max(...prev.map((w) => w.zIndex)) + 1;
        return prev.map((w) =>
          w.instanceId === existing.instanceId ? { ...w, zIndex: nextZ } : w
        );
      }
      const nextZ = Math.max(...prev.map((w) => w.zIndex), 0) + 1;
      return [...prev, createWindow("photos", nextZ, prev.length)];
    });
  }, []);

  const setProjectForWindow = useCallback(
    (instanceId: string, projectId: ProjectId | null) => {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.instanceId === instanceId ? { ...w, projectId } : w
        )
      );
    },
    []
  );

  const closeTopWindow = useCallback(() => {
    setOpenWindows((prev) => {
      if (prev.length === 0) return prev;
      const topmost = [...prev].sort((a, b) => b.zIndex - a.zIndex)[0];
      return prev.filter((w) => w.instanceId !== topmost.instanceId);
    });
  }, []);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const visibleWindows =
    isMobile && openWindows.length > 0
      ? [
          [...openWindows].sort((a, b) => b.zIndex - a.zIndex)[0],
        ]
      : openWindows;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.body.dataset.photosLightboxOpen === "true") return;
      const active = document.activeElement;
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        active instanceof HTMLSelectElement
      ) {
        return;
      }
      setOpenWindows((prev) => {
        if (prev.length === 0) return prev;
        const topmost = [...prev].sort((a, b) => b.zIndex - a.zIndex)[0];
        return prev.filter((w) => w.instanceId !== topmost.instanceId);
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderWindowContent = (win: OpenWindow) => {
    switch (win.kind) {
      case "about":
        return <AboutContent />;
      case "education":
        return <EducationContent />;
      case "experience":
        return <ExperienceContent />;
      case "skills":
        return <SkillsContent />;
      case "projects":
        return (
          <ProjectsContent
            selectedProject={win.projectId ?? null}
            onSelectProject={(id) => setProjectForWindow(win.instanceId, id)}
            onBack={() => setProjectForWindow(win.instanceId, null)}
          />
        );
      case "contact":
        return <ContactContent />;
      case "message":
        return <LeaveMessageContent />;
      case "photos":
        return <PhotosContent />;
      default:
        return null;
    }
  };

  const getWindowTitle = (win: OpenWindow) => {
    if (win.kind === "message") return "LEAVE A MESSAGE";
    if (win.kind === "photos") return "PHOTOS";
    if (win.kind === "projects" && win.projectId) {
      return (
        projects.items.find((p) => p.id === win.projectId)?.filename ??
        "PROJECT.TXT"
      );
    }
    return windowTitles[win.kind as NonNullable<WindowId>];
  };

  const openKinds = openWindows.map((w) =>
    w.kind === "message" ? null : w.kind
  ).filter(Boolean) as NonNullable<WindowId>[];

  return (
    <main
      className={cn(
        "h-screen w-screen overflow-hidden flex flex-col font-sans text-black bg-white select-none selection:bg-black selection:text-white",
        isCrtMode && "crt-mode"
      )}
    >
      {showIntro ? (
        <IntroSplash onComplete={completeIntro} />
      ) : (
        <>
          <MenuBar
            onLeaveMessage={openMessage}
            onOpenContact={() => openWindow("contact")}
            onOpenPhotos={openPhotos}
            onOpenAbout={() => openWindow("about")}
            onCloseWindow={closeTopWindow}
            onToggleRetro={() => setIsCrtMode((active) => !active)}
          />

          <div className="flex-1 pt-8 flex flex-col relative">
            <div className="flex-1 relative p-4 overflow-y-auto custom-scrollbar md:overflow-hidden flex flex-col md:block desktop-background">
              <div className="w-full h-full absolute inset-0 pointer-events-none flex flex-col md:block">
                <DesktopBackground />

                <div className="relative md:absolute md:left-0 md:top-0 md:mt-8 md:ml-8 z-10 pointer-events-auto order-1">
                  <DesktopIcons openKinds={openKinds} onSelect={openWindow} />
                </div>

                <div className="relative z-20 flex flex-col items-center gap-4 mt-4 md:mt-0 md:absolute md:inset-0 pointer-events-none order-3 w-full md:w-auto">
                  <AnimatePresence>
                    {visibleWindows.map((win) => (
                      <DesktopWindow
                        key={win.instanceId}
                        title={getWindowTitle(win)}
                        onClose={() => closeWindow(win.instanceId)}
                        onFocus={() => bringToFront(win.instanceId)}
                        initialOffset={win.initialOffset}
                        zIndex={win.zIndex}
                        floating
                        anchorCenter={win.kind === "about"}
                      >
                        {renderWindowContent(win)}
                      </DesktopWindow>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="relative md:absolute md:top-4 md:right-4 flex flex-row md:flex-col gap-4 items-end md:items-end z-10 pointer-events-auto w-full md:w-auto mt-auto md:mt-0 order-2 md:order-0 pb-24 md:pb-0 justify-center md:justify-start">
                  <div className="pointer-events-auto w-auto flex justify-center md:block">
                    <ProfileCard />
                  </div>
                  <div
                    className="pointer-events-auto w-auto flex justify-center md:block cursor-pointer active:scale-95 transition-transform gravity-element"
                    onClick={() => openWindow("contact")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openWindow("contact");
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <StatusWidget />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dock onProjectsClick={() => openWindow("projects")} />
        </>
      )}
    </main>
  );
}
