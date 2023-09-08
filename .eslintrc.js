module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
