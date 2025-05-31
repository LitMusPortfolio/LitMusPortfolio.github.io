import styled from "styled-components";

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00bfff, #0080ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const ProfileInfo = styled.div`
  margin-top: 3rem;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  strong {
    min-width: 120px;
    color: #00bfff;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    background: linear-gradient(45deg, #00bfff, #0080ff);
    opacity: 0.3;
    filter: blur(40px);
    z-index: -1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 191, 255, 0.2);
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const SkillTag = styled.span`
  padding: 0.5rem 1rem;
  background: rgba(0, 191, 255, 0.1);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 191, 255, 0.2);
    border-color: rgba(0, 191, 255, 0.5);
    transform: translateY(-2px);
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

export default function About() {
  return (
    <AboutSection id="about">
      <SideDecoration>
        <img src="/010_PageSideTitleSvg/ABOUT.svg" alt="ABOUT" />
      </SideDecoration>

      <Container>
        <ContentWrapper>
          <SectionTitle>ABOUT</SectionTitle>
          <Description>
            LitMus9は音楽制作を中心に、イラストレーション、デザイン、
            3DCG、映像制作など幅広いクリエイティブ活動を展開しています。
          </Description>
          <Description>
            EVOCALOIDプロデューサーとして、感情に訴える楽曲制作を心がけ、
            聴く人の心に残る作品づくりを目指しています。
          </Description>

          <ProfileInfo>
            <ProfileItem>
              <strong>活動開始</strong>
              <span>2020年〜</span>
            </ProfileItem>
            <ProfileItem>
              <strong>主な活動</strong>
              <span>音楽制作 / イラスト / デザイン</span>
            </ProfileItem>
            <ProfileItem>
              <strong>使用ソフト</strong>
              <span>Logic Pro / Photoshop / Blender</span>
            </ProfileItem>
          </ProfileInfo>

          <SkillsList>
            <SkillTag>音楽制作</SkillTag>
            <SkillTag>作詞・作曲</SkillTag>
            <SkillTag>イラスト</SkillTag>
            <SkillTag>3DCG</SkillTag>
            <SkillTag>映像編集</SkillTag>
            <SkillTag>デザイン</SkillTag>
          </SkillsList>
        </ContentWrapper>

        <ImageWrapper>
          <ProfileImage src="/002_about/LitMusIcon.webp" alt="LitMus9" />
        </ImageWrapper>
      </Container>
    </AboutSection>
  );
}
