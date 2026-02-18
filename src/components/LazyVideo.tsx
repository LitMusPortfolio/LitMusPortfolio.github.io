"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

type VideoSource = {
  src: string;
  type: string;
};

type LazyVideoProps = {
  src?: string;
  sources?: VideoSource[];
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onLoadedData?: () => void;
  onError?: () => void;
};

export default function LazyVideo({
  src,
  sources,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
  className,
  style,
  onLoadedData,
  onError,
}: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isInView && autoPlay && videoElementRef.current) {
      videoElementRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, [isInView, autoPlay]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoadedData?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      ref={videoRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={style}
    >
      {isInView && !hasError && (
        <video
          ref={videoElementRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoadedData={handleLoadedData}
          onError={handleError}
          preload="metadata"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
        >
          {sources?.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      )}
    </div>
  );
}
