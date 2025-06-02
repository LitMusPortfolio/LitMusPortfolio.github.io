import type { ReactNode } from "react";
import { Component } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { formatErrorInfo, getErrorMessage } from "../utils/errorReporting";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorMessage?: string;
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

  static getDerivedStateFromError(error: Error) {
    // エラーメッセージを生成
    const errorMessage = getErrorMessage(error);
    return { hasError: true, error, errorMessage };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // エラー情報を整形
    formatErrorInfo(error, errorInfo);
    
    // 親コンポーネントにエラーを通知
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorMessage: undefined });
  };

  handleReload = () => {
    window.location.reload();
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
            {this.state.errorMessage || "予期しないエラーが発生しました。"}
          </ErrorMessage>
          <RetryButton onClick={this.handleReset}>もう一度試す</RetryButton>
          <RetryButton onClick={this.handleReload} style={{ marginLeft: "1rem" }}>
            ページを再読み込み
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
