import { ACTION_KEY } from "../constants";
import { Procedure } from "../types";
import {
  buildDependencyTreeAction,
  buildDependencyTreeRunner,
} from "./dependency-tree-runners/dependency-tree-runner";
import {
  searchRepositoryAction,
  searchRepositoryRunner,
} from "./search-runner";

export const PROCEDURES: {
  [key: string]: Procedure;
} = {
  [ACTION_KEY.buildDependencyTree]: {
    fn: buildDependencyTreeAction,
    runner: buildDependencyTreeRunner,
    label: ACTION_KEY.buildDependencyTree,
  },
  [ACTION_KEY.searchRepository]: {
    fn: searchRepositoryAction,
    runner: searchRepositoryRunner,
    label: ACTION_KEY.searchRepository,
  },
} as const;

export function run(action: string) {
  console.log("### Runner starting...", action);
  const proc = PROCEDURES[ACTION_KEY[action]];
  proc.runner();
}
