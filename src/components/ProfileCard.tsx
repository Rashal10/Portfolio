"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { links, profile } from "@/data/portfolio";

export default function ProfileCard() {
  const photos = profile.photos;
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <div className="w-full max-w-[240px] md:max-w-[320px] bg-white border-2 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-default gravity-element">
      <div className="relative w-full h-40 md:h-60 border-2 border-black bg-gray-100 overflow-hidden mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={photos[activePhoto]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={photos[activePhoto]}
              alt={`${profile.name} avatar`}
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 240px, 320px"
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <h3 className="font-bold font-mono text-xl md:text-2xl leading-none">
            {profile.name}
          </h3>
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-2 py-0.5 -rotate-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <span className="font-mono text-xs font-bold tracking-wider">
              {profile.handle}
            </span>
          </a>
        </div>
        <span className="text-xs md:text-sm font-mono text-gray-500 mt-2 border-b border-black w-fit">
          {profile.tagline}
        </span>
      </div>

      {photos.length > 1 ? (
        <div className="mt-4 md:mt-6 flex gap-3">
          {photos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActivePhoto(index)}
              aria-label={`Show photo ${index + 1}`}
              className={`h-3 w-3 rounded-full border border-black transition-colors ${
                index === activePhoto ? "bg-black" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 md:mt-6 flex gap-3" aria-hidden>
          <div className="h-3 w-3 bg-black rounded-full" />
          <div className="h-3 w-3 bg-gray-400 rounded-full" />
          <div className="h-3 w-3 bg-gray-200 rounded-full" />
        </div>
      )}
    </div>
  );
}
