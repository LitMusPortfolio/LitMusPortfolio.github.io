import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";
import LazyImage from "./LazyImage";

type SocialLinksProps = {
  links?: SocialLink[];
  size?: "small" | "medium" | "large";
};

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

const sizeClasses = {
  small: "h-6 w-6",
  medium: "h-8 w-8",
  large: "h-10 w-10",
};

export const SocialLinks = ({
  links = SOCIAL_LINKS,
  size = "medium",
}: SocialLinksProps) => {
  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-block transition-transform duration-300 hover:scale-110",
            sizeClasses[size],
          )}
          aria-label={link.platform}
        >
          <LazyImage src={link.icon} alt={link.platform} eager />
        </a>
      ))}
    </div>
  );
};
