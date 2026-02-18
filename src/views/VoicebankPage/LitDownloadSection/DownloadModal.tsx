import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

// 型定義（DownloadModal固有の拡張型）
type DownloadModalLink = {
  text: string;
  url: string;
  primary?: boolean;
  icon?: string;
};

type DownloadContent = {
  description: string[];
  links: DownloadModalLink[];
};

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image?: string;
  defaultImage?: string;
  content?: DownloadContent;
  children?: React.ReactNode;
};

// Download Icon Component
function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="h-full w-full"
    >
      <title>Download</title>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// 構造化コンテンツコンポーネント
function StructuredContent({ content }: { content: DownloadContent }) {
  if (!content) {
    return <div>コンテンツが見つかりません</div>;
  }

  return (
    <div className="flex h-full flex-col">
      {/* Description */}
      {content.description && content.description.length > 0 && (
        <div>
          {content.description.map((paragraph) => (
            <p
              key={`paragraph-${paragraph}`}
              className="mb-[1.2rem] text-[var(--color-text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="mb-12 mt-auto flex animate-slide-in-up flex-col self-end">
        {content.links && content.links.length > 0 ? (
          content.links.map((link, index) => {
            const isPrimary = link.primary || index === 0;
            return (
              <Button
                key={`link-${link.url}-${index}`}
                variant={isPrimary ? "default" : "outline"}
                asChild
                className={cn(
                  "relative h-auto gap-4 overflow-hidden rounded-full px-10 py-[1.2rem] text-center text-[var(--color-text-primary)] no-underline transition-all duration-300",
                  "before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white/20 before:transition-[width,height] before:duration-[0.6s] before:ease-out before:content-['']",
                  "hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(139,92,246,0.4)] hover:before:h-[300px] hover:before:w-[300px]",
                  "active:-translate-y-px active:shadow-[0_5px_15px_rgba(139,92,246,0.3)]",
                  isPrimary
                    ? "animate-shimmer border-2 border-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-dark)_50%,var(--color-primary)_100%)] bg-[length:200%_100%]"
                    : "border-2 border-white/15 bg-white/[0.08] hover:border-primary",
                )}
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <span className="inline-flex h-6 w-6 items-center justify-center">
                    <DownloadIcon />
                  </span>
                  {link.text}
                </a>
              </Button>
            );
          })
        ) : (
          <div>ダウンロードリンクがありません</div>
        )}
      </div>
    </div>
  );
}

export default function DownloadModal({
  isOpen,
  onClose,
  title,
  image,
  defaultImage = "/001_top/Moviedummy.png",
  content,
  children,
}: DownloadModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      imageUrl={image || defaultImage}
      variant="download"
      ariaLabel={`Download modal for ${title}`}
    >
      {content ? (
        <StructuredContent content={content} />
      ) : (
        children || <div>コンテンツを読み込んでいます...</div>
      )}
    </Modal>
  );
}
