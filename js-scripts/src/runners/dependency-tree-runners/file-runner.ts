import { initiateRepoDependencyTree } from "@/src/builders/dependency-tree";
import { obtainFilePaths } from "@/src/utilities/obtain-file-paths";

export async function fileRunner() {
  const rootPath = process.env.REPOSITORY_PATH;
  if (!rootPath) {
    throw new Error("Invalid root path");
  }
  const allFiles = obtainFilePaths(rootPath);
  for (const file of allFiles) {
    await initiateRepoDependencyTree([file], file.split(".")[0]);
  }
}
