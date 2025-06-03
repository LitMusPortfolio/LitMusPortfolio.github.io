import styled from "styled-components";
import type { SocialLink } from "@/types";
import LazyImage from "./LazyImage";

interface SocialLinksProps {
  links?: SocialLink[];
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

const SOCIAL_LINKS = [
  {
    platform: "X (Twitter)",
    url: "https://x.com/litmus9_",
    icon: "/001_top/icon_X.svg",
  },
  {
    platform: "YouTube",
    url: "https://www.youtube.com/@LitMus9_",
    icon: "/001_top/icon_youtube.svg",
  },
  {
    platform: "niconico",
    url: "https://www.nicovideo.jp/user/116098698",
    icon: "/001_top/icon_niconico.svg",
  },
];

export const SocialLinks = ({
  links = SOCIAL_LINKS,
  size = "medium",
}: SocialLinksProps) => {
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
