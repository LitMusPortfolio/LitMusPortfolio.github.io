import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #000;
  padding: 3rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #00bfff;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
    
    &:hover {
      color: #00bfff;
    }
  }
`;

const LogoSection = styled.div`
  img {
    height: 40px;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: rgba(0, 191, 255, 0.8);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #00bfff;
    transform: translateY(-5px);
  }
  
  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
`;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <LogoSection>
            <img src="/001_top/LitMus9_logo.webp" alt="LitMus9" />
            <p>
              音楽制作を中心に、イラスト、デザイン、3DCG、映像制作など
              幅広いクリエイティブ活動を展開しています。
            </p>
          </LogoSection>

          <FooterSection>
            <h3>Navigation</h3>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/works">Works</Link>
              </li>
              <li>
                <Link to="/voicebank">Voicebank</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Social Media</h3>
            <ul>
              <li>
                <a
                  href="https://twitter.com/litmus9"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LitMus9 on X (Twitter)"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@litmus9"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LitMus9 on YouTube"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.nicovideo.jp/user/12345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LitMus9 on niconico"
                >
                  niconico
                </a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Legal</h3>
            <ul>
              <li>
                <a href="#privacy">プライバシーポリシー</a>
              </li>
              <li>
                <a href="#terms">利用規約</a>
              </li>
              <li>
                <a href="#license">ライセンス</a>
              </li>
            </ul>
          </FooterSection>
        </FooterContent>

        <Copyright>
          <p>&copy; 2025 LitMus9. All rights reserved.</p>
        </Copyright>
      </FooterContainer>

      <BackToTop onClick={scrollToTop} aria-label="Back to top">
        <img src="/001_top/FotterPageTop.svg" alt="" aria-hidden="true" />
      </BackToTop>
    </>
  );
}
