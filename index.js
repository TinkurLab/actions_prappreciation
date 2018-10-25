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
  

async function updatePRTitle() {

    eventData = await readFilePromise('../github/workflow/event.json')
    eventJSON = JSON.parse(eventData) 

    const eventPRNumber = eventJSON.number
    let eventPRTitle = eventJSON.pull_request.title
    const eventPRBody = eventJSON.pull_request.body

    const regex1 = / \[📝\d* of \d*]/g
    let rexexResults = regex1.exec(eventPRTitle)

    if (rexexResults) {
        let eventPRTitle = eventPRTitle.slice(0, rexexResults.index)
        console.log("existing to dos in PR title; cleaning")
    } else {
        console.log("no to dos in PR title; NOT cleaning")
    }

    const prTotalToDos = countToDos(eventPRBody)
    const prDoneToDos = countToDosDone(eventPRBody)

    if (prTotalToDos > 0) {
        let newPRTitle = `${cleanedPRTitle} [📝 ${prDoneToDos} of ${prTotalToDos}]`

        octokit.pullRequests.update({
            owner: eventOwner,
            repo: eventRepo,
            number: eventPRNumber,
            title: newPRTitle
        }).then(({ data, headers, status }) => {
            console.log(data)
        })

        console.log("PR title updated with to dos")
    } else {
        console.log("PR title NOT updated with to dos")
    }
    
}

function countToDos(string) {
    const regex2 = /- \[( |x)\] /g
    let found = string.match(regex2)
    
    if(found) {
        return found.length
    } else {
        return 0
    }   
}

function countToDosDone(string) {
    const regex2 = /- \[x\] /g
    let found = string.match(regex2)
    
    if(found) {
        return found.length
    } else {
        return 0
    }   
}

updatePRTitle()