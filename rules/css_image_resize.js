var stylelint = require("stylelint");

var ruleName = "rules/resize";
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function (value) {
    return "Try not to resize with: " + value;
  },
});

module.exports = stylelint.createPlugin(ruleName, function (enabled) {
  if (!enabled) {
    return;
  }
  return function (root, result) {
    root.walkDecls(function (decl) {
      if (decl.parent.selector !== "img") {return;}
      if (decl.prop === "height" || decl.prop === "width") {
        stylelint.utils.report({
          result,
          ruleName,
          message: messages.expected(decl.prop + ", " + decl.value),
          node: decl,
          word: decl.value,
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
