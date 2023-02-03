/**
 * @fileoverview Rule to disallow nested loops
 * @author CleanIT
 */

 "use strict";

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
 /** @type {import('eslint').Rule.RuleModule} */


 
 function calculateNestedLoop(node) {
    //if (node.body.length == 0) {return;}
    // console.log("iter")
    let maxChildCount = 0;
    var body = [];
    //BLOCK STATEMENT
    if ("body" in node && !Array.isArray(node.body)) {body = node.body.body}
    //IF STATEMENT
    else if ("consequent" in node && node.consequent.type == "BlockStatement") {body = node.consequent.body}
    //FOR, WHILE STATEMENT
    else if ("body" in node && Array.isArray(node.body)) {body = node.body}

    for ( var i = 0; i < body.length;i++) {
        if (body[i].type == 'WhileStatement' || body[i].type == 'ForStatement') {
            let childCount = calculateNestedLoop(body[i])
            if (childCount > maxChildCount) {maxChildCount = childCount}
        } else  if (body[i].type == 'IfStatement') {
            let childCount = calculateNestedLoop(body[i])
            if (childCount > maxChildCount) {maxChildCount = childCount - 1}
        }
    }
    
    return 1 + maxChildCount;
 }

 module.exports = {
     meta: {
         type: "problem",
 
         docs: {
             description: "disallow nested loops",
             recommended: true,
            // url: "https://eslint.org/docs/rules/no-extra-semi"
         },
         fixable: "code",
         schema: [] // no options
     },
     create: function(context) {
         return {
                WhileStatement: function(node) {
                    let max = calculateNestedLoop(node);
                    if (max >= 3){
                        context.report({node: node, message: 'Nested loops : ' + max})
                    }
                },

                ForStatement: function(node) {
                    let max = calculateNestedLoop(node);
                    if (max >= 3){
                        context.report({node: node, message: 'Nested loops : ' + max})
                    }
                }
         };
     }
 };
