# cit-analysis-eslint
a repository containing our static rules for code analysis

aggregate_results.js script looks for the result files for each linter:
    '/tmp/static_result_js_<id>.json'
    '/tmp/static_result_css_<id>.json'
The final file is exported as '/tmp/static_analysis_aggregation_<id>.json'

Set up :
    npm install

Generic example for json export :
    eslint <target> --rulesdir <rulesDirectory> -f json > <resultPath>.json
    npx stylelint <target> -f json > <resultPath>.json
    node aggregate_results.js <id>

Specific command to test export :
    eslint ./test/*.js --rulesdir rules -f json > /tmp/static_result_js_1.json
    npx stylelint ./test/*.css -f json > /tmp/static_result_css_1.json
    node aggregate_results.js 1

then check your /tmp/ directory for the '/tmp/static_analysis_aggregation_1.json'



    



   

Create package.json and init the project with npm:

    npm init

Installing eslint globally in the root of the project:

    npm install -g eslint
Create eslint config files:

    eslint --init

Run eslint rules
    eslint . --rulesdir rules

Installing stylint
    https://stylelint.io/user-guide/get-started/
    
Installing postcss-html:
    npm install postcss-html --save-dev

Executing stylint
    npx stylelint "**/*[.css, .html]
 

Creating a custom rule
    https://www.codementor.io/@rudolfolah/stylelint-rules-how-to-write-your-own-rules-hhmwikafq



Autres sites utiles:
    https://astexplorer.net/
    
CSSAst Structure
    https://postcss.org/api/#declaration