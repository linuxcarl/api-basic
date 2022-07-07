module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'airbnb-typescript',
  ],
  env: {
    "es6": true,
    "node": true,
    "jest": true
  },
  rules: {
    "no-console": "warn"
  }
};
