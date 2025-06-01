import styled from "styled-components";
import Modal from "@/components/Modal";
import { theme } from "@/styles/theme";

// モーダルのプロップス型定義
interface BaseDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  title: string;
  defaultImage?: string;
}

interface SimpleDownloadModalProps extends BaseDownloadModalProps {
  variant?: "simple";
  children: React.ReactNode;
}

interface StructuredDownloadModalProps extends BaseDownloadModalProps {
  variant: "structured";
  content: {
    description: string[];
    notes?: string[];
    links: Array<{
      text: string;
      url: string;
      primary?: boolean;
    }>;
  };
}

type DownloadModalProps =
  | SimpleDownloadModalProps
  | StructuredDownloadModalProps;

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
  background: ${(props) =>
    props.$primary ? theme.colors.primary.main : "rgba(255, 255, 255, 0.1)"};
  color: ${theme.colors.text.primary};
  border: 2px solid ${(props) =>
    props.$primary ? "transparent" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${(props) =>
      props.$primary ? theme.colors.primary.dark : "rgba(255, 255, 255, 0.2)"};
    box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
  }
`;

// 構造化コンテンツコンポーネント
const StructuredContent = ({
  content,
}: {
  content: StructuredDownloadModalProps["content"];
}) => {
  return (
    <>
      <ModalDescription>
        {content.description.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </ModalDescription>

      {content.notes && content.notes.length > 0 && (
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
};

export default function DownloadModal(props: DownloadModalProps) {
  const { isOpen, onClose, title, image } = props;
  const defaultImage = props.defaultImage || "/001_top/Moviedummy.png";
  const displayImage = image || defaultImage;

  const renderContent = () => {
    if (props.variant === "structured") {
      return <StructuredContent content={props.content} />;
    }
    return props.children;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      imageUrl={displayImage}
      variant="download"
      maxWidth="900px"
      ariaLabel={`Download modal for ${title}`}
    >
      {renderContent()}
    </Modal>
  );
}
