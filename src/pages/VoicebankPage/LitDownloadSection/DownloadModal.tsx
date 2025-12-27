import styled, { css, keyframes } from "styled-components";
import Modal from "@/components/Modal";
import { theme } from "@/styles/theme";

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

// アニメーション
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  align-self: flex-end;
  animation: ${slideInUp} 0.8s ease-out;
  margin-bottom: 3rem;
`;

const ModalButton = styled.a<{ $primary?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.2rem 2.5rem;
  background: ${({ $primary }) =>
    $primary
      ? `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`
      : "rgba(255, 255, 255, 0.08)"};
  color: ${theme.colors.text.primary};
  border: 2px solid ${({ $primary }) =>
    $primary ? "transparent" : "rgba(255, 255, 255, 0.15)"};
  border-radius: 50px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
  
  ${({ $primary }) =>
    $primary &&
    css`
    background-size: 200% 100%;
    background-image: linear-gradient(
      135deg,
      ${theme.colors.primary.main} 0%,
      ${theme.colors.primary.dark} 50%,
      ${theme.colors.primary.main} 100%
    );
    animation: ${shimmer} 3s ease-in-out infinite;
  `}
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
    border-color: ${({ $primary }) =>
      $primary ? "transparent" : theme.colors.primary.main};
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
  }
  
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

// 追加のスタイルコンポーネント

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <title>Download</title>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// スタイルコンポーネント
const DescriptionSection = styled.div``;

const DescriptionParagraph = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: 1.2rem;
`;

// 構造化コンテンツコンポーネント
const StructuredContent = ({ content }: { content: DownloadContent }) => {
  if (!content) {
    return <div>コンテンツが見つかりません</div>;
  }

  return (
    <ContentWrapper>
      {content.description && content.description.length > 0 && (
        <DescriptionSection>
          {content.description.map((paragraph) => (
            <DescriptionParagraph key={`paragraph-${paragraph}`}>
              {paragraph}
            </DescriptionParagraph>
          ))}
        </DescriptionSection>
      )}

      <ModalButtons>
        {content.links && content.links.length > 0 ? (
          content.links.map((link, index) => (
            <ModalButton
              key={`link-${link.url}-${index}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              $primary={link.primary || index === 0}
            >
              <IconWrapper>
                <DownloadIcon />
              </IconWrapper>
              {link.text}
            </ModalButton>
          ))
        ) : (
          <div>ダウンロードリンクがありません</div>
        )}
      </ModalButtons>
    </ContentWrapper>
  );
};

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
