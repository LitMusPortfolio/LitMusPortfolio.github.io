import React from "react";

/**
 * テキスト内の英数字部分を<span class="en">で囲む
 * @param text 処理するテキスト
 * @returns 処理されたReact要素
 */
export const wrapAlphanumeric = (text: string): React.ReactNode => {
  // 英数字とそれ以外を分離する正規表現
  const parts = text.split(/([A-Za-z0-9\s]+)/g);

  return parts.map((part, index) => {
    // 英数字部分の場合
    if (/^[A-Za-z0-9\s]+$/.test(part)) {
      return (
        <span key={`part-${index}-${part.slice(0, 5)}`} className="en">
          {part}
        </span>
      );
    }
    // 日本語部分の場合
    return part;
  });
};

/**
 * 見出し用のスタイル付きコンポーネント
 */
interface StyledHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: string;
  className?: string;
}

export const StyledHeading: React.FC<StyledHeadingProps> = ({
  level,
  children,
  className,
}) => {
  const content = wrapAlphanumeric(children);

  switch (level) {
    case 1:
      return <h1 className={className}>{content}</h1>;
    case 2:
      return <h2 className={className}>{content}</h2>;
    case 3:
      return <h3 className={className}>{content}</h3>;
    case 4:
      return <h4 className={className}>{content}</h4>;
    case 5:
      return <h5 className={className}>{content}</h5>;
    case 6:
      return <h6 className={className}>{content}</h6>;
    default:
      return <h1 className={className}>{content}</h1>;
  }
};
