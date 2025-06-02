import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #000;
  padding: 3rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <LeftSection>
          <p>
            <Link to="/">Home</Link>
          </p>
        </LeftSection>
        <RightSection>
          <p>
            <Link to="/#contact">Contact</Link>
          </p>
          <Copyright>
            <p>&copy; 2022 - 2025 LitMus9_. All rights reserved.</p>
          </Copyright>
        </RightSection>
      </FooterContainer>
    </>
  );
}
