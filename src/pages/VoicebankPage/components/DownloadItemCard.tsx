import styled from "styled-components";
import LazyImage from "@/components/LazyImage";
import { cardHoverEffect, glassmorphism } from "@/styles/utils";
import type { DownloadItem } from "../types";

// スタイルコンポーネント
const DownloadCard = styled.article`
  ${glassmorphism}
  border-radius: 12px;
  overflow: hidden;
  ${cardHoverEffect}
  cursor: pointer;
  min-width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 アスペクト比 */
  background: #000;
  overflow: hidden;
`;

const ThumbnailImage = styled(LazyImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0a3e 0%, #2d1b69 50%, #3e2980 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CardInfo = styled.div`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  color: #fff;
  margin: 0.5rem 0;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0.5rem 0;
`;

// コンポーネントのProps
interface DownloadItemCardProps {
  item: DownloadItem;
  onClick: () => void;
}

// ダウンロードアイテムカードコンポーネント
export default function DownloadItemCard({
  item,
  onClick,
}: DownloadItemCardProps) {
  return (
    <DownloadCard onClick={onClick} tabIndex={0}>
      <ThumbnailWrapper>
        {item.image ? (
          <ThumbnailImage src={item.image} alt={item.name} />
        ) : (
          <DefaultThumbnail aria-label="Default thumbnail" />
        )}
      </ThumbnailWrapper>
      <CardInfo>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardInfo>
    </DownloadCard>
  );
}
