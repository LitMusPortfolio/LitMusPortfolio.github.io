import React from "react";
import styled from "styled-components";
import type { SocialLink } from "@/types";
import LazyImage from "./LazyImage";

interface SocialLinksProps {
  links: SocialLink[];
  size?: "small" | "medium" | "large";
}

const SocialLinksContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
`;

const SocialLinkItem = styled.a<{ $size: string }>`
  display: inline-block;
  width: ${({ $size, theme }) =>
    $size === "small"
      ? theme.sizes.icon.md
      : $size === "large"
        ? theme.sizes.icon.xl
        : theme.sizes.icon.lg};
  height: ${({ $size, theme }) =>
    $size === "small"
      ? theme.sizes.icon.md
      : $size === "large"
        ? theme.sizes.icon.xl
        : theme.sizes.icon.lg};
  transition: transform ${({ theme }) => theme.animation.duration.fast} ${({ theme }) => theme.animation.easing.ease};
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const SocialLinks = React.memo<SocialLinksProps>(({
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
});
