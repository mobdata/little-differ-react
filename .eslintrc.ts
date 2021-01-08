{
  "parser": "@typescript-eslint/parser",
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "document": true,
    "window": true,
    "fetch": true
  },
  "rules": {
    "import/no-extraneous-dependencies": [0, { "devDependencies": ["modules/*", "components/*"] }],
    "import/no-unresolved": [0, { "devDependencies": ["modules/*", "components/*"] }],
    "import/extensions": [0, { "devDependencies": ["modules/*", "components/*"] }],
    "no-multi-spaces": [2, { "exceptions": { "VariableDeclarator": true }}],
    "no-prototype-builtins": [0],
    "no-undef": [0],
    "no-unused-vars": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"]}],
    "semi": [0],
    "no-console": [0],
    "react/no-unescaped-entities": [0],
    "object-curly-newline": [0],
    "camelcase": [0],
    "react/jsx-curly-brace-presence": [0],
    "react/jsx-one-expression-per-line": [0],
    "react/jsx-wrap-multilines": [0],
    "no-else-return": [0],
    "jsx-quotes": [0],
    "no-use-before-define": "off"




  }
}
