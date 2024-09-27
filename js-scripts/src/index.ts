import { ACTION_KEY } from "./constants";
import { config } from "dotenv";
import { run } from "./runners";

function main() {
  const action = process.argv.find((value: string, index, obj) =>
    Object.keys(ACTION_KEY).includes(value)
  );

  if (!action || action === "") {
    console.log(
      "### NO action defined, please type one of the following after the script name"
    );
    return;
  }

  console.log("### Beginning utility...\n", `action: ${action}`);

  try {
    console.log(
      `### Performing actions with config\n\n${JSON.stringify(
        process.env.REPOSITORY_PATH,
        null,
        2
      )}`
    );
    run(action);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

config();
main();
