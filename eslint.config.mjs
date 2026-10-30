import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-plugin-react auto-detection uses deprecated ESLint 10 APIs.
    // Provide version explicitly to work around this.
    settings: { react: { version: "19" } },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Playwright output (traces of local runs).
    "test-results/**",
    "playwright-report/**",
  ]),
]);

export default eslintConfig;
