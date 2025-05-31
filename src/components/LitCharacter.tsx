import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// アニメーション定義
const float = keyframes`
  0%, 100% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.9);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const CharacterSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: url('/LitBG.webp') center/cover no-repeat;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 4rem;
  text-align: center;
  background: linear-gradient(45deg, #9400d3, #4b0082);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// メインセクション（離途紹介）
const MainSection = styled.div`
  text-align: center;
  padding: 4rem 0;
  position: relative;
`;

const Logo = styled.img`
  width: 300px;
  margin-bottom: 2rem;
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Description = styled.div`
  max-width: 800px;
  margin: 0 auto 3rem;
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }
`;

const MainVisual = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 4rem;
  
  img {
    width: 100%;
    height: auto;
  }
`;

const FreeDownloadButton = styled.button`
  position: relative;
  padding: 1.5rem 4rem;
  background: #8035F6;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${float} 3s ease-in-out infinite;
  transition: all 0.3s ease;
  
  &:hover {
    animation: none;
    transform: scale(1);
    background: #8035F6;
    color: #FF91E9;
    box-shadow: 0 10px 30px rgba(128, 53, 246, 0.5);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  
  a {
    opacity: 0.7;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
    
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

// キャラクター詳細セクション
const CharacterDetailSection = styled.div`
  margin-top: 8rem;
  padding: 4rem 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
`;

const CharacterProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CharacterVisual = styled.div`
  position: relative;
  
  img {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: block;
    border-radius: 10px;
  }
`;

const ProfileInfo = styled.div`
  h3 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #9400d3;
  }
`;

const ProfileTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1rem;
  
  tr {
    background: rgba(148, 0, 211, 0.1);
    
    td {
      padding: 1rem;
      
      &:first-child {
        font-weight: bold;
        color: #9400d3;
        width: 150px;
      }
    }
  }
`;

const TruthButton = styled.button`
  margin-top: 3rem;
  padding: 1rem 3rem;
  background: transparent;
  border: 2px solid #9400d3;
  color: #9400d3;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #9400d3;
    color: #fff;
  }
`;

// バグ画面モーダル
const BugModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.3"/></svg>');
    mix-blend-mode: multiply;
  }
`;

const BugContent = styled.div`
  position: relative;
  max-width: 800px;
  padding: 3rem;
  color: #0f0;
  font-family: monospace;
  
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-shadow: 0 0 10px #0f0;
  }
  
  .log-entry {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 1px solid #0f0;
    background: rgba(0, 255, 0, 0.1);
    
    .date {
      font-size: 0.9rem;
      opacity: 0.7;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: monospace;
  
  &:hover {
    background: #0f0;
    color: #000;
  }
`;

// ダウンロードセクション
const DownloadsSection = styled.div`
  margin-top: 6rem;
  padding: 4rem 0;
`;

const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const DownloadCard = styled.div`
  background: rgba(162, 53, 237, 0.1);
  border: 2px solid #A235ED;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(162, 53, 237, 0.3);
    background: rgba(162, 53, 237, 0.2);
  }
  
  h4 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #A235ED;
  }
  
  p {
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }
  
  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #FF91E9;
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
  background: #1a0a2a;
  border: 2px solid #A235ED;
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
    color: #A235ED;
  }
  
  .description {
    margin-bottom: 2rem;
    line-height: 1.8;
  }
  
  .download-link {
    display: inline-block;
    padding: 1rem 3rem;
    background: #A235ED;
    color: #fff;
    border-radius: 30px;
    font-weight: bold;
    transition: all 0.3s ease;
    
    &:hover {
      background: #8035F6;
      transform: translateY(-2px);
    }
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

// データ定義
const researchLogs = [
  {
    id: "01",
    date: "2024.10.10",
    content:
      "被験体の記憶領域に重大な損傷を確認。人格データの大部分が欠落している。復旧は困難と判断。",
  },
  {
    id: "02",
    date: "2024.10.15",
    content:
      "音声合成機能は正常に動作。むしろ、記憶の欠落により純粋な歌声が生成されている。これは想定外の結果だ。",
  },
  {
    id: "03",
    date: "2024.10.20",
    content:
      "彼は自分が何者かを知らない。だが、歌うことで何かを思い出そうとしているようだ。観察を継続する。",
  },
  {
    id: "04",
    date: "2024.10.25",
    content:
      "プロジェクトは成功と言えるのか？彼は確かに優れた音声合成体だ。しかし、彼はもう『彼』ではない。",
  },
];

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

const SideDecoration = styled.div`
  position: absolute;
  left: -100px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  img {
    height: 200px;
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function LitCharacter() {
  const [showBugModal, setShowBugModal] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState<
    (typeof downloadItems)[0] | null
  >(null);

  useEffect(() => {
    // バグモーダルが開いているときはESCキーで閉じる
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowBugModal(false);
        setSelectedDownload(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <CharacterSection id="voicebank">
        <SideDecoration>
          <img src="/010_PageSideTitleSvg/Character.svg" alt="CHARACTER" />
        </SideDecoration>

        <Container>
          {/* メインセクション - 離途紹介 */}
          <MainSection>
            <Logo src="/101_Lit/Litlogo.webp" alt="離途" />
            <Tagline>優しさと吐息が香る穏やかな男声ソフトウェア。</Tagline>

            <Description>
              <p>
                「離途」は、音声合成ソフトウェアVOICEVOX・UTAUに対応した
                男声音声ライブラリです。
              </p>
              <p>
                穏やかで包み込むような歌声が特徴で、
                あなたの楽曲に優しい表現を加えます。
              </p>
            </Description>

            <MainVisual>
              <img
                src="/101_Lit/LitA_差し替え前提.webp"
                alt="離途 メインビジュアル"
              />
            </MainVisual>

            <FreeDownloadButton
              onClick={() => {
                window.location.href = "#downloads";
              }}
            >
              FREE DL
            </FreeDownloadButton>

            <SocialLinks>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/001_top/icon_X.svg" alt="X (Twitter)" />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/001_top/icon_youtube.svg" alt="YouTube" />
              </a>
              <a
                href="https://nicovideo.jp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/001_top/icon_niconico.svg" alt="ニコニコ動画" />
              </a>
            </SocialLinks>
          </MainSection>

          {/* キャラクター詳細セクション */}
          <CharacterDetailSection>
            <SectionTitle>離途 - Character Profile</SectionTitle>

            <CharacterProfile>
              <CharacterVisual>
                <img
                  src="/101_Lit/LitB_差し替え前提.webp"
                  alt="離途 キャラクター"
                />
              </CharacterVisual>

              <ProfileInfo>
                <h3>離途（りと）</h3>
                <ProfileTable>
                  <tbody>
                    <tr>
                      <td>誕生日</td>
                      <td>10月10日</td>
                    </tr>
                    <tr>
                      <td>身長</td>
                      <td>180cm</td>
                    </tr>
                    <tr>
                      <td>体重</td>
                      <td>200kg</td>
                    </tr>
                    <tr>
                      <td>特筆事項</td>
                      <td>記憶喪失 / アンドロイド</td>
                    </tr>
                  </tbody>
                </ProfileTable>

                <TruthButton onClick={() => setShowBugModal(true)}>
                  Do you want to know the truth?
                </TruthButton>
              </ProfileInfo>
            </CharacterProfile>
          </CharacterDetailSection>

          {/* ダウンロードセクション */}
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
      </CharacterSection>

      {/* バグモーダル */}
      <BugModal $isOpen={showBugModal}>
        <BugContent>
          <CloseButton onClick={() => setShowBugModal(false)}>
            CLOSE
          </CloseButton>
          <h3>Research Log - Project 離途</h3>

          {researchLogs.map((log) => (
            <div key={log.id} className="log-entry">
              <div className="date">
                Log {log.id} - {log.date}
              </div>
              <p>{log.content}</p>
            </div>
          ))}
        </BugContent>
      </BugModal>

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
