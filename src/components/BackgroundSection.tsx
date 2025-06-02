import styled from "styled-components";
import { Section } from "@/components/Layout";

interface BackgroundSectionProps {
  backgroundImage?: string;
  overlay?: boolean;
}

export const BackgroundSection = styled(Section)<BackgroundSectionProps>`
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  
  ${({ overlay }) =>
    overlay &&
    `
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 0;
    }
    
    > * {
      position: relative;
      z-index: 1;
    }
  `}
`;
