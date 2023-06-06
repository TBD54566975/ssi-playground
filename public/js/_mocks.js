export const getMocks = () => {
    const { issuerDID, issuerKID, subjectDID, schemaID } = sessionStorage;

    let mockCredentialRequest = {
        "issuer": issuerDID,
        "subject": subjectDID,
        "data": {
            "firstName": "Test",
            "lastName": "Subject"
        },
        "issuerKid": `#${issuerKID}`,
        "revocable": true
    }

    let mockCredentialStatusRequest = {
        "revoked": true
    }

    let mockManifestRequest = {
        "name": "Test Manifest",
        "description": "Test manifest for demonstration purposes",
        "format": {
            "jwt": {
                "alg":[
                    "EdDSA"
                ]
            }
        },
        "issuerDid": issuerDID,
        "issuerKid": `#${issuerKID}`,
        "outputDescriptors": {
            "id": "TestManifest1",
            "schema": schemaID
        }
    }

    let mockSchemaRequest = {
        "author": issuerDID,
        "name": "Test Schema2",
        "schema": {
            "firstName": {
            "type": "string"
            },
            "lastName": {
            "type": "string"
            }
        },
        "authorKid": `#${issuerKID}`,
        "sign": true
    }

    return {
        'Mock Credential Request': mockCredentialRequest,
        'Mock Credential Status Request': mockCredentialStatusRequest,
        'Mock Manifest Request': mockManifestRequest,
        'Mock Schema Request': mockSchemaRequest
    }
};
