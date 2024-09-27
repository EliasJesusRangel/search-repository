import { initiateRepoDependencyTree } from "@/src//builders/dependency-tree";
import { obtainFilePaths } from "@/src//utilities/obtain-file-paths";

export async function fileRunner() {
  const rootPath = process.env.REPOSITORY_PATH;
  if (!rootPath) {
    throw new Error("Invalid root path");
  }
  const allFolders = obtainFilePaths(rootPath, true);
  for (const file of allFolders) {
    await initiateRepoDependencyTree([file], file.split(".")[0]);
  }
}
