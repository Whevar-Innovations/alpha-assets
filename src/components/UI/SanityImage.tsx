import React from "react";
import { urlForImage, resolveImage } from "../../sanity/lib/image";
import type { SanityImage as SanityImageType } from "../../types";

interface SanityImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> {
  image?: SanityImageType | null;
  fallback?: string;
  sizes?: string;
  priority?: boolean;
}

export const SanityImage: React.FC<SanityImageProps> = ({
  image,
  fallback = "",
  sizes = "100vw",
  priority = false,
  alt = "",
  className,
  ...props
}) => {
  const src = resolveImage(image, fallback);

  if (!src) return null;

  // If we don't have a structured Sanity image object (e.g., it's just a fallback string)
  // we render a standard img tag.
  if (!image || (!image.image && !image.asset)) {
    return (
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        {...props}
      />
    );
  }

  // The actual source image object for the builder
  const imageSource = image.image ?? image;

  // Generate responsive srcSet for various common screen/container widths
  const widths = [128, 256, 320, 480, 640, 768, 1024, 1280, 1536, 1920, 2400];
  const srcSet = widths
    .map((w) => {
      try {
        const sourceForBuilder = imageSource as Parameters<typeof urlForImage>[0];
        return `${urlForImage(sourceForBuilder).width(w).url()} ${String(w)}w`;
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .join(", ");

  return (
    <img
      src={src}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      {...props}
    />
  );
};
