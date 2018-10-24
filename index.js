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

const fs = require('fs');

const testFolder = '../';
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

const testFolder = '../../';
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

const testFolder = '../workspace/';
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

/*
const testFile = '../github/workflow/event.json';

fs.readFile(testFile, "utf8", function(error, data) {
    if (error) {
      console.error("read error:  " + error.message);
    } else {
      console.log(data);
    }
});
*/