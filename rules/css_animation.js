var stylelint = require("stylelint");

var ruleName = "rules/animation";
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function(value) {
    return "Try not to use animation: " + value;
  }
});


module.exports = stylelint.createPlugin(ruleName, function(enabled) {
  if (!enabled) {
    return;
  }
  return function(root, result) {
    root.walkDecls(function(decl) {
      if (decl.prop === "animation" && !(decl.parent && decl.parent.parent && decl.parent.parent.params && decl.parent.parent.params.replaceAll(' ', '').includes('prefers-reduced-motion:no-preference'))){
        stylelint.utils.report({
          result,
          ruleName,
          message: messages.expected(decl.prop + ", " + decl.value),
          node: decl,
          word: decl.value
        });
      }
      if (decl.prop != "opacity" && decl.prop != "transform" && decl.parent && decl.parent.parent && decl.parent.parent.name == 'keyframes')
      stylelint.utils.report({
        result,
        ruleName,
        message: messages.expected(decl.prop + ", " + decl.value),
        node: decl,
        word: decl.value
      });
    });
  }
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;