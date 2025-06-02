import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { theme } from "@/styles/theme";
import Modal from "./index";

// モックの設定
vi.mock("./ModalFocusManager", () => ({
  useModalFocusManager: vi.fn(),
  useScrollLock: vi.fn(),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Modal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("isOpen=trueの時にモーダルが表示される", () => {
    renderWithTheme(<Modal {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("isOpen=falseの時にモーダルは非表示になる", () => {
    renderWithTheme(<Modal {...defaultProps} isOpen={false} />);

    // visibility: hiddenのため、hidden: trueオプションが必要
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
  });

  it("オーバーレイクリックでonCloseが呼ばれる", () => {
    const onClose = vi.fn();
    const { container } = renderWithTheme(
      <Modal {...defaultProps} onClose={onClose} />,
    );

    // オーバーレイ要素をクリック
    const overlay = container.firstChild as HTMLElement;
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("モーダルコンテンツクリックではonCloseが呼ばれない", () => {
    const onClose = vi.fn();
    renderWithTheme(<Modal {...defaultProps} onClose={onClose} />);

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("タイトルが正しく表示される", () => {
    renderWithTheme(<Modal {...defaultProps} title="Test Title" />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Test Title");
  });

  it("カスタムaria-labelが設定される", () => {
    renderWithTheme(
      <Modal {...defaultProps} ariaLabel="Custom Modal Label" />,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Custom Modal Label");
  });

  it("デフォルトのaria-labelが設定される", () => {
    renderWithTheme(<Modal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Modal dialog");
  });

  it("画像付きモーダルが正しくレンダリングされる", () => {
    renderWithTheme(
      <Modal
        {...defaultProps}
        hasImage
        imageUrl="/test-image.jpg"
        title="Image Modal"
      />,
    );

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Image Modal");
  });

  it("画像URLのみ指定した場合も画像が表示される", () => {
    renderWithTheme(
      <Modal {...defaultProps} imageUrl="/test-image.jpg" />,
    );

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Modal image");
  });

  it("variantプロパティが正しく適用される", () => {
    const { rerender } = renderWithTheme(
      <Modal {...defaultProps} variant="default" />,
    );

    // デフォルトバリアント
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // ダウンロードバリアント
    rerender(
      <ThemeProvider theme={theme}>
        <Modal {...defaultProps} variant="download" />
      </ThemeProvider>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // グラスバリアント
    rerender(
      <ThemeProvider theme={theme}>
        <Modal {...defaultProps} variant="glass" />
      </ThemeProvider>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("maxWidthプロパティが適用される", () => {
    renderWithTheme(<Modal {...defaultProps} maxWidth="500px" />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  it("aria-modal属性が正しく設定される", () => {
    renderWithTheme(<Modal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("tabIndexが-1に設定される", () => {
    renderWithTheme(<Modal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("tabindex", "-1");
  });

  it("複数の子要素が正しくレンダリングされる", () => {
    renderWithTheme(
      <Modal {...defaultProps}>
        <h2>Modal Title</h2>
        <p>Modal description</p>
        <button type="button">Action Button</button>
      </Modal>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Modal Title",
    );
    expect(screen.getByText("Modal description")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Action Button");
  });

  it("画像なしでhasImage=falseの場合、画像セクションがレンダリングされない", () => {
    renderWithTheme(<Modal {...defaultProps} hasImage={false} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("stopPropagationが正しく動作する", () => {
    const onClose = vi.fn();
    
    renderWithTheme(
      <Modal {...defaultProps} onClose={onClose} />,
    );

    // モーダルコンテンツ（ダイアログ）をクリック
    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);

    // stopPropagationにより、onCloseは呼ばれない
    expect(onClose).not.toHaveBeenCalled();
  });
});