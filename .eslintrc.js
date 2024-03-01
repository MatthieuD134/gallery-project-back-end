module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-sonarjs',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:eslint-comments/recommended",
    "plugin:sonarjs/recommended",
  ],
  overrides:[
    {
      files: ["test/**", "*.test.ts", "*.spec.ts"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
    },
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "eslint-comments/no-unused-disable": "error",
  },
  settings: {
    ["import/parsers"]: { "@typescript-eslint/parser": [".ts", ".tsx"] },
    ["import/resolver"]: {
        node: {
            extensions: [".ts"],
        },
    },
  },
};
