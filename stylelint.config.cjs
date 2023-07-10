module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-standard'],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
};
