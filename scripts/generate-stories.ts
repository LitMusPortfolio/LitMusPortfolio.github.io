import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentInfo {
  name: string;
  path: string;
  isDefault: boolean;
  hasChildren?: boolean;
  isModal?: boolean;
}

// ストーリーテンプレート
const generateStoryTemplate = (info: ComponentInfo): string => {
  const importStatement = info.isDefault
    ? `import ${info.name} from "./${path.basename(info.path, ".tsx")}";`
    : `import { ${info.name} } from "./${path.basename(info.path, ".tsx")}";`;

  const layout = info.isModal
    ? "centered"
    : info.hasChildren
      ? "fullscreen"
      : "centered";

  let storyArgs = "";
  if (info.hasChildren) {
    storyArgs = `
  args: {
    children: <div style={{ padding: "2rem", color: "white" }}>Content goes here</div>,
  },`;
  }

  return `import type { Meta, StoryObj } from "@storybook/react";
${importStatement}

const meta = {
  title: "Components/${info.name}",
  component: ${info.name},
  parameters: {
    layout: "${layout}",
  },
  tags: ["autodocs"],
  argTypes: {
    ${
      info.hasChildren
        ? `children: {
      control: { type: "text" },
      description: "Child content",
    },`
        : ""
    }
  },
} satisfies Meta<typeof ${info.name}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {${storyArgs}
};
`;
};

// コンポーネント情報を解析
function analyzeComponent(filePath: string): ComponentInfo | null {
  const content = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath, ".tsx");

  // デフォルトエクスポートを探す
  const defaultExportMatch = content.match(
    /export\s+default\s+(?:function\s+)?(\w+)/,
  );
  const isDefault = !!defaultExportMatch;

  // 名前付きエクスポートを探す
  let componentName = fileName;
  if (defaultExportMatch) {
    componentName = defaultExportMatch[1];
  } else {
    const namedExportMatch = content.match(
      /export\s+(?:const|function)\s+(\w+).*?(?:React\.FC|React\.Component|=>|\{)/,
    );
    if (namedExportMatch) {
      componentName = namedExportMatch[1];
    }
  }

  // childrenプロップを持つか判定
  const hasChildren =
    content.includes("children") &&
    (content.includes("ReactNode") ||
      content.includes("React.ReactNode") ||
      content.includes("PropsWithChildren"));

  // モーダルコンポーネントか判定
  const isModal =
    componentName.toLowerCase().includes("modal") ||
    content.includes("onClose");

  return {
    name: componentName,
    path: filePath,
    isDefault,
    hasChildren,
    isModal,
  };
}

// メイン処理
async function generateStories() {
  const componentsDir = path.join(__dirname, "../src/components");
  let generatedCount = 0;
  let skippedCount = 0;

  console.log("🚀 Generating Storybook stories...\n");

  function processDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (
        entry.name.endsWith(".tsx") &&
        !entry.name.includes(".stories.") &&
        !entry.name.includes(".test.")
      ) {
        const storyPath = fullPath.replace(".tsx", ".stories.tsx");

        if (fs.existsSync(storyPath)) {
          console.log(`⏭️  Skipping ${entry.name} (story already exists)`);
          skippedCount++;
          continue;
        }

        const componentInfo = analyzeComponent(fullPath);
        if (componentInfo) {
          const storyContent = generateStoryTemplate(componentInfo);
          fs.writeFileSync(storyPath, storyContent);
          console.log(`✅ Generated story for ${componentInfo.name}`);
          generatedCount++;
        }
      }
    }
  }

  processDirectory(componentsDir);

  console.log(
    `\n✨ Done! Generated ${generatedCount} stories, skipped ${skippedCount} existing ones.`,
  );
}

// エラーハンドリング
generateStories().catch((error) => {
  console.error("❌ Error generating stories:", error);
  process.exit(1);
});
