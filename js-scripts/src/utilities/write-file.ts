import fs, { existsSync } from "fs";
import path from "path";
export function writeFile(
  fp: string,
  content: string,
  options: fs.WriteFileOptions = {},
  prefix?: string
) {
  const filePath = prefix
    ? path.join(
        fp.slice(0, fp.lastIndexOf("/")),
        prefix,
        fp.slice(fp.lastIndexOf("/"), fp.length)
      )
    : fp;
  try {
    console.log("### WRITING FILE", filePath);
    const mightHaveInvalidFolder = existsSync(filePath);

    if (!mightHaveInvalidFolder) {
      console.log("### INVALID PATHS, RECURSIVELY CREATING");
      fs.mkdirSync(filePath.slice(0, filePath.lastIndexOf("/")), {
        recursive: true,
      });
    }
    const fileContent = fs.writeFileSync(filePath, content, options);
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
