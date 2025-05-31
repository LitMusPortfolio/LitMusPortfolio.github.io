import styled from "styled-components";

interface TextWithBackgroundProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

const Container = styled.span`
  position: relative;
  display: inline-block;
  line-height: 0.7;
  vertical-align: bottom;
  /* Montserratフォントの余白を削除 */
  margin-top: -0.15em;
  margin-bottom: -0.15em;
`;

const Background = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: contain;
  background-position: center;
  background-repeat: repeat-x;
  z-index: -1;
`;

const Content = styled.span`
  position: relative;
  z-index: 1;
`;

export default function TextWithBackground({
  children,
  backgroundImage = "/001_top/nameBG.webp",
}: TextWithBackgroundProps) {
  return (
    <Container>
      <Background $backgroundImage={backgroundImage} />
      <Content>{children}</Content>
    </Container>
  );
}
