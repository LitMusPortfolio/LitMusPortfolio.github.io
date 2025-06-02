import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { imageCache } from "@/utils/imageCache";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallback?: string;
  eager?: boolean; // ヘッダーなど、即座にロードすべき画像用
}

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledImage = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.animation.duration.fast} ${({ theme }) => theme.animation.easing.easeInOut};
`;

const PlaceholderImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(10px);
  transform: scale(1.1);
`;

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
  // キャッシュされている場合は初期状態でロード済みにする
  const [isLoaded, setIsLoaded] = useState(() => imageCache.isLoaded(src));
  const [isInView, setIsInView] = useState(eager); // eagerならすぐに表示
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eagerまたはキャッシュされている場合は即座に表示
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

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <ImageWrapper ref={imgRef} className={className}>
      {placeholder && !isLoaded && !hasError && (
        <PlaceholderImage src={placeholder} alt="" aria-hidden="true" />
      )}
      {isInView && (
        <StyledImage
          src={hasError ? fallback : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          $isLoaded={isLoaded}
        />
      )}
    </ImageWrapper>
  );
}
