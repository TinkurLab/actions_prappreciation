console.log("started nodejs...")

const octokit = require('@octokit/rest')()

const ownerAndRepo = process.env.GITHUB_REPOSITORY	
const slicePos = ownerAndRepo.indexOf("/");
const owner = ownerAndRepo.slice(0, slicePos);
const repo = ownerAndRepo.slice(slicePos + 1, ownerAndRepo.length);

/*
const fs = require('fs')
const filePath = '../github/workflow/event.json';
fs.readFile(filePath, "utf8", function(error, data) {
    if (error) {
      console.error("read error:  " + error.message);
    } else {
        console.log(data)
    }
});
*/


function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
    })
  }
  
readFilePromise('../github/workflow/event.json')
    .then(data => updatePRTitle(event))
    .catch(e => console.log(e))

function updatePRTitle(event) {

    console.log(event.title)
    console.log(event.number)

    const prNumber = event.number

    octokit.pullRequests.update({
        owner: owner,
        repo: repo,
        number: prNumber,
        title: "I changed your title.  Haha!"
    }).then(({ data, headers, status }) => {
        console.log(data)
    })
}