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

const testFolder = './';
const testFile = '../github/workflow/event.json';
const fs = require('fs');

console.log("Folder Contents: ")

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

console.log("File Contents: ")

fs.readFile(testFile, "utf8", function(error, data) {
    if (error) {
      console.error("read error:  " + error.message);
    } else {
      console.log(data);
    }
});