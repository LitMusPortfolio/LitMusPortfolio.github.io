import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { imageCache } from "@/utils/imageCache";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallback?: string;
  eager?: boolean;
};

export default function LazyImage({
  src,
  alt,
  className,
  placeholder,
  onLoad,
  onError,
  fallback = "/path/to/default-image.webp",
  eager = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(() => imageCache.isLoaded(src));
  const [isInView, setIsInView] = useState(eager);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager || imageCache.isLoaded(src)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, eager]);

  const handleLoad = () => {
    setIsLoaded(true);
    imageCache.markAsLoaded(src);
    onLoad?.();
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;

    if (img.src === fallback) {
      console.error(`Failed to load fallback image: ${fallback}`);
      return;
    }

    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {placeholder && !isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-contain blur-[10px]"
        />
      )}
      {isInView && (
        <img
          src={hasError ? fallback : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className="transition-opacity duration-300 ease-in-out"
        />
      )}
    </div>
  );
}
