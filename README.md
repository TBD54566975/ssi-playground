# SSI Playground

The SSI Playground is meant to help orient new faces into the SSI ecosystem. 

## Introduction

The SSI Playground is meant to help orient new faces into the SSI ecosystem. It consumes the [SSI Service](https://github.com/TBD54566975/ssi-service). 

The only pre-requisite is you need to have Docker [installed](https://docs.docker.com/get-docker/).

## Getting Started

Use `npm start` to start running the playground locally. 

Open your browser to [http://localhost:8081](http://localhost:8081).

### Cleanup 
Use `npm run cleanup` to remove the SSI Service Docker container. Test data is stored in session storage. It's a good idea to end a browser sesssion before running `npm run cleanup`.

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


## Project Resources

| Resource                                   | Description                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                   |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues     |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                             |
| [LICENSE](./LICENSE)                       | Apache License, Version 2.0                                                    |