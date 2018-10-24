console.log("started nodejs...")

const octokit = require('@octokit/rest')()

console.log("GITHUB_ACTION")
console.log(process.env.GITHUB_ACTION)
console.log()

console.log("GITHUB_SHA")
console.log(process.env.GITHUB_SHA)
console.log()

async function readFile(filePath) {
    const fs = require('fs');

    await fs.readFile(filePath, "utf8", function(error, data) {
        if (error) {
        console.error("read error:  " + error.message);
        } else {
        return data;
        }
    });

    return data;
}

const eventJSON = readFile('../github/workflow/event.json')

console.log(eventJSON)