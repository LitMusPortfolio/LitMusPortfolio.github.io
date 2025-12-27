import type { ReactNode } from "react";
import { Component } from "react";
import { formatErrorInfo, getErrorMessage } from "@/utils/errorReporting";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

type State = {
  hasError: boolean;
  error?: Error;
  errorMessage?: string;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    const errorMessage = getErrorMessage(error);
    return { hasError: true, error, errorMessage };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    formatErrorInfo(error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorMessage: undefined,
    });
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
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
          <h2 className="mb-4 text-[2rem] text-[var(--color-text-primary)]">
            エラーが発生しました
          </h2>
          <p className="mb-8 max-w-[600px] text-base text-[var(--color-text-secondary)]">
            {this.state.errorMessage || "予期しないエラーが発生しました。"}
          </p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={this.handleReset}
              className="cursor-pointer rounded-lg border-none bg-gradient-primary px-8 py-4 text-base text-[var(--color-text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-button active:translate-y-0"
            >
              もう一度試す
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              className="cursor-pointer rounded-lg border-none bg-gradient-primary px-8 py-4 text-base text-[var(--color-text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-button active:translate-y-0"
            >
              ページを再読み込み
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
