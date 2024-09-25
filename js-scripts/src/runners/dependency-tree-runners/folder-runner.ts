import { Console } from "console";
import buildDependencyTree, {
  initiateRepoDependencyTree,
} from "../../builders/dependency-tree";
import { obtainFilePaths } from "../../utilities/obtain-file-paths";

export function folderRunner() {
  const rootPath = process.env.REPOSITORY_PATH;
  if (!rootPath) {
    throw new Error("Invalid root path");
  }
  const allFolders = obtainFilePaths(rootPath, true);

  initiateRepoDependencyTree(allFolders);
}
