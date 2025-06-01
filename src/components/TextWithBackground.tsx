import styled from "styled-components";

interface TextWithBackgroundProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

const Container = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  line-height: 1;
  /* フォントのメトリクスに基づく調整 */
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 1em;
  }
`;

const Background = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  /* テキストの実際の高さに合わせる */
  top: 0.1em;
  bottom: 0.1em;
  left: -0.05em;
  right: -0.05em;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
`;

const Content = styled.span`
  position: relative;
  z-index: 1;
  display: block;
  /* 上下の余白を削除 */
  line-height: 0.8;
  padding: 0.1em 0;
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
