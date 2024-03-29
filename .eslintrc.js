module.exports = {
  extends: ['airbnb-base', 'prettier'],
  ignorePatterns: ['templates'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
