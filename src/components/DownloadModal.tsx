import styled from "styled-components";
import Modal from "@/components/Modal";
import { theme } from "@/styles/theme";

// 型定義
interface DownloadLink {
  text: string;
  url: string;
  primary?: boolean;
}

interface DownloadContent {
  description: string[];
  notes?: string[];
  links: DownloadLink[];
}

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image?: string;
  defaultImage?: string;
  content?: DownloadContent;
  children?: React.ReactNode;
}

// スタイルコンポーネント
const ModalDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
  
  p {
    margin-bottom: 1rem;
  }
`;

const ModalNotes = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;
  
  p {
    margin-bottom: 0.5rem;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalButton = styled.a<{ $primary?: boolean }>`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${({ $primary }) =>
    $primary ? theme.colors.primary.main : "rgba(255, 255, 255, 0.1)"};
  color: ${theme.colors.text.primary};
  border: 2px solid ${({ $primary }) =>
    $primary ? "transparent" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${({ $primary }) =>
      $primary ? theme.colors.primary.dark : "rgba(255, 255, 255, 0.2)"};
    box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
  }
`;

// 構造化コンテンツコンポーネント
const StructuredContent = ({ content }: { content: DownloadContent }) => (
  <>
    <ModalDescription>
      {content.description.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </ModalDescription>

    {content.notes?.length > 0 && (
      <ModalNotes>
        {content.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </ModalNotes>
    )}

    <ModalButtons>
      {content.links.map((link) => (
        <ModalButton
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          $primary={link.primary}
        >
          {link.text}
        </ModalButton>
      ))}
    </ModalButtons>
  </>
);

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
      maxWidth="900px"
      ariaLabel={`Download modal for ${title}`}
    >
      {content ? <StructuredContent content={content} /> : children}
    </Modal>
  );
}
