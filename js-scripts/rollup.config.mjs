import resolve from "@rollup/plugin-node-resolve";
import { globSync } from "glob";
import { fileURLToPath } from "node:url";
import path from "path";
import swc from "@rollup/plugin-swc";
import commonjs from "@rollup/plugin-commonjs";
export default {
  input: Object.fromEntries(
    globSync("src/**/*.ts").map((file) => [
      // This remove `src/` as well as the file extension from each
      // file, so e.g. src/nested/foo.js becomes nested/foo
      path.relative(
        "src",
        file.slice(0, file.length - path.extname(file).length)
      ),
      // This expands the relative paths to absolute paths, so e.g.
      // src/nested/foo becomes /project/src/nested/foo.js
      fileURLToPath(new URL(file, import.meta.url)),
    ])
  ),

  output: {
    dir: "output",
    format: "cjs",
    globals: { "dependency-cruiser": "dependency-cruiser" },
  },

  plugins: [
    resolve(),
    commonjs({
      //   dynamicRequireTargets: [
      //     // include using a glob pattern (either a string or an array of strings)
      //     "node_modules/dependency-cruiser/*.js",
      //   ],
      include: ["node_modules/dependency-cruiser"],
    }),
    swc(),
  ],
};
