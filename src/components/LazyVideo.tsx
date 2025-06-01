import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface LazyVideoProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  onLoadedData?: () => void;
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
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  className,
  onLoadedData,
}: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

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

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoadedData?.();
  };

  return (
    <VideoWrapper ref={videoRef} className={className}>
      {isInView && (
        <StyledVideo
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          onLoadedData={handleLoadedData}
          $isLoaded={isLoaded}
          preload="metadata"
        />
      )}
    </VideoWrapper>
  );
}
