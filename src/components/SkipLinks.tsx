import styled from 'styled-components';
import { theme } from '@/styles/theme';

const SkipLinksContainer = styled.nav`
  position: absolute;
  top: -40px;
  left: 0;
  z-index: ${theme.zIndex.tooltip};
  
  &:focus-within {
    top: 0;
  }
`;

const SkipLink = styled.a`
  display: inline-block;
  padding: ${theme.space.md} ${theme.space.lg};
  background: ${theme.colors.primary.main};
  color: white;
  text-decoration: none;
  border-radius: 0 0 ${theme.radius.md} 0;
  
  &:focus {
    outline: 3px solid ${theme.colors.primary.light};
    outline-offset: 2px;
  }
`;

export const SkipLinks: React.FC = () => {
  return (
    <SkipLinksContainer aria-label="スキップリンク">
      <SkipLink href="#main-content">メインコンテンツへスキップ</SkipLink>
      <SkipLink href="#main-navigation">ナビゲーションへスキップ</SkipLink>
    </SkipLinksContainer>
  );
};