module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "linebreak-style": ["error", "windows"],
      "semi": ["error", "never"],
      "func-names": ["error", "never"],
      "comma-dangle": ["error", "never"],
      "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
      "array-callback-return": "off"
    },
    "env": {
      "browser": true,
      "node": true
    }
};