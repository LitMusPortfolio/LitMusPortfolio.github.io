import styled from "styled-components";
import { theme } from "../styles/theme";

// タブコンポーネント
export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  
  /* 右端まで伸びる罫線 */
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    margin-left: 2rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    
    &::after {
      display: none;
    }
  }
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
