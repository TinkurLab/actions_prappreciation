console.log("started nodejs...")

const octokit = require('@octokit/rest')()

octokit.authenticate({
    type: 'app',
    token: process.env.GITHUB_TOKEN
})

const eventOwnerAndRepo = process.env.GITHUB_REPOSITORY	
const slicePos1 = eventOwnerAndRepo.indexOf("/");
const eventOwner = eventOwnerAndRepo.slice(0, slicePos1);
const eventRepo = eventOwnerAndRepo.slice(slicePos1 + 1, eventOwnerAndRepo.length);

const fs = require('fs')

function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
        })
    })
}
  
async function commentOnNewIssue() {

    eventData = await readFilePromise('../github/workflow/event.json')
    eventJSON = JSON.parse(eventData) 

    eventAction = eventJSON.action
    eventIssueNumber = eventJSON.issue.number

    if (eventJSON.eventAction === 'opened') {
        console.log("issue - opened event")

        octokit.issues.createComment({
          owner: eventOwner,
          repo: eventRepo,
          number: eventIssueNumber,
          body: 'Thanks for opening a new issue!'
        }).then(({ data, headers, status }) => {
          // handle data
        })
    }


    console.log(eventJSON)
}

commentOnNewIssue()