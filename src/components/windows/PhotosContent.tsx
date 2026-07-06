"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { galleryPhotos } from "@/data/portfolio";

export default function PhotosContent() {
  const [mounted, setMounted] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const expanded = expandedId
    ? galleryPhotos.find((photo) => photo.id === expandedId)
    : null;

  const closeExpanded = useCallback(() => setExpandedId(null), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (expandedId) {
      document.body.dataset.photosLightboxOpen = "true";
    } else {
      delete document.body.dataset.photosLightboxOpen;
    }
    return () => {
      delete document.body.dataset.photosLightboxOpen;
    };
  }, [expandedId]);

  useEffect(() => {
    if (!expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      closeExpanded();
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [expandedId, closeExpanded]);

  const lightbox =
    mounted &&
    createPortal(
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="photos-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-8"
            onClick={closeExpanded}
          >
            <div
              className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expanded.src}
                alt={expanded.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 896px"
                priority
                draggable={false}
              />
              <button
                type="button"
                className="absolute top-2 right-2 md:-top-10 md:left-0 md:right-auto text-white font-bold text-xl font-mono hover:text-gray-300 cursor-pointer bg-black/60 md:bg-transparent px-2 py-1"
                onClick={closeExpanded}
              >
                [X] CLOSE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <div className="space-y-4">
        <div className="border-b-2 border-black pb-2 flex justify-between items-end gap-4">
          <h2 className="text-xl font-bold uppercase">Photos</h2>
          <span className="text-xs font-mono italic text-gray-600 shrink-0">
            &quot;escaping the matrix&quot;
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {galleryPhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setExpandedId(photo.id)}
              className="aspect-square border-2 border-black bg-gray-200 relative overflow-hidden group cursor-pointer text-left"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 640px) 50vw, 280px"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {lightbox}
    </>
  );
}
