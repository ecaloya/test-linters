/**
 * @fileoverview Rule to disallow nested for
 * @author Nicholas C. Zakas
 */

 "use strict";

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
 /** @type {import('eslint').Rule.RuleModule} */

 
 function checkIfBody(node) {
    var body = [];
    if (node.consequent && !Array.isArray(node.consequent.body)) {return node.consequent.type != 'ExpressionStatement'}
    // Is BlockStatement
    var body = node.consequent.body;
    for (var i = 0; i < body.length; i++) {
        if (body[i].type == 'ForStatement' || body[i].type == 'IfStatement' || body[i].type == 'WhileStatement'){
            return true;
        }
    }
    return false;
 }
 
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
                IfStatement: function(node) {
                    if (checkIfBody(node)) {
                        context.report({node:node, message: "If body can be simpler"});
                    }
                }
         };
     }
 };