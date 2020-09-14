module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['warn', 'as-needed'],
    'no-underscore-dangle': 'off',
    'operator-linebreak': ['warn', 'after']
  }
};
