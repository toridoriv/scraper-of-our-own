import shebang from "rollup-plugin-add-shebang";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const { bin, main, module, typings } = require("./package.json");
const binFile = Object.values(bin)[0];

/** @type {import("rollup-plugin-esbuild").Options} */
const esbuildConfig = {
  exclude: [/\.test.ts?$/, /node_modules/],
  target: "node18",
  tsconfig: "./tsconfig.json",
};

const binBundle = {
  input: "src/cli/index.ts",
  output: {
    file: binFile,
    format: "cjs",
    sourcemap: false,
  },
  plugins: [esbuild(esbuildConfig), shebang({ include: binFile })],
};

const libBundle = {
  input: "src/lib/index.ts",
  output: [
    {
      file: main,
      format: "cjs",
      sourcemap: false,
    },
    {
      file: module,
      format: "esm",
      sourcemap: false,
    },
  ],
  plugins: [esbuild(esbuildConfig)],
};

const typingsBundle = {
  input: "src/lib/index.ts",
  output: {
    file: typings,
    format: "esm",
    sourcemap: false,
  },
  plugins: [dts()],
};

export default [binBundle, libBundle, typingsBundle];
