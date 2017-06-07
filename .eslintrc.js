module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "impliedStrict": true,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "parser": "babel-eslint",
  "rules": {
    "semi": 2,
    "strict": 0,
    "eqeqeq": [2, "smart"],
    "quotes": [2, "single"],
    "comma-dangle": ["error", "always-multiline"],
    "no-unused-vars": 1,
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "plugins": [
    "react",
  ],
};
