const issuerDid = sessionStorage.getItem("issuerDID");
const issuerKid = issuerDid?.slice('did:key:'.length);
const subjectDid = sessionStorage.getItem("subjectDID");
const schemaId = sessionStorage.getItem("schemaID");

export const mockCredentialRequest = {
    "issuer": issuerDid,
    "subject": subjectDid,
    "data": {
        "firstName": "Test",
        "lastName": "Subject"
    },
    "issuerKid": `#${issuerKid}`
}

export const mockManifestRequest = {
    "name": "Test Manifest",
    "description": "Test manifest for demonstration purposes",
    "format": {
        "jwt": {
            "alg":[
                "EdDSA"
            ]
        }
    },
    "issuerDid": issuerDid,
    "issuerKid": `#${issuerKid}`,
    "outputDescriptors": {
        "id": "TestManifest1",
        "schema": schemaId
    }
}

export const mockSchemaRequest = {
    "author": issuerDid,
    "name": "Test Schema2",
    "schema": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        }
    },
    "authorKid": `#${issuerKid}`,
    "sign": true
}