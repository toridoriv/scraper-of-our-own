/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:sort/recommended", "prettier"],
  ignorePatterns: ["node_modules**", ".tmp/**"],
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/recommended"],
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-var-requires": "warn",
      },
    },
    {
      files: ["*.mjs", "rollup.config.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["sort", "json-format", "prettier"],
  root: true,
  rules: {
    "no-empty": "warn",
    "no-unused-vars": "warn",
    "no-var": "warn",
    "prettier/prettier": [
      "error",
      {
        bracketSpacing: true,
        endOfLine: "lf",
        printWidth: 80,
        quoteProps: "consistent",
        semi: true,
        trailingComma: "es5",
      },
    ],
    "sort/type-properties": "error",
  },
};
