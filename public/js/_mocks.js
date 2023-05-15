export const getMocks = () => {
    const { issuerDID, issuerKID, subjectDID, schemaID } = sessionStorage;

    let mockDIDKey = {
        "keyType": "Ed25519",
    }

    let mockDIDWeb = {
        "keyType": "Ed25519",
        "options": {
            "didWebId": "did:web:tbd.website"
        }
    }

    let mockCredentialRequest = {
        "issuer": issuerDID,
        "subject": subjectDID,
        "data": {
            "firstName": "Test",
            "lastName": "Subject"
        },
        "issuerKid": `#${issuerKID}`
    }

    let mockManifestRequest = {
        "name": "Test Manifest",
        "description": "Test manifest for demonstration purposes",
        "format": {
            "jwt": {
                "alg": [
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

    let mockCredentialWebhookRequest = {
        "noun": "Credential",
        "verb": "Create",
        "url": "http://host.docker.internal:8081/webhook"
    }

    let mockDIDWebhookRequest = {
        "noun": "DID",
        "verb": "Create",
        "url": "http://host.docker.internal:8081/webhook"
    }

    return {
        'Mock Credential Request': mockCredentialRequest,
        'Mock Manifest Request': mockManifestRequest,
        'Mock Schema Request': mockSchemaRequest,
        'Mock DID:Key Request': mockDIDKey,
        'Mock DID:Web Request': mockDIDWeb,
        'Mock Credential Webhook Request': mockCredentialWebhookRequest,
        'Mock DID Webhook Request': mockDIDWebhookRequest
    }
};