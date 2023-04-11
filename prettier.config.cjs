/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  pluginSearchDirs: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
