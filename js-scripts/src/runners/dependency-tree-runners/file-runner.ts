import buildDependencyTree, {
  initiateRepoDependencyTree,
} from "../../builders/dependency-tree";
import { obtainFilePaths } from "../../utilities/obtain-file-paths";

export async function fileRunner() {
  const rootPath = process.env.REPOSITORY_PATH;
  if (!rootPath) {
    throw new Error("Invalid root path");
  }
  const allFiles = obtainFilePaths(rootPath);
  // initiateRepoDependencyTree(allFolders);
  for (const file of allFiles) {
    await initiateRepoDependencyTree([file], file.split(".")[0]);
  }
}
