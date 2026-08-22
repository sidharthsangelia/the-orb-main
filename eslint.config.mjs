import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

/*
 * Flat config, replacing the old .eslintrc. Next 16 removed `next lint`, which
 * is what used to run ESLint in legacy-config mode on this project's behalf;
 * ESLint 9 defaults to flat config, so the config has to live here now.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "lib/generated/**",
      "sanity.types.ts",
      "schema.json",
    ],
  },
  ...nextCoreWebVitals,
];

export default config;
