/**
 * @fileoverview Rule to disallow nested for
 * @author Nicholas C. Zakas
 */

 "use strict";

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
 /** @type {import('eslint').Rule.RuleModule} */

 
 module.exports = {
     meta: {
         type: "problem",
 
         docs: {
             description: "disallow canvas tag",
             recommended: true,
            // url: "https://eslint.org/docs/rules/no-extra-semi"
         },
         fixable: "code",
         schema: [] // no options
     },
     create: function(context) {
         return {
                Tag: function(node) {
                    if (node.name == "canvas") {
                        context.report({node:node, message: "canvas tag"});
                    }
                }
         };
     }
 };