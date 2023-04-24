# SSI Playground

The SSI Playground is meant to help orient new faces into the SSI ecosystem. 

## Introduction

It relies on the [SSI Service](https://github.com/TBD54566975/ssi-service), so make sure to get that project pulled down and running locally. 

Once you've followed the steps to get SSI Service running locally, you can run this playground.

## Getting Started

Use `npm start` to start running the playground locally. 

## Add mock payload templates

To add a mock payload template that you can populate in the body field before sending a request:
1. Export it as an object in `./public/js/_mocks.js`
2. Add it to the imports at the top of `./public/js/changeForm.js`. Eg:
```
import {
    mockCredentialRequest,
    mockManifestRequest,
    mockSchemaRequest,
    myNewMockTemplate
} from "./_mocks.js";
```
3. Add a label for the new mock template to the `mockTemplates` object at the top of `./public/js/changeForm.js`. If the mock template is for an endpoint with an existing template already, simply add its label to the array. If not, create a new key-value pair whose value is an array containing your mock template's label. Eg:
```
const mockTemplates = {
    '/v1/credentials': [
        'Mock Credential Request'
    ],
    '/v1/manifests': [
        'Mock Manifest Request'
    ],
    '/v1/schemas': [
        'Mock Schema Request',
        'My New Mock Template Request'
    ],
    // or
    '/v1/some_endpoint': [
        'My New Mock Template Request'
    ]
}
```
4. Add a new mapping to the `mockPayloads` object at the top of `./public/js/changeForm.js`. Eg:
```
const mockPayloads = {
    'Mock Credential Request': mockCredentialRequest,
    'Mock Manifest Request': mockManifestRequest,
    'Mock Schema Request': mockSchemaRequest,
    'My New Mock Template Request': myNewMockTemplate
}
```


## Project Lead Instructions - TODO

Orient users to the project here. This is a good place to start with an assumption
that the user knows very little - so start with the Big Picture and show how this
project fits into it. It may be good to reference/link the broader architecture in the
`collaboration` repo or the developer site here.

Then maybe a dive into what this project does.

Diagrams and other visuals are helpful here. Perhaps code snippets showing usage.

Project leads should complete, alongside this `README`:
* [CODEOWNERS](./CODEOWNERS) - set project lead(s)
* [CONTRIBUTING.md](./CONTRIBUTING.md) - Fill out how to: install prereqs, build, test, run, access CI, chat, discuss, file issues

The other files in this template repo may be used as-is:
* [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
* [GOVERNANCE.md](./GOVERNANCE.md)
* [LICENSE](./LICENSE)

## Project Resources

| Resource                                   | Description                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                   |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues     |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                             |
| [LICENSE](./LICENSE)                       | Apache License, Version 2.0                                                    |