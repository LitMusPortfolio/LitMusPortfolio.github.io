import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// コンポーネントファイルのうち、対応するstoriesファイルが無いものを検出
function checkMissingStories(): { missing: string[]; total: number } {
  const componentsDir = path.join(__dirname, "../src/components");
  const missingStories: string[] = [];
  let totalComponents = 0;

  function processDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (
        entry.name.endsWith(".tsx") &&
        !entry.name.includes(".stories.") &&
        !entry.name.includes(".test.") &&
        !entry.name.includes(".d.")
      ) {
        totalComponents++;
        const storyPath = fullPath.replace(".tsx", ".stories.tsx");

        if (!fs.existsSync(storyPath)) {
          const relativePath = path.relative(
            path.join(__dirname, ".."),
            fullPath,
          );
          missingStories.push(relativePath);
        }
      }
    }
  }

  processDirectory(componentsDir);
  return { missing: missingStories, total: totalComponents };
}

// メイン処理
const result = checkMissingStories();

if (result.missing.length > 0) {
  console.error("❌ Missing Storybook stories for the following components:\n");
  result.missing.forEach((file) => {
    console.error(`   - ${file}`);
  });
  console.error(
    `\n📝 Please run 'npm run generate-stories' to create missing stories.`,
  );
  console.error(`   Or create them manually by adding .stories.tsx files.\n`);
  process.exit(1);
} else {
  console.log(
    `✅ All ${result.total} components have corresponding Storybook stories.`,
  );
  process.exit(0);
}
