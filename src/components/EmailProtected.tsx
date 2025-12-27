import { useState } from "react";

type EmailProtectedProps = {
  email: string;
  showButtonText?: string;
};

export default function EmailProtected({
  email,
  showButtonText = "クリックで表示",
}: EmailProtectedProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  // メールアドレスを難読化（文字コードを使用）
  const obfuscateEmail = (emailStr: string) => {
    const [local, domain] = emailStr.split("@");
    const domainParts = domain.split(".");

    return {
      local,
      at: String.fromCharCode(64), // @ の文字コード
      domain: domainParts[0],
      dot: String.fromCharCode(46), // . の文字コード
      tld: domainParts[1],
    };
  };

  const parts = obfuscateEmail(email);

  if (!isRevealed) {
    return (
      <span className="inline-flex items-center gap-1 text-[var(--color-text-primary)]">
        【{" "}
        <button
          type="button"
          onClick={() => setIsRevealed(true)}
          aria-label={`メールアドレス ${showButtonText}`}
          className="cursor-pointer border-none bg-transparent p-0 font-inherit text-inherit text-primary underline decoration-dotted underline-offset-2 transition-all duration-200 hover:text-primary-light hover:decoration-solid focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        >
          {showButtonText}
        </button>{" "}
        】
      </span>
    );
  }

  // JavaScriptが有効な場合のみ表示される
  return (
    <span className="inline-flex items-center gap-1 text-[var(--color-text-primary)]">
      【
      <span className="font-inherit tracking-inherit text-primary transition-colors duration-200 hover:text-primary-light">
        <span>{parts.local}</span>
        <span>{parts.at}</span>
        <span>{parts.domain}</span>
        <span>{parts.dot}</span>
        <span>{parts.tld}</span>
      </span>
      】
    </span>
  );
}
