import styled from "styled-components";

const CharacterSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a0a2a 100%);
  position: relative;
  overflow: hidden;
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

const CharacterIntro = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CharacterImage = styled.div`
  position: relative;
  
  img {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: block;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(148, 0, 211, 0.3) 0%, transparent 70%);
    filter: blur(60px);
    z-index: -1;
  }
`;

const CharacterInfo = styled.div`
  h3 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #9400d3;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const SpecsList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 2rem;
  background: rgba(148, 0, 211, 0.1);
  padding: 2rem;
  border-radius: 15px;
  
  dt {
    font-weight: 600;
    color: #9400d3;
  }
  
  dd {
    margin: 0;
  }
`;

const DownloadSection = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 3rem;
  background: linear-gradient(45deg, #9400d3, #4b0082);
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(148, 0, 211, 0.4);
  }
  
  &::after {
    content: '↓';
    font-size: 1.5rem;
  }
`;

const VideoSection = styled.div`
  margin-top: 6rem;
  text-align: center;
  
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #9400d3;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(148, 0, 211, 0.3);
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

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
  return (
    <CharacterSection id="voicebank">
      <SideDecoration>
        <img src="/010_PageSideTitleSvg/Character.svg" alt="CHARACTER" />
      </SideDecoration>

      <Container>
        <SectionTitle>Lit - UTAU Voice Library</SectionTitle>

        <CharacterIntro>
          <CharacterImage>
            <img src="/101_Lit/LitB_差し替え前提.webp" alt="Lit Character" />
          </CharacterImage>

          <CharacterInfo>
            <h3>Lit</h3>
            <p>
              UTAUボイスライブラリ「Lit」は、透明感のある歌声と
              豊かな表現力を持つ音声合成ライブラリです。
              幅広い音域と自然な発音により、様々なジャンルの楽曲に対応します。
            </p>

            <SpecsList>
              <dt>音域</dt>
              <dd>C3 - C5</dd>
              <dt>推奨テンポ</dt>
              <dd>60 - 180 BPM</dd>
              <dt>得意ジャンル</dt>
              <dd>ポップス、バラード、エレクトロニカ</dd>
              <dt>収録言語</dt>
              <dd>日本語</dd>
              <dt>ライセンス</dt>
              <dd>個人利用・商用利用可（要クレジット表記）</dd>
            </SpecsList>
          </CharacterInfo>
        </CharacterIntro>

        <DownloadSection>
          <DownloadButton href="#download">DOWNLOAD Lit UTAU</DownloadButton>
        </DownloadSection>

        <VideoSection>
          <h3>Demo Song</h3>
          <VideoWrapper>
            <video controls poster="/101_Lit/LitDummy.png">
              <source src="/101_Lit/LitTopMovie.webm" type="video/webm" />
              <source src="/101_Lit/LitTopMovie.mp4" type="video/mp4" />
              <track kind="captions" />
            </video>
          </VideoWrapper>
        </VideoSection>
      </Container>
    </CharacterSection>
  );
}
