import fs from "fs";
import path from "path";
const exceptionPaths = ["node_modules"];
export function obtainFilePaths(
  rootDirectory: string,
  folderOnly: boolean = false
): string[] {
  const filePaths: string[] = [];

  function traverseDirectory(directoryPath: string) {
    const entries = fs.readdirSync(directoryPath);
    for (const entry of entries) {
      const fullPath = path.join(directoryPath, entry);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        if (exceptionPaths.some((path: string) => path === fullPath)) continue;
        if (folderOnly) filePaths.push(fullPath);
        traverseDirectory(fullPath);
      } else if (stats.isFile() && !folderOnly) {
        filePaths.push(fullPath);
      }
    }
  }

  traverseDirectory(rootDirectory);
  return filePaths;
}
