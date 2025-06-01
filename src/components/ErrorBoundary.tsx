import type { ReactNode } from "react";
import { Component } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: ${theme.colors.text.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background: ${theme.colors.primary.gradient};
  color: ${theme.colors.text.primary};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.button};
  }

  &:active {
    transform: translateY(0);
  }
`;

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <ErrorContainer>
          <ErrorTitle>エラーが発生しました</ErrorTitle>
          <ErrorMessage>
            申し訳ございません。予期しないエラーが発生しました。
            ページを再読み込みするか、時間をおいて再度お試しください。
          </ErrorMessage>
          <RetryButton onClick={this.handleReset}>もう一度試す</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
