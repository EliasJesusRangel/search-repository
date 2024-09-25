import fs from "fs";
export function readFile(filePath: string) {
  try {
    console.log("### READING FILE", filePath);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const fileExtension = filePath.split(".").pop();

    return {
      path: filePath,
      content: fileContent,
      fileExtension: fileExtension,
    };
  } catch (error) {
    console.error("Error reading file:", error);
    return null; // Or throw an error if you prefer
  }
}
