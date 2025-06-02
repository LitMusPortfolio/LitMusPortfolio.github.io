import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { describe, expect, it, vi } from "vitest";
import { theme } from "@/styles/theme";
import { Tabs } from "./Tabs";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Tabs", () => {
  // テスト用のデータ
  const mockTabs = [
    { value: "tab1", label: "Tab 1" },
    { value: "tab2", label: "Tab 2" },
    { value: "tab3", label: "Tab 3" },
  ];

  const mockItems = [
    { id: 1, category: "tab1", content: "Item 1" },
    { id: 2, category: "tab1", content: "Item 2" },
    { id: 3, category: "tab2", content: "Item 3" },
    { id: 4, category: "tab3", content: "Item 4" },
    { id: 5, category: "tab3", content: "Item 5" },
  ];

  const defaultProps = {
    tabs: mockTabs,
    items: mockItems,
    activeTab: "tab1",
    onTabChange: vi.fn(),
    getTabValue: (item: typeof mockItems[0]) => item.category,
    renderItem: (item: typeof mockItems[0]) => <div>{item.content}</div>,
  };

  it("すべてのタブが正しくレンダリングされる", () => {
    renderWithTheme(<Tabs {...defaultProps} />);

    mockTabs.forEach((tab) => {
      const tabButton = screen.getByRole("tab", { name: tab.label });
      expect(tabButton).toBeInTheDocument();
    });
  });

  it("アクティブなタブが正しく表示される", () => {
    renderWithTheme(<Tabs {...defaultProps} activeTab="tab2" />);

    const activeTab = screen.getByRole("tab", { name: "Tab 2" });
    expect(activeTab).toHaveAttribute("aria-selected", "true");

    const inactiveTabs = [
      screen.getByRole("tab", { name: "Tab 1" }),
      screen.getByRole("tab", { name: "Tab 3" }),
    ];
    inactiveTabs.forEach((tab) => {
      expect(tab).toHaveAttribute("aria-selected", "false");
    });
  });

  it("アクティブなタブに対応するアイテムのみが表示される", () => {
    renderWithTheme(<Tabs {...defaultProps} />);

    // tab1のアイテムが表示される
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // 他のタブのアイテムは表示されない
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 5")).not.toBeInTheDocument();
  });

  it("タブクリック時にonTabChangeが呼ばれる", () => {
    const onTabChange = vi.fn();
    renderWithTheme(<Tabs {...defaultProps} onTabChange={onTabChange} />);

    const tab2Button = screen.getByRole("tab", { name: "Tab 2" });
    fireEvent.click(tab2Button);

    expect(onTabChange).toHaveBeenCalledWith("tab2");
    expect(onTabChange).toHaveBeenCalledTimes(1);
  });

  it("タブが切り替わると表示されるアイテムが変わる", () => {
    const { rerender } = renderWithTheme(<Tabs {...defaultProps} />);

    // 初期状態: tab1のアイテムが表示される
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();

    // tab2に切り替え
    rerender(
      <ThemeProvider theme={theme}>
        <Tabs {...defaultProps} activeTab="tab2" />
      </ThemeProvider>,
    );

    // tab2のアイテムが表示される
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("タブパネルのARIA属性が正しく設定される", () => {
    renderWithTheme(<Tabs {...defaultProps} />);

    const tabPanel = screen.getByRole("tabpanel");
    expect(tabPanel).toHaveAttribute("id", "tabpanel-tab1");
    expect(tabPanel).toHaveAttribute("aria-labelledby", "tab-tab1");
  });

  it("タブボタンのARIA属性が正しく設定される", () => {
    renderWithTheme(<Tabs {...defaultProps} />);

    const tab1Button = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab1Button).toHaveAttribute("aria-controls", "tabpanel-tab1");
    expect(tab1Button).toHaveAttribute("aria-selected", "true");

    const tab2Button = screen.getByRole("tab", { name: "Tab 2" });
    expect(tab2Button).toHaveAttribute("aria-controls", "tabpanel-tab2");
    expect(tab2Button).toHaveAttribute("aria-selected", "false");
  });

  it("空のアイテムリストでもエラーにならない", () => {
    const { container } = renderWithTheme(
      <Tabs {...defaultProps} items={[]} />,
    );

    expect(container).toBeInTheDocument();
    const tabPanel = screen.getByRole("tabpanel");
    expect(tabPanel).toBeInTheDocument();
    expect(tabPanel.children).toHaveLength(0);
  });

  it("IDのないアイテムでも正しくレンダリングされる", () => {
    const itemsWithoutId = [
      { category: "tab1", content: "No ID Item 1" },
      { category: "tab1", content: "No ID Item 2" },
    ];

    renderWithTheme(
      <Tabs
        {...defaultProps}
        items={itemsWithoutId}
        getTabValue={(item) => item.category}
        renderItem={(item) => <div>{item.content}</div>}
      />,
    );

    expect(screen.getByText("No ID Item 1")).toBeInTheDocument();
    expect(screen.getByText("No ID Item 2")).toBeInTheDocument();
  });

  it("複数のタブに切り替えてもonTabChangeが正しく動作する", () => {
    const onTabChange = vi.fn();
    renderWithTheme(<Tabs {...defaultProps} onTabChange={onTabChange} />);

    // Tab 2をクリック
    fireEvent.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(onTabChange).toHaveBeenCalledWith("tab2");

    // Tab 3をクリック
    fireEvent.click(screen.getByRole("tab", { name: "Tab 3" }));
    expect(onTabChange).toHaveBeenCalledWith("tab3");

    // Tab 1をクリック
    fireEvent.click(screen.getByRole("tab", { name: "Tab 1" }));
    expect(onTabChange).toHaveBeenCalledWith("tab1");

    expect(onTabChange).toHaveBeenCalledTimes(3);
  });

  it("カスタムrenderItem関数が正しく動作する", () => {
    const customRenderItem = (item: typeof mockItems[0]) => (
      <article>
        <h3>Title: {item.id}</h3>
        <p>{item.content}</p>
      </article>
    );

    renderWithTheme(
      <Tabs {...defaultProps} renderItem={customRenderItem} />,
    );

    // カスタムレンダリングされた要素を確認
    expect(screen.getByText("Title: 1")).toBeInTheDocument();
    expect(screen.getByText("Title: 2")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("同じタブを複数回クリックしてもonTabChangeが呼ばれる", () => {
    const onTabChange = vi.fn();
    renderWithTheme(<Tabs {...defaultProps} onTabChange={onTabChange} />);

    const tab1Button = screen.getByRole("tab", { name: "Tab 1" });
    
    // 同じタブを3回クリック
    fireEvent.click(tab1Button);
    fireEvent.click(tab1Button);
    fireEvent.click(tab1Button);

    expect(onTabChange).toHaveBeenCalledWith("tab1");
    expect(onTabChange).toHaveBeenCalledTimes(3);
  });
});