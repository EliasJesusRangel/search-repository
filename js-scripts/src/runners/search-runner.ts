import { existsSync, readFileSync, statSync } from "fs";
import { obtainFilePaths } from "../utilities/obtain-file-paths";
import { resolve } from "path";
import ts, { SyntaxKind } from "typescript";
import { FindResult } from "../types";

function createAst(filePath: string): ts.SourceFile {
  const program = ts.createProgram([filePath], {});
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error(`Could not load source file: ${filePath}`);
  }

  return sourceFile;
}
const containsStringAndObtainType = (
  node: ts.Node,
  searchString: string
): { type: SyntaxKind; containsString: boolean; text: string | undefined } => {
  const sourceFile = node.getSourceFile();
  return {
    type: node.kind,
    containsString:
      sourceFile && sourceFile.getFullText().includes(searchString),
    text:
      sourceFile && sourceFile.getFullText().includes(searchString)
        ? node
            .getSourceFile()
            .getFullText()
            .substring(node.getStart(), node.getEnd())
        : undefined,
  };
};
function traverseAst(
  sourceFile: ts.SourceFile,
  searchString: string
): FindResult[] {
  const results: FindResult[] = [];
  function visitNode(node: ts.Node) {
    console.log(`visiting, ${ts.SyntaxKind[node.kind]}`);
    const typeAndText = containsStringAndObtainType(node, searchString);
    if (typeAndText.type === ts.SyntaxKind.Identifier) {
      const parent = node.parent;
      if (!parent) {
        console.log(JSON.stringify(node, null, 2));
        results.push({
          name: searchString,
          scope: getScope(node),
          context: getContext(node),
        });
        return;
      }
      const scope = getScope(parent);
      const context = getContext(parent);

      results.push({ name: searchString, scope, context });
    } else {
      ts.forEachChild(node, visitNode);
    }
  }

  function getScope(node: ts.Node): string {
    if (
      node.kind === ts.SyntaxKind.FunctionDeclaration ||
      node.kind === ts.SyntaxKind.FunctionExpression ||
      node.kind === ts.SyntaxKind.MethodDeclaration ||
      node.kind === ts.SyntaxKind.ArrowFunction
    ) {
      console.log(`returning function because of ${node.kind}`);
      return "function";
    } else if (ts.isClassDeclaration(node)) {
      console.log(`returning class because of ${node.kind}`);
      return "class";
    } else if (ts.isEnumDeclaration(node)) {
      console.log(`returning enum because of ${node.kind}`);
      return "enum";
    } else if (ts.isInterfaceDeclaration(node)) {
      console.log(`returning interface because of ${node.kind}`);
      return "interface";
    } else if (ts.isVariableDeclaration(node)) {
      console.log(`returning variable because of ${node.kind}`);
      return "variable";
    } else if (ts.isTypeAliasDeclaration(node)) {
      console.log(`returning type alias because of ${node.kind}`);
      return "type alias";
    }
    // Add more cases as needed
    else {
      return "unknown";
    }
  }

  function getContext(node: ts.Node): string {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isMethodDeclaration(node)
    ) {
      const signature = node.getText().split("{")[0].trim(); // Get the function signature (before the opening brace)
      return signature;
    } else if (ts.isClassDeclaration(node)) {
      return `class ${node.name?.text}`;
    } else if (ts.isEnumDeclaration(node)) {
      return `enum ${node.name?.text}`;
    } else if (ts.isInterfaceDeclaration(node)) {
      return `interface ${node.name?.text}`;
    } else if (ts.isVariableDeclaration(node)) {
      return `variable ${node.name?.getText()}`;
    } else if (ts.isTypeAliasDeclaration(node)) {
      return `type alias ${node.name?.getText()}`;
    }
    // Add more cases as needed
    else {
      return "";
    }
  }
  ts.forEachChild(sourceFile, (node) => {
    const declaration = node as ts.Declaration;
    if (declaration.name) {
      console.log(declaration.name.getText());
    }
  });
  return results;
}
const searchFile = (file: string) => {
  const fileStat = { exists: existsSync(file), stat: statSync(file) };
  // console.log(`### File ${file} exists, now searching...\n`);
  const source = createAst(file);
  const findings = traverseAst(
    source,
    process.env.SEARCH_TERM ?? "~~~~~~~~~~~~~~~~~~"
  );
  // console.log("### FINDING", JSON.stringify(findings, null, 2));
  return;
};

export async function searchRepositoryAction() {
  const rootPath = process.env.REPOSITORY_PATH;
  if (!rootPath) {
    throw new Error("Invalid root path");
  }
  const allFiles = obtainFilePaths(rootPath, false);
  for (const file of allFiles) {
    searchFile(resolve(file));
  }
}

export const searchRepositoryRunner = async () => {
  const searchRepositoryActionOptions: { [key: string]: () => void } = {
    searchRepository: searchRepositoryAction,
  } as const;

  const keys = Object.keys(searchRepositoryActionOptions);
  const actionableOptions = [];

  const options = process.argv.filter((arg) => keys.includes(arg));
  for (const option of options) {
    if (keys.includes(option)) {
      actionableOptions.push(searchRepositoryActionOptions[option]);
    }
  }

  if (actionableOptions.length > 0) {
    await actionableOptions.forEach(async (fn) => {
      await fn();
    });
  }
};
