"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type ExerciseMediaProps = {
  src: string | null;
  alt: string;
  label?: string | null;
  className?: string;
  imageClassName?: string;
};

export function ExerciseMedia({
  src,
  alt,
  label,
  className,
  imageClassName,
}: ExerciseMediaProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  if (!showImage) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-background p-4 text-center",
          className,
        )}
      >
        <Dumbbell className="text-muted" size={28} aria-hidden />
        <p className="line-clamp-2 text-xs font-medium text-muted">{label ?? alt}</p>
        <p className="text-[10px] text-muted">Preview unavailable</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src!}
      alt={alt}
      className={cn("h-full w-full object-contain", imageClassName)}
      loading="lazy"
      decoding="async"
      onError={() => {
        setFailed(true);
      }}
    />
  );
}
