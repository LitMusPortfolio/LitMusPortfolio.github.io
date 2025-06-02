import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

// エラーを発生させるテスト用コンポーネント
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

describe("ErrorBoundary", () => {
  // console.errorを一時的にモック
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it("エラーがない場合は子コンポーネントをレンダリングする", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("エラーが発生した場合はエラーUIを表示する", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
    expect(screen.getByText(/申し訳ございません/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "もう一度試す" }),
    ).toBeInTheDocument();
  });

  it("fallbackが提供されている場合はそれを表示する", () => {
    const fallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(screen.queryByText("エラーが発生しました")).not.toBeInTheDocument();
  });

  it("「もう一度試す」ボタンをクリックするとエラー状態がリセットされる", async () => {
    const user = userEvent.setup();
    let throwError = true;

    const TestComponent = () => {
      return <ThrowError shouldThrow={throwError} />;
    };

    const { rerender } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    // エラーUIが表示されることを確認
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();

    // エラーを起こさないようにする
    throwError = false;

    // もう一度試すボタンをクリック
    await user.click(screen.getByRole("button", { name: "もう一度試す" }));

    // 再レンダリング
    rerender(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    // 正常なコンテンツが表示されることを確認
    expect(screen.getByText("No error")).toBeInTheDocument();
  });

  it("componentDidCatchが呼ばれてエラーがログに記録される", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(console.error).toHaveBeenCalledWith(
      "ErrorBoundary caught an error:",
      expect.any(Error),
      expect.any(Object),
    );
  });

  it("複数の子コンポーネントのうち1つがエラーでも全体がエラーUIになる", () => {
    render(
      <ErrorBoundary>
        <div>Component 1</div>
        <ThrowError shouldThrow={true} />
        <div>Component 3</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
    expect(screen.queryByText("Component 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Component 3")).not.toBeInTheDocument();
  });
});
