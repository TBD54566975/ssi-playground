# Contribution Guide

This repo acts as an interactive playground for the reference implementation of the Self Sovereign Identity (SSI) specification. Before getting started, we highly recommend that you familiarize yourself with the [SSI Service repo](https://github.com/tbd54566975/ssi-service/). 

Given that we're still in early stages of development, this contribution guide will certainly change, which means things will be a bit ragtag but there's still plenty of opportunities for contribution.

As we continue to iterate over this playground, we'll be creating more focused issues with the following labels:
- `bug`
- `documentation`
- `good first issue`
- `help wanted`

These issues are excellent candidates for contribution and we'd be thrilled to get all the help we can get! You can take a look at all of the Issues that match the labels above [here](https://github.com/TBD54566975/ssi-playground/issues?q=is%3Aopen+label%3A%22help+wanted%22%2C%22good+first+issue%22%2C%22documentation%22%2C%22bug%22+)

We suggest the following process when picking up one of these issues:
- Check to see if anyone is already working on the issue by looking to see if the issue has a `WIP` tag. 
- Fork the repo and create a branch named the issue number you're taking on
- Push that branch and create a draft PR
- paste a link to the draft PR in the issue you're tackling
- We'll add the `WIP` tag for you
- work away. Feel free to ask any/all questions that crop up along the way
- Switch the draft PR to "Ready for review"
## Development
### Prerequisites

| Requirement | Tested Version | Installation Instructions |
| ----------- | -------------- | ------------------------- |
| `Node.js`   | `v19.4.0`     | [Installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
| `Docker`   | `v20.10.24`     | [Installation](https://docs.docker.com/get-docker/)
| `Docker Compose`   | `v2.17.2`   | [Installation](https://docker-docs.uclv.cu/compose/install/)

### Running tests
As it's still early, this repo is still in need of some unit tests. This might be a good first issue to tackle!

In the meantime, feel free to functionally test any changes you make and make note of how you tested these changes in your PR description.

### Code Style
As it's still early, this repo is still in need of some linting rules. This might be a good first issue to tackle!

Some general guidelines to follow: 
* Use clear naming conventions
* Follow DRY principles
* Keep good separation of concerns

### Code Guidelines
1. A `TODO` in comment must always link to a GitHub issue.

### Available NPM Commands
| command                           | description                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm start` or `npm run start`               | starts up the SSI Service locally from the [SSI Service docker image](https://ghcr.io/tbd54566975/ssi-service:main)                                                                                 |
| `npm run cleanup`            | stops the SSI service and removes containers   