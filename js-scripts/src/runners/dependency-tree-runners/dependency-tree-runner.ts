import { initiateRepoDependencyTree } from "@/src/builders/dependency-tree";
import { obtainFilePaths } from "@/src/utilities/obtain-file-paths";

export async function buildDependencyTreeRunner(fileMode: boolean = true) {
  const rootPath = process.env.REPOSITORY_PATH;
  if (!rootPath) {
    throw new Error("Invalid root path");
  }
  const allFolders = obtainFilePaths(rootPath, fileMode);
  for (const file of allFolders) {
    await initiateRepoDependencyTree([file], file.split(".")[0]);
  }
}
const folderRunner = async () => await buildDependencyTreeRunner(false);
const fileRunner = async () => await buildDependencyTreeRunner(true);

export const buildDependencyTreeAction = () => {
  const buildDependencyTreeActionOptions: { [key: string]: () => void } = {
    "--folder-only": folderRunner,
    "--file-only": fileRunner,
  } as const;

  const keys = Object.keys(buildDependencyTreeActionOptions);
  const options = process.argv.filter((arg) => keys.includes(arg));
  if (options.length > 1) {
    throw new Error("Invalid amount of options for this task");
  }
  buildDependencyTreeActionOptions[options[0]]();
};
