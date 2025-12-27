import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LazyImage from "./LazyImage";
import { SocialLinks } from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="grid grid-cols-2 gap-8 border-t border-white/10 bg-[var(--color-bg-darker)] px-24 py-12 relative z-[var(--z-content)]">
      <div className="flex flex-col items-start justify-center">
        <Button
          variant="ghost"
          className="w-[12vw] h-auto p-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="ページの一番上に移動"
        >
          <LazyImage
            src="/001_top/FooterPageTop.svg"
            alt=""
            aria-hidden="true"
          />
        </Button>
      </div>
      <div className="flex flex-col items-end justify-center">
        <div className="mb-6 flex items-center gap-4">
          <span className="mr-2">SNS</span>
          <SocialLinks size="small" />
        </div>
        <Button
          variant="outline"
          asChild
          className="rounded-[30px] px-16 py-2 text-[0.85rem]"
        >
          <Link to="/contact">CONTACT</Link>
        </Button>
        <div className="pt-6">
          <p>&copy; 2022 - 2025 LitMus9_. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
