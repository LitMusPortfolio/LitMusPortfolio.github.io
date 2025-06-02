import styled from "styled-components";
import type { SocialLink } from "@/types";
import LazyImage from "./LazyImage";

interface SocialLinksProps {
  links: SocialLink[];
  size?: "small" | "medium" | "large";
}

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const SocialLinkItem = styled.a<{ $size: string }>`
  display: inline-block;
  width: ${({ $size }) =>
    $size === "small" ? "24px" : $size === "large" ? "40px" : "32px"};
  height: ${({ $size }) =>
    $size === "small" ? "24px" : $size === "large" ? "40px" : "32px"};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  size = "medium",
}) => {
  return (
    <SocialLinksContainer>
      {links.map((link) => (
        <SocialLinkItem
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          $size={size}
          aria-label={link.platform}
        >
          <LazyImage src={link.icon} alt={link.platform} eager />
        </SocialLinkItem>
      ))}
    </SocialLinksContainer>
  );
};
