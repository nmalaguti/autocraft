import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "no-useless-assignment": "error",
      "no-self-compare": "error",
      "prefer-arrow-callback": "error",
      "no-var": "error",
      "no-shadow": "error",
      "no-multi-assign": "error",
      "no-labels": "error",
      "no-implicit-coercion": "error",
      eqeqeq: "error",
      "no-array-constructor": "error",
      curly: ["error", "multi-line"],
      "func-style": "error",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        { allowString: false, allowNullableBoolean: true, allowNumber: false },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
    },
  },
);
