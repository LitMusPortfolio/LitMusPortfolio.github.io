import LazyImage from "@/components/LazyImage";
import type { DownloadItem } from "./data";

// コンポーネントのProps
type DownloadItemCardProps = {
  item: DownloadItem;
  onClick: () => void;
};

// ダウンロードアイテムカードコンポーネント
export default function DownloadItemCard({
  item,
  onClick,
}: DownloadItemCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass flex h-full min-w-[80%] cursor-pointer flex-col overflow-hidden rounded-xl border-none text-left transition-all duration-300 hover:-translate-y-2.5 hover:border-[rgba(138,97,255,0.5)] hover:shadow-[0_20px_40px_rgba(138,97,255,0.4)]"
      aria-label={`${item.name}のダウンロード詳細を開く`}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden bg-black pb-[56.25%]">
        {item.image ? (
          <LazyImage
            src={item.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a0a3e] via-[#2d1b69] to-[#3e2980] before:flex before:h-20 before:w-20 before:items-center before:justify-center before:rounded-[20px] before:bg-white/10 before:content-['']"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Card Info */}
      <div className="flex flex-1 flex-col justify-between bg-black/50 px-6 pb-6 pt-4">
        <h3 className="my-2 leading-[1.4] text-white">{item.name}</h3>
        <p className="my-2 text-[0.85rem] leading-[1.5] text-white/70">
          {item.description}
        </p>
      </div>
    </button>
  );
}
