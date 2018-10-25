# GitHub Action with GitHub API

A basic GitHub Action that demonstrates how to post a welcome comment on when a new issue is created. 

This is a good demonstration of how to use [GitHub Actions](https://github.com/features/actions), [Octokit Node.js](https://github.com/octokit/rest.js), and the [GitHub API](https://developer.github.com/v3/) to customize your GitHub repository's workflow.  

For it to use as a starting point to create your own GitHub Actions.

## How It Works

This GitHub Action runs when an [`issues` event webhook](https://developer.github.com/v3/activity/events/types/#issuesevent) is fired in your GitHub repo.  The action check to see if the event is an `opened` opened action and if so, post a comment to the issue thanking the user for their contribution.  

## Installation

To use this GitHub Action, you must have access to GitHub Actions.  GitHub Actions are currently only available in a private beta and only works in private repos.

1. Create a `.github/main.workflow` in your GitHub repo.
2. Add the following code to the `main.workflow` file and commit it to the repo's `master` branch.
```
workflow "Comment on New Issues" {
  resolves = ["AddComment"]
  on = "issues"
}

action "AddComment" {
  uses = "adamzolyak/actions_prappreciation@master"
  secrets = ["GITHUB_TOKEN"]
}
```
3. Create a new issue!  
4. Clock on the Actions tab in your repo.  You should see a new action that was recently triggered when you created the new issue.  After a few seconds, there should be a comment on your issue.

### Debugging
If you've followed the steps above and it isn't working, trying the following:
* If you don't see an Actions tab in your repo, make sure your repo is private and make sure you've been accepted into the private beta.
* If you see the Actions tab but there isn't a comment on your new issue, click on the Log link on the action to view the log and check for errors.


## Examples

Example of this action running on a new issue:
![GitHub Logo](/docs/action_example.png)

Example of the Actions tab show this action running:
![GitHub Logo](/docs/actions_tab.png)

Example og the log details from this action running:
![GitHub Logo](/docs/action_debug.png)

## Contributing

### Helpful Commands
Build
`docker build -t pr-appreciate .`

Test
`docker run pr-appreciate`

## License

[ISC](LICENSE) © 2018 TopIssueBot <adam@tinkurlab.com> (www.tinkurlab.com)