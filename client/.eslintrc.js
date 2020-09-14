module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/essential', '@vue/airbnb'],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-restricted-globals': 'off',
    'no-alert': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 0,
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['warn', 'as-needed'],
    'no-underscore-dangle': 'off'
  }
};
