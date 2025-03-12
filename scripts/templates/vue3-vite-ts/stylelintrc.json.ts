export default (): string => {
  return `{
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-recess-order",
    "stylelint-config-css-modules"
  ],
  "rules": {
    "string-quotes": "single",
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": null,
    "max-nesting-depth": 4
  }
}`;
};
