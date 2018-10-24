console.log("started nodejs...")

const octokit = require('@octokit/rest')()

const ownerAndRepo = process.env.GITHUB_REPOSITORY	
const slicePos = ownerAndRepo.indexOf("/");
const owner = ownerAndRepo.slice(0, slicePos);
const repo = ownerAndRepo.slice(slicePos + 1, ownerAndRepo.length);


const fs = require('fs')

function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
    })
  }
  
readFilePromise('../github/workflow/event.json')
    .then(data => console.log(data))
    .catch(e => console.log(e))

function updatePRTitle(data) {

    console.log(data.title)
    console.log(data.number)

    const prNumber = data.number

    octokit.pullRequests.update({
        owner: owner,
        repo: repo,
        number: prNumber,
        title: "I changed your title.  Haha!"
    }).then(({ data, headers, status }) => {
        console.log(data)
    })
}