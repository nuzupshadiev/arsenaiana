"use client";

import Image from "next/image";
import { useState } from "react";

type InvitePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function InvitePhoto({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 440px) 100vw, 440px",
}: InvitePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`photo-fallback ${className}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}