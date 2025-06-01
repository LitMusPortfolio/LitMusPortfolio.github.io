import styled from "styled-components";
import { theme } from "@/styles/theme";

// 型定義
interface DownloadLink {
  text: string;
  url: string;
}

interface DownloadItem {
  id: number;
  type: "talk" | "sing" | "other";
  category: string;
  name: string;
  description: string;
  status: "free" | "paid";
  price?: string;
  image?: string;
  links: {
    primary?: DownloadLink;
    secondary?: DownloadLink;
    tertiary?: DownloadLink;
  };
  modalContent?: {
    detailedDescription: string[];
    notes?: string[];
  };
}

// モーダル用スタイル
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

// モーダル内容コンポーネント
interface ModalContentProps {
  item: DownloadItem;
}

export const ModalContent = ({ item }: ModalContentProps) => {
  const hasDetailedDescription = item.modalContent?.detailedDescription;
  const hasNotes = item.modalContent?.notes;

  const renderLinks = () => {
    const linkEntries = Object.entries(item.links).filter(
      ([_, link]) => link,
    ) as [string, DownloadLink][];

    return linkEntries.map(([key, link]) => (
      <ModalButton
        key={key}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        $primary={key === "primary"}
      >
        {link.text}
      </ModalButton>
    ));
  };

  return (
    <>
      <ModalDescription>
        {hasDetailedDescription ? (
          item.modalContent?.detailedDescription.map((text, idx) => (
            <p key={`desc-${item.id}-${idx}`}>{text}</p>
          ))
        ) : (
          <>
            <p>{item.description}</p>
            {item.status === "paid" && <p>価格: {item.price}</p>}
          </>
        )}
      </ModalDescription>

      {hasNotes && (
        <ModalNotes>
          {item.modalContent?.notes?.map((note, idx) => (
            <p key={`note-${item.id}-${idx}`}>{note}</p>
          ))}
        </ModalNotes>
      )}

      <ModalButtons>{renderLinks()}</ModalButtons>
    </>
  );
};

// 型をエクスポート
export type { DownloadItem };
