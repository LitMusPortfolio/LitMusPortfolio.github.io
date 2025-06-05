import styled from "styled-components";
import LazyVideo from "./LazyVideo";

interface VideoBackgroundProps {
  opacity?: number;
}

export const VideoBackground = styled(LazyVideo)<VideoBackgroundProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: 100%;
  transform: translate(-50%, -50%);
  z-index: -100;
  opacity: ${({ opacity = 1 }) => opacity};
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
