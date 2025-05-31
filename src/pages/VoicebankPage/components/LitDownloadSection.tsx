import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

// ダウンロードセクション
const DownloadsSection = styled.div`
  margin-top: 6rem;
  padding: 4rem 0;
  background: ${theme.colors.background.dark};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 4rem;
  text-align: center;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: ${theme.shadows.text};
`;

const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const DownloadCard = styled.div`
  background: ${theme.effects.glassmorphism.background};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: ${theme.effects.glassmorphism.borderRadius};
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: ${theme.effects.glassmorphism.backdropFilter};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.glow.medium};
    background: ${theme.colors.purple[500]}33;
  }
  
  h4 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${theme.colors.primary.main};
  }
  
  p {
    margin-bottom: 1.5rem;
    opacity: 0.9;
    color: ${theme.colors.text.secondary};
  }
  
  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${theme.colors.primary.light};
  }
`;

// モーダル
const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: ${theme.colors.background.dark};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  
  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.primary.main};
    text-shadow: ${theme.shadows.text};
  }
  
  .description {
    margin-bottom: 2rem;
    line-height: 1.8;
    color: ${theme.colors.text.secondary};
  }
  
  .download-link {
    display: inline-block;
    padding: 1rem 3rem;
    background: ${theme.colors.primary.main};
    color: ${theme.colors.text.primary};
    border-radius: 30px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: ${theme.shadows.button};
    
    &:hover {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.buttonHover};
    }
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: ${theme.colors.primary.light};
  }
`;

// データ定義
const downloadItems = [
  {
    id: 1,
    name: "離途-HABIT-",
    description: "プロ仕様の高品質音声ライブラリ。豊富な音素と表現力。",
    price: "¥3,000",
    type: "paid",
    link: "https://booth.pm/",
  },
  {
    id: 2,
    name: "離途V2",
    description: "スタンダードな音声ライブラリ。基本的な歌唱に対応。",
    price: "FREE",
    type: "free",
    link: "#",
  },
  {
    id: 3,
    name: "離途-FLOW-",
    description: "流れるような歌声を実現する特別版。限定配布中。",
    price: "FREE",
    type: "free",
    link: "#",
  },
];

export default function LitDownloadSection() {
  const [selectedDownload, setSelectedDownload] = useState<
    (typeof downloadItems)[0] | null
  >(null);

  return (
    <>
      <Container>
        <DownloadsSection id="downloads">
          <SectionTitle>Downloads</SectionTitle>

          <DownloadGrid>
            {downloadItems.map((item) => (
              <DownloadCard
                key={item.id}
                onClick={() => setSelectedDownload(item)}
              >
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <div className="price">{item.price}</div>
              </DownloadCard>
            ))}
          </DownloadGrid>
        </DownloadsSection>
      </Container>

      {/* ダウンロードモーダル */}
      <Modal $isOpen={!!selectedDownload}>
        {selectedDownload && (
          <ModalContent>
            <ModalCloseButton onClick={() => setSelectedDownload(null)}>
              ×
            </ModalCloseButton>
            <h3>{selectedDownload.name}</h3>
            <div className="description">
              <p>{selectedDownload.description}</p>
              <p>価格: {selectedDownload.price}</p>
            </div>
            <a
              href={selectedDownload.link}
              className="download-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedDownload.type === "paid"
                ? "BOOTHで購入"
                : "ダウンロード"}
            </a>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
