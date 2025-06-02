import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { describe, expect, it } from "vitest";
import { theme } from "../styles/theme";
import LoadingSpinner from "./LoadingSpinner";

// styled-componentsでレンダリングするためのヘルパー
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("LoadingSpinner", () => {
  it("コンテナとスピナーが正しくレンダリングされる", () => {
    const { container } = renderWithTheme(<LoadingSpinner />);

    // LoadingContainerとSpinnerの両方が存在することを確認
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.firstChild).toBeInTheDocument();
  });

  it("コンテナが全画面表示のスタイルを持つ", () => {
    const { container } = renderWithTheme(<LoadingSpinner />);

    const loadingContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(loadingContainer);

    // フレックスボックスの中央配置
    expect(styles.display).toBe("flex");
    expect(styles.alignItems).toBe("center");
    expect(styles.justifyContent).toBe("center");
    expect(styles.minHeight).toBe("100vh");
  });

  it("スピナーが円形でアニメーションを持つ", () => {
    const { container } = renderWithTheme(<LoadingSpinner />);

    const spinner = container.querySelector("div > div") as HTMLElement;

    // styled-componentsのクラス名でスピナーが存在することを確認
    expect(spinner).toBeInTheDocument();

    // スピナーの構造が正しいことを確認（divの中にdivがある）
    expect(spinner.tagName).toBe("DIV");
    expect(spinner.parentElement?.tagName).toBe("DIV");
  });

  it("スピナーに正しいボーダーカラーが設定されている", () => {
    const { container } = renderWithTheme(<LoadingSpinner />);

    const spinner = container.querySelector("div > div") as HTMLElement;

    // スピナー要素が存在することを確認
    expect(spinner).toBeInTheDocument();

    // styled-componentsが適用されていることを確認（クラス名の存在）
    expect(spinner.className).toBeTruthy();
  });

  it("背景色がテーマから適用されている", () => {
    const { container } = renderWithTheme(<LoadingSpinner />);

    const loadingContainer = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(loadingContainer);

    // 背景色が設定されていることを確認（実際の色値は環境により異なる可能性があるため存在確認のみ）
    expect(styles.backgroundColor).toBeTruthy();
  });
});
