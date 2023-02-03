/**
 * This script reads all the result files from the linters and aggregates the 
 * pertinent data in one unique result file for easier export of the static 
 * analysis results.
 */

const fs = require('fs').promises;

async function main() {
    await readJSResult();
    await readCSSResult();
    console.log("warnings : ", warningsArray.length)
    await fs.writeFile(finalFileName + ".json", JSON.stringify(warningsArray));
}

async function readCSSResult() {
    let jsonDataCSS;
    try {
        const dataCSS = await fs.readFile(cssFileName + '.json', 'utf8');
        jsonDataCSS = JSON.parse(dataCSS);

        for (const obj of jsonDataCSS) {
            for (const war of obj.warnings) {
                warningsArray.push(
                    new StaticAnalysisWarning(obj.source, war.line, war.text, war.rule)
                );
            }
        }
        console.log("readCSS");
    } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('Could not read CSS : file not found :', cssFileName + '.json');
        } else {
          throw err;
        }
    }
}

async function readJSResult() {
    let jsonDataJS;
    try {
        const dataJS = await fs.readFile(jsFileName + '.json', 'utf8');
        jsonDataJS = JSON.parse(dataJS);

        for (const obj of jsonDataJS) {
            for (const mess of obj.messages) {
                warningsArray.push(
                    new StaticAnalysisWarning(obj.filePath, mess.line, mess.message, mess.ruleId)
                );
            }
        }
        console.log("readJS");
    } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('Could not read JS : file not found :', jsFileName + '.json');
        } else {
          throw err;
        }
    }
}

class StaticAnalysisWarning {
    constructor(file, line, message, ruleId) {
        this.file = file;
        this.line = line;
        this.message = message;
        this.ruleId = ruleId;
    }
}

const id = process.argv[2];
console.log("id : ", id)

const jsFileName = '/tmp/static_result_js_' + id;
const cssFileName = '/tmp/static_result_css_' + id;
const finalFileName = "/tmp/static_analysis_aggregation_" + id;
// environment variables :
// const varEnv = process.env.PROPERTY
const warningsArray = [];

main();
