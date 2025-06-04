import { useState } from "react";
import styled from "styled-components";

const EmailContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EmailButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  transition: all 0.2s ease;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
    text-decoration-style: solid;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const EmailText = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  font-family: inherit;
  letter-spacing: inherit;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

interface EmailProtectedProps {
  email: string;
  showButtonText?: string;
}

export default function EmailProtected({
  email,
  showButtonText = "クリックで表示",
}: EmailProtectedProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  // メールアドレスを難読化（文字コードを使用）
  const obfuscateEmail = (email: string) => {
    const [local, domain] = email.split("@");
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
      <EmailContainer>
        【{" "}
        <EmailButton
          onClick={() => setIsRevealed(true)}
          aria-label={`メールアドレス ${showButtonText}`}
        >
          {showButtonText}
        </EmailButton>{" "}
        】
      </EmailContainer>
    );
  }

  // JavaScriptが有効な場合のみ表示される
  return (
    <EmailContainer>
      【
      <EmailText>
        <span>{parts.local}</span>
        <span>{parts.at}</span>
        <span>{parts.domain}</span>
        <span>{parts.dot}</span>
        <span>{parts.tld}</span>
      </EmailText>
      】
    </EmailContainer>
  );
}
