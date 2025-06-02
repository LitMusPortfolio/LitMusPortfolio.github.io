import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #000;
  padding: 3rem 6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const PageTop = styled.img`
  cursor: pointer;
  width: 10rem;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  border: 0.1rem solid white;
  padding: 0.5rem 4rem;
  border-radius: 3rem;
  font-size: 1.5rem;
`;

const SNSLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SNSLink = styled.img`
  width: 2rem;
`;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <FooterContainer>
        <LeftSection>
          <PageTop
            src="/001_top/FooterPageTop.svg"
            alt=""
            aria-hidden="true"
            onClick={scrollToTop}
          />
        </LeftSection>
        <RightSection>
          <SNSLinks>
            <span>SNS</span>
            <SNSLink src="/001_top/icon_X.svg" />
            <SNSLink src="/001_top/icon_youtube.svg" />
            <SNSLink src="/001_top/icon_niconico.svg" />
          </SNSLinks>
          <Contact>
            <Link to="/contact">CONTACT ▶</Link>
          </Contact>
          <Copyright>
            <p>&copy; 2022 - 2025 LitMus9_. All rights reserved.</p>
          </Copyright>
        </RightSection>
      </FooterContainer>
    </>
  );
}
