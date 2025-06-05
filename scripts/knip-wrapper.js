#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

// worktreeでの実行を検出
const isWorktree = () => {
  try {
    const gitPath = join(process.cwd(), ".git");
    if (existsSync(gitPath)) {
      const stats = statSync(gitPath);
      return stats.isFile();
    }
  } catch {
    return false;
  }
  return false;
};

if (isWorktree()) {
  console.log("Skipping knip in worktree environment");
  process.exit(0);
}

// worktreeでない場合は通常のknipを実行
const knipProcess = spawn(
  "node",
  [join(process.cwd(), "node_modules/.bin/knip"), ...process.argv.slice(2)],
  {
    stdio: "inherit",
    shell: true,
  },
);

knipProcess.on("exit", (code) => {
  process.exit(code || 0);
});
