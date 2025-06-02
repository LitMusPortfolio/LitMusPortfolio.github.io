import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { videoCache } from "@/utils/videoCache";

interface VideoSource {
  src: string;
  type: string;
}

interface LazyVideoProps {
  src?: string;
  sources?: VideoSource[];
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  onLoadedData?: () => void;
  onError?: () => void;
}

const VideoWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const StyledVideo = styled.video<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export default function LazyVideo({
  src,
  sources,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  playsInline = false,
  className,
  onLoadedData,
  onError,
}: LazyVideoProps) {
  // キャッシュされている場合は初期状態でロード済みにする
  const [isLoaded, setIsLoaded] = useState(() =>
    videoCache.isLoaded(src, sources),
  );
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // キャッシュされている場合は即座に表示
    if (videoCache.isLoaded(src, sources)) {
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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, sources]);

  useEffect(() => {
    if (isInView && autoPlay && videoElementRef.current) {
      videoElementRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, [isInView, autoPlay]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    videoCache.markAsLoaded(src, sources);
    onLoadedData?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <VideoWrapper ref={videoRef} className={className}>
      {isInView && !hasError && (
        <StyledVideo
          ref={videoElementRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          onLoadedData={handleLoadedData}
          onError={handleError}
          $isLoaded={isLoaded}
          preload="metadata"
        >
          {sources?.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </StyledVideo>
      )}
    </VideoWrapper>
  );
}
