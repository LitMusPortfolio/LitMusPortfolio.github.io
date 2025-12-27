import { cn } from "@/lib/utils";
import LazyVideo from "./LazyVideo";

type VideoSource = {
  src: string;
  type: string;
};

type VideoBackgroundProps = {
  src?: string;
  sources?: VideoSource[];
  opacity?: number;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
};

export function VideoBackground({
  src,
  sources,
  opacity = 1,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: VideoBackgroundProps) {
  return (
    <LazyVideo
      src={src}
      sources={sources}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      className={cn(
        "absolute left-1/2 top-1/2 z-[-100] h-full min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 [&_video]:h-full [&_video]:w-full [&_video]:object-cover",
        className,
      )}
      style={{ opacity } as React.CSSProperties}
    />
  );
}
