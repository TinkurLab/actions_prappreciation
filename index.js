console.log("started nodejs...")

const octokit = require('@octokit/rest')()

const ownerAndRepo = process.env.GITHUB_REPOSITORY	
const slicePos = ownerAndRepo.indexOf("/");
const owner = ownerAndRepo.slice(0, slicePos);
const repo = ownerAndRepo.slice(slicePos + 1, ownerAndRepo.length);

console.log("Owner: " + owner)
console.log("Repo: " + repo)


const fs = require('fs')

function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
    })
  }
  

async function updatePRTitle() {

    eventData = await readFilePromise('../github/workflow/event.json')
    eventJSON = JSON.parse(eventData) 
    console.log(eventJSON)

    console.log("PR Title: " + eventJSON.title)
    console.log("PR Number: " + eventJSON.number)

    const prNumber = eventJSON.number

    octokit.pullRequests.update({
        owner: owner,
        repo: repo,
        number: prNumber,
        title: "I changed your title.  Haha!"
    }).then(({ data, headers, status }) => {
        console.log(data)
    })
}

updatePRTitle()