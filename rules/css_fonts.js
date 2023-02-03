const stylelint = require("stylelint");

const ruleName = "rules/nonstandardfonts";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function(value) {
    return "Nonstandard fonts used: " + value;
  }
});

const basicSystemFontStacks = [
  "-apple-system", 
  "BlinkMacSystemFont", 
  "avenir next", 
  "avenir", 
  "segoe ui", 
  "helvetica neue", 
  "helvetica", 
  "Cantarell", 
  "Ubuntu", 
  "roboto", 
  "noto", 
  "arial", 
  "sans-serif",

  "Iowan Old Style", 
  "Apple Garamond", 
  "Baskerville", 
  "Times New Roman", 
  "Droid Serif", 
  "Times", 
  "Source Serif Pro", 
  "serif", 
  "Apple Color Emoji", 
  "Segoe UI Emoji", 
  "Segoe UI Symbol",

  "Menlo", 
  "Consolas", 
  "Monaco",
  "Liberation Mono", 
  "Lucida Console", 
  "monospace"
]

module.exports = stylelint.createPlugin(ruleName, function(enabled) {
  if (!enabled) {
    return;
  }
  return function(root, result) {
    root.walkDecls(function(decl) {
      
      if (decl.prop !== "font-family") {return;}
      let count = 0;
      let fontList = "";
      let fonts = decl.value.split(", ");
      fonts.forEach(function(font) {
        if (basicSystemFontStacks.includes(font)) {return;}
        count++;
        fontList += ", " + font;
      })

        stylelint.utils.report({
          result,
          ruleName,
          message: messages.expected(count + fontList),
          node: decl,
          word: decl.value
        });
    });
  }
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
