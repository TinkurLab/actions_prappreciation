console.log("started nodejs...")

const octokit = require('@octokit/rest')()

console.log(process.env.GITHUB_TOKEN)

octokit.authenticate({
    type: 'app',
    token: process.env.GITHUB_TOKEN
})

//const eventOwnerAndRepo = process.env.GITHUB_REPOSITORY	
const eventOwnerAndRepo = "adamzolyak/actions-helloworld"
const slicePos = eventOwnerAndRepo.indexOf("/");
const eventOwner = eventOwnerAndRepo.slice(0, slicePos);
const eventRepo = eventOwnerAndRepo.slice(slicePos + 1, eventOwnerAndRepo.length);

console.log("Owner: " + eventOwner)
console.log("Repo: " + eventRepo)


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

    //const eventPRNumber = eventJSON.number
    const eventPRNumber = "2"

    console.log("PR Title: " + eventJSON.pull_request.title)
    console.log("PR Number: " + eventPRNumber)

    /*
    octokit.pullRequests.update({
        owner: eventOwner,
        repo: eventRepo,
        number: eventPRNumber,
        title: "I changed your title.  Haha!"
    }).then(({ data, headers, status }) => {
        console.log(data)
    })
    */

   octokit.pullRequests.get({
    owner: eventOwner,
    repo: eventRepo,
    number: eventPRNumber
}).then(({ data, headers, status }) => {
    console.log(data)
})
}

updatePRTitle()