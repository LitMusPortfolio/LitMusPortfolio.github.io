import styled from "styled-components";
import { Section } from "@/components/Layout";

interface BackgroundSectionProps {
  backgroundImage?: string;
  overlay?: boolean;
}

export const BackgroundSection = styled(Section)<BackgroundSectionProps>`
  position: relative;
  
  &::before {
      content: '';
      position: absolute;
      background-image: ${({ backgroundImage }) =>
        backgroundImage ? `url(${backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
      inset: 0;
        z-index: -1000;
    }
`;
