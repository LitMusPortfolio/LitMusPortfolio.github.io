import { Link } from "react-router-dom";
import styled from "styled-components";
import LazyImage from "./LazyImage";
import { SocialLinks } from "./SocialLinks";

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background.darker};
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space["3xl"]};
  border-top: ${({ theme }) => theme.borders.width.thin} solid ${({ theme }) => `rgba(255, 255, 255, ${theme.opacity[10]})`};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.lg};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
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
  padding-top: ${({ theme }) => theme.space.md};
`;

const PageTop = styled.div`
  cursor: pointer;
  width: 12vw;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  border: ${({ theme }) => theme.borders.width.thin} solid;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space["2xl"]};
  border-radius: ${({ theme }) => theme.borders.radius["2xl"]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const SNSLinksWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
  
  span {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <LeftSection>
          <PageTop
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <LazyImage
              src="/001_top/FooterPageTop.svg"
              alt="Pageの一番上に移動するボタン。Page Topと書かれている。"
              aria-hidden="true"
            />
          </PageTop>
        </LeftSection>
        <RightSection>
          <SNSLinksWrapper>
            <span>SNS</span>
            <SocialLinks size="small" />
          </SNSLinksWrapper>
          <Contact>
            <Link to="/contact">CONTACT</Link>
          </Contact>
          <Copyright>
            <p>&copy; 2022 - 2025 LitMus9_. All rights reserved.</p>
          </Copyright>
        </RightSection>
      </FooterContainer>
    </>
  );
}
