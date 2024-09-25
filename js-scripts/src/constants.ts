import buildDependencyTree from "./builders/dependency-tree";
import { fileRunner } from "./runners/dependency-tree-runners/file-runner";
import { folderRunner } from "./runners/dependency-tree-runners/folder-runner";

export interface Procedure {
  fn: { (): void; name: string };
  label: string;
}
export enum ACTION_KEY {
  buildDependencyTree = "Building Dependency Tree",
}

const buildDependencyTreeAction = () => {
  const buildDependencyTreeActionOptions: { [key: string]: () => void } = {
    "--folder-only": folderRunner,
    "--file-only": fileRunner,
  } as const;
  const keys = Object.keys(buildDependencyTreeActionOptions);
  const options = process.argv.filter((arg) => keys.includes(arg));
  if (options.length > 1) {
    throw new Error("Invalid amount of options for this task");
  }
  console.log(
    "### EXECUTING",
    buildDependencyTreeActionOptions[options[0]].name
  );
  buildDependencyTreeActionOptions[options[0]]();
};

export const PROCEDURES: {
  [key: ACTION_KEY[number]]: Procedure;
} = {
  buildDependencyTree: {
    fn: buildDependencyTreeAction,
    label: ACTION_KEY.buildDependencyTree,
  },
} as const;
