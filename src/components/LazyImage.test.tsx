import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { theme } from "@/styles/theme";
import { imageCache } from "@/utils/imageCache";
import LazyImage from "./LazyImage";

// imageCache のモック
vi.mock("@/utils/imageCache", () => ({
  imageCache: {
    isLoaded: vi.fn(),
    markAsLoaded: vi.fn(),
  },
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("LazyImage", () => {
  // IntersectionObserver のモック
  let mockIntersectionObserver: {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
  };
  let intersectionObserverCallback: IntersectionObserverCallback;

  beforeEach(() => {
    vi.clearAllMocks();

    // デフォルトでキャッシュされていない状態
    vi.mocked(imageCache.isLoaded).mockReturnValue(false);

    // IntersectionObserver のモック設定
    mockIntersectionObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    };

    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      intersectionObserverCallback = callback;
      return mockIntersectionObserver;
    });
  });

  it("初期状態では画像が表示されない（遅延読み込み）", () => {
    renderWithTheme(<LazyImage src="/test.jpg" alt="Test image" />);

    const img = screen.queryByRole("img", { name: "Test image" });
    expect(img).not.toBeInTheDocument();
  });

  it("eager=trueの場合は即座に画像が表示される", () => {
    renderWithTheme(<LazyImage src="/test.jpg" alt="Test image" eager />);

    const img = screen.getByRole("img", { name: "Test image" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test.jpg");
  });

  it("キャッシュされている画像は即座に表示される", () => {
    vi.mocked(imageCache.isLoaded).mockReturnValue(true);

    renderWithTheme(<LazyImage src="/cached.jpg" alt="Cached image" />);

    const img = screen.getByRole("img", { name: "Cached image" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/cached.jpg");
  });

  it("placeholder画像が正しく表示される", () => {
    renderWithTheme(
      <LazyImage
        src="/test.jpg"
        alt="Test image"
        placeholder="/placeholder.jpg"
      />,
    );

    // aria-hidden="true"のため、querySelectorを使用
    const placeholderImg = screen.getByAltText("");
    expect(placeholderImg).toHaveAttribute("src", "/placeholder.jpg");
    expect(placeholderImg).toHaveAttribute("aria-hidden", "true");
  });

  it("IntersectionObserverで画像が表示範囲に入ったら読み込まれる", async () => {
    renderWithTheme(<LazyImage src="/test.jpg" alt="Test image" />);

    // 初期状態では画像なし
    expect(screen.queryByRole("img", { name: "Test image" })).not.toBeInTheDocument();

    // IntersectionObserver のコールバックを実行
    const entries = [{ isIntersecting: true, target: {} }];
    intersectionObserverCallback(entries as any, {} as any);

    // 画像が表示される
    await waitFor(() => {
      const img = screen.getByRole("img", { name: "Test image" });
      expect(img).toBeInTheDocument();
    });
  });

  it("画像のロード成功時にonLoadコールバックが呼ばれる", async () => {
    const onLoad = vi.fn();
    renderWithTheme(
      <LazyImage src="/test.jpg" alt="Test image" onLoad={onLoad} eager />,
    );

    const img = screen.getByRole("img", { name: "Test image" });
    fireEvent.load(img);

    expect(onLoad).toHaveBeenCalled();
    expect(imageCache.markAsLoaded).toHaveBeenCalledWith("/test.jpg");
  });

  it("画像のロードエラー時にfallback画像が表示される", async () => {
    const onError = vi.fn();
    renderWithTheme(
      <LazyImage
        src="/error.jpg"
        alt="Error image"
        fallback="/fallback.jpg"
        onError={onError}
        eager
      />,
    );

    const img = screen.getByRole("img", { name: "Error image" });
    fireEvent.error(img);

    expect(onError).toHaveBeenCalled();
    expect(img).toHaveAttribute("src", "/fallback.jpg");
  });

  it("画像のロードエラー時にplaceholderが非表示になる", async () => {
    renderWithTheme(
      <LazyImage
        src="/error.jpg"
        alt="Error image"
        placeholder="/placeholder.jpg"
        eager
      />,
    );

    const img = screen.getByRole("img", { name: "Error image" });
    fireEvent.error(img);

    // placeholder画像が非表示になることを確認
    expect(screen.queryByAltText("")).not.toBeInTheDocument();
  });

  it("classNameが正しく適用される", () => {
    renderWithTheme(
      <LazyImage
        src="/test.jpg"
        alt="Test image"
        className="custom-class"
        eager
      />,
    );

    const wrapper = screen.getByRole("img", { name: "Test image" }).parentElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("コンポーネントのアンマウント時にIntersectionObserverが切断される", () => {
    const { unmount } = renderWithTheme(
      <LazyImage src="/test.jpg" alt="Test image" />,
    );

    expect(mockIntersectionObserver.observe).toHaveBeenCalled();

    unmount();

    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
  });

  it("画像が既にキャッシュされている場合はIntersectionObserverを使用しない", () => {
    vi.mocked(imageCache.isLoaded).mockReturnValue(true);

    renderWithTheme(<LazyImage src="/cached.jpg" alt="Cached image" />);

    // IntersectionObserverが作成されないことを確認
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });

  it("opacity遷移が正しく動作する", async () => {
    renderWithTheme(<LazyImage src="/test.jpg" alt="Test image" eager />);

    const img = screen.getByRole("img", { name: "Test image" });
    
    // 初期状態ではopacity: 0
    expect(img).toHaveStyle({ opacity: 0 });

    // ロード完了後にopacity: 1
    fireEvent.load(img);
    expect(img).toHaveStyle({ opacity: 1 });
  });

  it("デフォルトのfallback画像パスが使用される", () => {
    renderWithTheme(
      <LazyImage src="/error.jpg" alt="Error image" eager />,
    );

    const img = screen.getByRole("img", { name: "Error image" });
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "/path/to/default-image.webp");
  });
});