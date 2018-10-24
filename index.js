console.log("started nodejs...")

const octokit = require('@octokit/rest')()

const ownerAndRepo = process.env.GITHUB_REPOSITORY	
const slicePos = ownerAndRepo.indexOf("/");
const owner = ownerAndRepo.slice(0, slicePos);
const repo = ownerAndRepo.slice(slicePos + 1, ownerAndRepo.length);

const fs = require('fs')
const filePath = '../github/workflow/event.json';
fs.readFile(filePath, "utf8", function(error, data) {
    if (error) {
      console.error("read error:  " + error.message);
    } else {
        updatePRTitle(data)
    }
});

function updatePRTitle(event) {

    console.log(event.title)
    console.log(event.number)

    const prNumber = event.number

    octokit.pullRequests.update({
        owner: owner,
        repo: repo,
        number: prNumber
    }).then(({ data, headers, status }) => {
        console.log(data)
    })
}