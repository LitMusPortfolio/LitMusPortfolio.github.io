import generate from "@babel/generator";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import type { Plugin } from "vite";

const VIEWPORT_CONFIGS = [
  { name: "Mobile320", viewport: "mobile320" },
  { name: "Mobile375", viewport: "mobile375" },
  { name: "Mobile414", viewport: "mobile414" },
  { name: "Tablet768", viewport: "tablet768" },
  { name: "Tablet1024", viewport: "tablet1024" },
  { name: "Desktop1280", viewport: "desktop1280" },
  { name: "Desktop1440", viewport: "desktop1440" },
  { name: "Desktop1920", viewport: "desktop1920" },
];

export function storybookViewportsPlugin(): Plugin {
  return {
    name: "storybook-viewports",
    enforce: "pre",
    transform(code: string, id: string) {
      // .stories.tsxファイルのみを対象とする
      if (!id.includes(".stories.tsx") || id.includes("node_modules")) {
        return null;
      }

      console.log("[storybook-viewports] Processing:", id);

      try {
        // コードをASTにパース
        const ast = parse(code, {
          sourceType: "module",
          plugins: ["typescript", "jsx"],
        });

        let hasDefaultExport = false;
        let insertPosition = ast.program.body.length;

        // ASTを走査してDefaultエクスポートを探す
        traverse(ast, {
          ExportNamedDeclaration(path) {
            console.log("[storybook-viewports] Found ExportNamedDeclaration");
            const declaration = path.node.declaration;
            // export const Default = ... の形式
            if (t.isVariableDeclaration(declaration)) {
              console.log("[storybook-viewports] Found VariableDeclaration");
              declaration.declarations.forEach((decl) => {
                if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
                  console.log(
                    "[storybook-viewports] Variable name:",
                    decl.id.name,
                  );
                  if (decl.id.name === "Default") {
                    hasDefaultExport = true;
                    insertPosition = path.node.loc?.end.line || insertPosition;
                  }
                }
              });
            }

            // export { Default } の形式も検出
            const specifiers = path.node.specifiers;
            if (specifiers) {
              specifiers.forEach((spec) => {
                if (
                  t.isExportSpecifier(spec) &&
                  t.isIdentifier(spec.exported)
                ) {
                  console.log(
                    "[storybook-viewports] Export specifier:",
                    spec.exported.name,
                  );
                  if (spec.exported.name === "Default") {
                    hasDefaultExport = true;
                    insertPosition = path.node.loc?.end.line || insertPosition;
                  }
                }
              });
            }
          },
        });

        // Defaultエクスポートがある場合のみビューポートストーリーを生成
        if (hasDefaultExport) {
          console.log(
            "[storybook-viewports] Found Default export, generating viewport stories",
          );
          // ビューポートストーリーのAST生成
          const viewportExports = VIEWPORT_CONFIGS.map((config) => {
            return t.exportNamedDeclaration(
              t.variableDeclaration("const", [
                t.variableDeclarator(
                  t.identifier(config.name),
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier("parameters"),
                      t.objectExpression([
                        t.objectProperty(
                          t.identifier("viewport"),
                          t.objectExpression([
                            t.objectProperty(
                              t.identifier("defaultViewport"),
                              t.stringLiteral(config.viewport),
                            ),
                          ]),
                        ),
                      ]),
                    ),
                  ]),
                ),
              ]),
            );
          });

          // ASTに追加
          ast.program.body.push(...viewportExports);

          // ASTをコードに変換
          const output = generate(ast, {
            retainLines: false,
            compact: false,
          });

          console.log("[storybook-viewports] Generated code:", output.code);
          return {
            code: output.code,
            map: null,
          };
        }
      } catch (error) {
        console.error("Error transforming story file:", error);
      }

      return null;
    },
  };
}
