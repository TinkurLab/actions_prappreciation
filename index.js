console.log("started nodejs...")

const octokit = require('@octokit/rest')()

octokit.authenticate({
    type: 'app',
    token: process.env.GITHUB_TOKEN
})

const eventOwnerAndRepo = process.env.GITHUB_REPOSITORY	
const slicePos = eventOwnerAndRepo.indexOf("/");
const eventOwner = eventOwnerAndRepo.slice(0, slicePos);
const eventRepo = eventOwnerAndRepo.slice(slicePos + 1, eventOwnerAndRepo.length);

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
    const eventPRBody = eventJSON.pull_request.body

    let prTotalToDos = countToDos(eventPRBody)
    let prDoneToDos = countToDosDone(eventPRBody)
    let prPercentToDosComplete = ((prDoneToDos / prTotalToDos).toPrecision(2) * 100) + "%"

    let newPRTitle = `📝 ${prDoneToDos} of ${prTotalToDos} tasks complete (${prPercentToDosComplete})`

    octokit.pullRequests.update({
        owner: eventOwner,
        repo: eventRepo,
        number: eventPRNumber,
        title: newPRTitle
    }).then(({ data, headers, status }) => {
        console.log(data)
    })
}

function countToDos(string) {
    var i = 0
    var myRe = /- \[( |x)\] /g

    var str = string
    var myArray;
    while ((myArray = myRe.exec(str)) !== null) {
        i++
    }

    return i
}

function countToDosDone(string) {
    var i = 0
    var myRe = /- \[x\] /g

    var str = string
    var myArray;
    while ((myArray = myRe.exec(str)) !== null) {
        i++
    }

    return i
}

updatePRTitle()