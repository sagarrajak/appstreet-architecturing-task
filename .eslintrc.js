module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-param-reassign": 0,
    "brace-style": 0,
    "linebreak-style": 0,
    "no-unused-vars": 0,
    "arrow-body-style": 0,
    "import/no-unresolved": 0,
  },
};
