/**
 * @fileoverview Rule to disallow resizing image
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
             description: "disallow resizing image",
             recommended: true,
            // url: "https://eslint.org/docs/rules/no-extra-semi"
         },
         fixable: "code",
         schema: [] // no options
     },
     create: function(context) {
         return {
            // StyleTag: function (node) {
            //     console.log("IN", node);
            // },
            Tag: function(node) {
                    if (node.name != "img") {return;}
                    node.attributes.forEach(function(attr) {
                        if (!attr.key || ! attr.value) {return;}
                        if (attr.key.value != "style") {return;}
                        if (!attr.value.value.includes("height") || !attr.value.value.includes("width")) {return;}
                        context.report({node:node, message: "avoid resizing image in the client side"});
                    })
                        
                }
         };
     }
 };