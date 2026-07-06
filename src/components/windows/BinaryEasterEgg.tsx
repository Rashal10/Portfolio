"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { about } from "@/data/portfolio";

const SCRAMBLE_MS = 1200;
const OFFICE_MODE_MS = 3000;
const DIALOG_AUTO_DISMISS_MS = 4000;
const COOLDOWN_MS = 2000;
const TRIPLE_CLICK_WINDOW_MS = 1000;

function scrambleBinary(text: string): string {
  return text.replace(/[01]/g, () => (Math.random() > 0.5 ? "1" : "0"));
}

export default function BinaryEasterEgg() {
  const [mounted, setMounted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [phase, setPhase] = useState<"idle" | "scrambling" | "decoded">("idle");
  const [displayText, setDisplayText] = useState<string[]>(about.binaryLines);
  const [showDialog, setShowDialog] = useState(false);
  const [coolingDown, setCoolingDown] = useState(false);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const officeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const binaryFlat = about.binaryLines.join(" ");

  const clearTimers = useCallback(() => {
    if (scrambleRef.current) clearInterval(scrambleRef.current);
    if (officeTimerRef.current) clearTimeout(officeTimerRef.current);
    if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
  }, []);

  const activateOfficeMode = useCallback(() => {
    document.documentElement.classList.add("office-mode");
    officeTimerRef.current = setTimeout(() => {
      document.documentElement.classList.remove("office-mode");
    }, OFFICE_MODE_MS);
  }, []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
    if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
  }, []);

  const triggerEasterEgg = useCallback(() => {
    if (coolingDown) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setCoolingDown(true);
    cooldownTimerRef.current = setTimeout(
      () => setCoolingDown(false),
      COOLDOWN_MS
    );

    if (prefersReduced) {
      setDisplayText([about.binaryDecoded]);
      setPhase("decoded");
      activateOfficeMode();
      setShowDialog(true);
      dialogTimerRef.current = setTimeout(closeDialog, DIALOG_AUTO_DISMISS_MS);
      return;
    }

    setPhase("scrambling");
    const start = Date.now();

    scrambleRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed >= SCRAMBLE_MS) {
        if (scrambleRef.current) clearInterval(scrambleRef.current);
        setDisplayText([about.binaryDecoded]);
        setPhase("decoded");
        activateOfficeMode();
        setShowDialog(true);
        dialogTimerRef.current = setTimeout(
          closeDialog,
          DIALOG_AUTO_DISMISS_MS
        );
        setTimeout(() => {
          setPhase("idle");
          setDisplayText(about.binaryLines);
        }, 1800);
        return;
      }
      setDisplayText([scrambleBinary(binaryFlat)]);
    }, 50);
  }, [binaryFlat, coolingDown, activateOfficeMode, closeDialog]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (clickCount === 3) {
      triggerEasterEgg();
      setClickCount(0);
    }
    const timer = setTimeout(() => setClickCount(0), TRIPLE_CLICK_WINDOW_MS);
    return () => clearTimeout(timer);
  }, [clickCount, triggerEasterEgg]);

  useEffect(() => {
    return () => {
      clearTimers();
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      document.documentElement.classList.remove("office-mode");
    };
  }, [clearTimers]);

  useEffect(() => {
    if (!showDialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        closeDialog();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [showDialog, closeDialog]);

  const handleClick = () => {
    if (coolingDown || phase !== "idle") return;
    setHasClicked(true);
    setClickCount((c) => c + 1);
  };

  const dialog =
    mounted &&
    createPortal(
      <AnimatePresence>
        {showDialog && (
          <motion.div
            key="office-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
            onClick={closeDialog}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="w-full max-w-sm border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
              aria-labelledby="office-dialog-title"
              aria-describedby="office-dialog-body"
            >
              <div className="handle flex items-center justify-between border-b-2 border-black px-3 py-1.5 bg-[#f5d547]">
                <span
                  id="office-dialog-title"
                  className="font-mono text-xs font-bold tracking-wider"
                >
                  ★ MICHAEL.EXE
                </span>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="font-mono text-xs border border-black px-1 hover:bg-black hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  X
                </button>
              </div>
              <div className="p-5 font-mono text-sm" id="office-dialog-body">
                <p className="text-base font-bold mb-4">
                  {about.binaryDecoded}.
                </p>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="border-2 border-black px-4 py-1.5 text-xs font-bold hover:bg-black hover:text-white transition-colors active:scale-95"
                >
                  [ OK ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <p
        className={`mt-6 text-[10px] font-mono text-gray-400 leading-relaxed select-all ${
          phase === "scrambling" ? "binary-scrambling" : ""
        } ${hasClicked ? "cursor-pointer" : ""}`}
        title={hasClicked ? "Keep clicking..." : undefined}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {displayText.map((line, i) => (
          <span key={i}>
            {line}
            {i < displayText.length - 1 && <br />}
          </span>
        ))}
      </p>
      {dialog}
    </>
  );
}
