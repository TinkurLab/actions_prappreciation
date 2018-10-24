FROM node:8.12.0-slim

LABEL "com.github.actions.name"="PR Appreciation"
LABEL "com.github.actions.description"="Appreciate the person who created a new PR!"
LABEL "com.github.actions.icon"="thumbs-up"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/adamzolyak/actions-helloworld"
LABEL "homepage"="http://www.tinkurlab.com"
LABEL "maintainer"="Octocat <adam@tinkurlab.com>"

ADD entrypoint.sh /entrypoint.sh
ADD package.json /package.json
ADD index.js /index.js

RUN chmod +x entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]