import { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

// キャラクター詳細セクション
const CharacterDetailSection = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  background: ${theme.colors.background.gradient.main};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 40%);
    z-index: 0;
  }
  
  &::after {
    content: 'CHARACTER';
    position: absolute;
    top: 50%;
    right: -100px;
    transform: translateY(-50%) rotate(90deg);
    font-size: 8rem;
    font-weight: 900;
    color: ${theme.colors.purple[500]}1a;
    letter-spacing: 0.2em;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  
  img {
    height: 80px;
    width: auto;
    filter: drop-shadow(0 4px 20px rgba(139, 92, 246, 0.8));
  }
  
  @media (max-width: 768px) {
    img {
      height: 60px;
    }
  }
`;

const CharacterProfile = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 6rem;
  align-items: stretch;
  margin-bottom: 4rem;
  min-height: 80vh;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    min-height: auto;
  }
`;

const CharacterVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  
  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    display: block;
    filter: drop-shadow(${theme.shadows.glow.medium});
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  @media (max-width: 968px) {
    img {
      max-width: 400px;
    }
  }
`;

const ProfileInfo = styled.div`
  background: ${theme.effects.glassmorphism.background};
  border: 2px solid ${theme.colors.purple[500]}80;
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  
  h3 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: ${theme.colors.primary.main};
    text-shadow: 0 2px 10px rgba(139, 92, 246, 0.8);
    font-weight: 900;
    letter-spacing: 0.1em;
  }
`;

const ProfileTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.5rem;
  
  tr {
    td {
      padding: 1rem 0;
      font-size: 1.1rem;
      color: #fff;
      
      &:first-child {
        font-weight: bold;
        color: ${theme.colors.primary.light};
        width: 120px;
        padding-right: 2rem;
      }
      
      &:last-child {
        font-size: 1.2rem;
      }
    }
  }
`;

const TruthButton = styled.button`
  margin-top: 3rem;
  padding: 1.2rem 3rem;
  background: ${theme.colors.purple[500]}33;
  border: 2px solid ${theme.colors.primary.main};
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  
  &:hover {
    background: ${theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(139, 92, 246, 0.5);
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

// デモソングの追加
const DemoSongs = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const DemoSongTitle = styled.h3`
  font-size: 2rem;
  color: #8b5cf6;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(139, 92, 246, 0.5);
`;

const DemoSongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DemoSongCard = styled.a`
  display: block;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 10px;
  padding: 1.5rem;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  }
  
  h4 {
    font-size: 1.3rem;
    color: #a78bfa;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export default function LitCharacterSection() {
  const [showBugModal, setShowBugModal] = useState(false);

  return (
    <>
      <CharacterDetailSection>
        <Container>
          <SectionTitle>
            <img src="/010_PageSideTitleSvg/Character.svg" alt="CHARACTER" />
          </SectionTitle>

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
                    <td>年齢</td>
                    <td>不明</td>
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
                    <td>一人称</td>
                    <td>ボク</td>
                  </tr>
                  <tr>
                    <td>趣味</td>
                    <td>旅行、歌、瞑想</td>
                  </tr>
                  <tr>
                    <td>好き</td>
                    <td>日光浴、さつまいも</td>
                  </tr>
                  <tr>
                    <td>嫌い</td>
                    <td>わからない</td>
                  </tr>
                  <tr>
                    <td>特筆事項</td>
                    <td>記憶喪失</td>
                  </tr>
                  <tr>
                    <td>目的</td>
                    <td>自分が何者か知る</td>
                  </tr>
                </tbody>
              </ProfileTable>

              <DemoSongs>
                <DemoSongTitle>デモソング</DemoSongTitle>
                <DemoSongGrid>
                  <DemoSongCard
                    href="https://www.youtube.com/watch?v=Am0LJHT7ipv0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>はじめまして僕「リト」で忘れよう / RuLu</h4>
                    <p>オリジナル楽曲</p>
                  </DemoSongCard>
                  <DemoSongCard
                    href="https://www.youtube.com/watch?v=Am0LJHT7ipv0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>はじめまして僕「リト」で思い出そう♪ / Rと</h4>
                    <p>カバー楽曲</p>
                  </DemoSongCard>
                </DemoSongGrid>
              </DemoSongs>

              <TruthButton onClick={() => setShowBugModal(true)}>
                DO YOU WANT TO KNOW THE TRUTH?
              </TruthButton>
            </ProfileInfo>
          </CharacterProfile>
        </Container>
      </CharacterDetailSection>

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
