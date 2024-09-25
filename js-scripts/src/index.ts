import { PROCEDURES } from "./constants";
import { config } from "dotenv";

function main(action) {
  if (!action) {
    console.log(
      "### NO action defined, please type one of the following after the script name",
      JSON.stringify(PROCEDURES, null, 2)
    );
    return;
  }

  console.log("### Beginnning search utility...");
  try {
    const procedure = PROCEDURES[action];
    console.log(
      `### Performing actions ${
        procedure.label
      } with config\n\n${JSON.stringify(process.env.REPOSITORY_PATH, null, 2)}`
    );
    try {
      procedure.fn();
    } catch (err) {
      console.log(`### Error performing action ${procedure.label}\n\n${err}`);
    }
  } catch (error) {
    console.error("Error in main:", error);
  }
}

config();
main(process.argv[2] ?? null);
