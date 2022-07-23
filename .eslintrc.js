/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sort/recommended",
    "prettier",
  ],
  ignorePatterns: ["node_modules**", ".tmp/**"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "sort", "json-format", "prettier"],
  root: true,
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "lf",
        printWidth: 80,
        quoteProps: "consistent",
        semi: true,
        trailingComma: "all",
      },
    ],
    "sort/type-properties": "error",
  },
};
