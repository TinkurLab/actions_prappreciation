console.log("started...")

const octokit = require('@octokit/rest')()

var tools = require('./github/workflow/event.json');

console.log("GITHUB_ACTION")
console.log(process.env.GITHUB_ACTION)
console.log()

console.log("GITHUB_SHA")
console.log(process.env.GITHUB_SHA)
console.log()

console.log("GITHUB_REF")
console.log(process.env.GITHUB_REF)
console.log()

console.log("GITHUB_EVENT_PAYLOAD")
console.log(process.env.GITHUB_EVENT_PAYLOAD)
console.log()