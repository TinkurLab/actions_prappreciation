console.log("started nodejs...")

const octokit = require('@octokit/rest')()

console.log("GITHUB_ACTION")
console.log(process.env.GITHUB_ACTION)
console.log()

console.log("GITHUB_SHA")
console.log(process.env.GITHUB_SHA)
console.log()

console.log("GITHUB_REF")
console.log(process.env.GITHUB_REF)
console.log()

console.log("GITHUB_EVENT_PATH")
console.log(process.env.GITHUB_EVENT_PATH)
console.log()

const fs1 = require('fs');
const testFolder1 = '../github/workflow/';
fs3.readdir(testFolder3, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

const fs2 = require('fs');
const testFile1 = '../github/workflow/event.json';
fs2.readFile(testFile1, "utf8", function(error, data) {
    if (error) {
      console.error("read error:  " + error.message);
    } else {
      console.log(data);
    }
});