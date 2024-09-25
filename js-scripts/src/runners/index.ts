import { Procedure } from "../constants";

export function orchestrate(procedure: Procedure) {
  console.log("### Orchestrator performing action", procedure.fn.name);
  try {
    procedure.fn();
  } catch (err) {
    console.log(`### Error performing action ${procedure.label}\n\n${err}`);
  }
}
