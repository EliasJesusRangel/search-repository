import buildDependencyTree from "./builders/dependency-tree";

export enum ACTION_KEY {
  buildDependencyTree = "Building Dependency Tree",
}
export const PROCEDURES: {
  [key: ACTION_KEY[number]]: { fn: () => void; label: string };
} = {
  buildDependencyTree: {
    fn: buildDependencyTree,
    label: ACTION_KEY.buildDependencyTree,
  },
} as const;
