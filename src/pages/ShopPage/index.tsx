import styled from "styled-components";
import { Container, Section } from "@/components/Layout";
import { PageTitle } from "@/components/PageTitle";

const ShopSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShopContainer = styled(Container)`
  max-width: 800px;
  text-align: center;
`;

// TitleはPageTitleコンポーネントで置き換え

const Message = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  line-height: 1.8;
`;

export default function ShopPage() {
  return (
    <ShopSection>
      <ShopContainer>
        <PageTitle gradientColors={{ color1: "#00ffff", color2: "#ff00ff" }}>
          SHOP
        </PageTitle>
        <Message>
          オンラインショップは現在準備中です。
          <br />
          今しばらくお待ちください。
        </Message>
      </ShopContainer>
    </ShopSection>
  );
}
