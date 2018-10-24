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

const fs1 = require('fs');
const testFolder1 = '../';
fs1.readdir(testFolder1, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

const fs2 = require('fs');
const testFolder2 = '../../';
fs2.readdir(testFolder2, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

const fs3 = require('fs');
const testFolder3 = '../workspace/';
fs3.readdir(testFolder3, (err, files) => {
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