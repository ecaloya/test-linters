module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  //extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    nested_loop: "warn",
    canvas: "warn",
    if_return: "warn",
    cache_variable: "warn",
    html_image_resize: "warn",
  },
  plugins: ["@html-eslint","css"],
  overrides: [
    {
      files: ["*.html", "*.css"],
      parser: "@html-eslint/parser",
      extends: ["plugin:css/recommended"],
    },
  ],
};
