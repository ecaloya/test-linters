/**
 * @fileoverview Rule to disallow nested for
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */

var toCheck = {};
function checkCacheVariable(node) {
  if (node.callee.name != "$") {return;}
  var key = node.arguments[0].value;
  if (!(key in toCheck)) {toCheck[key] = 1}
  else {
    toCheck[key]++;
  }
    // console.log(toCheck);
    if (toCheck[key] > 1)
    return toCheck[key];
}


module.exports = {
  meta: {
    type: "problem",

    docs: {
      description: "multiple selectors",
      recommended: true,
      // url: "https://eslint.org/docs/rules/no-extra-semi"
    },
    fixable: "code",
    schema: [], // no options
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        let result =  checkCacheVariable(node);
        if (result > 1) 
        context.report({node:node, message: node.arguments[0].value 
            + ' is repeated a ' + result + ' time' });
      },
    };
  },
};
