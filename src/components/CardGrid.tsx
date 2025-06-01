import styled from "styled-components";
import { theme } from "../styles/theme";

// カードグリッドコンテナ
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

// カード基本スタイル
export const Card = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
  }
`;

// カードヘッダー（オプション）
export const CardHeader = styled.div`
  padding: 1.5rem;
  background: rgba(139, 92, 246, 0.1);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
`;

// カードタイプ/カテゴリータグ
export const CardTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: ${theme.colors.primary.main};
  color: white;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// カード情報セクション
export const CardInfo = styled.div`
  padding: 1.5rem;
`;

// カードタイトル
export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text.primary};
`;

// カード説明文
export const CardDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
`;

// タブコンポーネント
export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 0.8rem 2rem;
  background: ${(props) => (props.$active ? "rgba(139, 92, 246, 0.2)" : "transparent")};
  border: 2px solid ${(props) => (props.$active ? theme.colors.primary.main : "rgba(255, 255, 255, 0.2)")};
  border-radius: 30px;
  color: ${(props) => (props.$active ? theme.colors.primary.main : "#fff")};
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: ${theme.colors.primary.main};
  }
`;
