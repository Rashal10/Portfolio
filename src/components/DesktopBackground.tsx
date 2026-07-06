"use client";

import Image from "next/image";
import { profile } from "@/data/portfolio";

export default function DesktopBackground() {
  return (
    <div
      className="hidden md:block absolute left-1/2 top-[40%] z-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      style={{ width: "min(440px, 38vw)" }}
      aria-hidden
    >
      <div
        className="relative w-full overflow-hidden border-2 border-black bg-gray-100"
        style={{ aspectRatio: "4 / 3", position: "relative", overflow: "hidden" }}
      >
        <Image
          src={profile.desktopBg}
          alt=""
          fill
          className="object-cover grayscale"
          sizes="(max-width: 1200px) 380px, 440px"
          priority
          draggable={false}
        />
      </div>
    </div>
  );
}
