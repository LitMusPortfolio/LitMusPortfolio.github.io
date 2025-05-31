import { useState } from "react";
import styled from "styled-components";

// キャラクター詳細セクション
const CharacterDetailSection = styled.div`
  margin-top: 8rem;
  padding: 4rem 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
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
  background: linear-gradient(45deg, #9400d3, #4b0082);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

export default function LitCharacterSection() {
  const [showBugModal, setShowBugModal] = useState(false);

  return (
    <>
      <Container>
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
      </Container>

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
    </>
  );
}
