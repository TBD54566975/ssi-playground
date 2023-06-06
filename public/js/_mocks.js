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
        "issuerKid": issuerKID,
        "revocable": true
    }

    let mockCredentialStatusRequest = {
        "revoked": true
    }

    let mockKYCManifestRequest = {
        "issuerDid":issuerDID,
        "issuerKid": issuerKID,
        "issuerName":"Issuer Name Lol",
        "format":{
          "jwt":{
            "alg":[
              "EdDSA"
            ]
          }
        },
        "outputDescriptors":[
          {
            "id":"kyc_credential",
            "schema":schemaID
          }
        ],
        "presentationDefinition":{
          "id":"32f54163-7166-48f1-93d8-ff217bdb0653",
          "name":"KYC Requirements",
          "purpose":"TBD",
          "format":{
            "jwt":{
              "alg":[
                "EdDSA"
              ]
            }
          },
          "input_descriptors":[
            {
              "id":"kyc1",
              "name":"Personal Info",
              "constraints":{
                "subject_is_issuer":"required",
                "fields":[
                  {
                    "id":"givenName",
                    "path":[
                      "$.vc.credentialSubject.givenName"
                    ],
                    "filter":{
                      "type":"string",
                      "pattern":"[a-zA-Z \\-\\.].+"
                    }
                  },
                  {
                    "id":"additionalName",
                    "path":[
                      "$.vc.credentialSubject.additionalName"
                    ],
                    "filter":{
                      "type":"string",
                      "pattern":"[a-zA-Z \\-\\.].+"
                    }
                  },
                  {
                    "id":"familyName",
                    "path":[
                      "$.vc.credentialSubject.familyName"
                    ],
                    "filter":{
                      "type":"string",
                      "pattern":"[a-zA-Z \\-\\.].+"
                    }
                  },
                  {
                    "id":"birthDate",
                    "path":[
                      "$.vc.credentialSubject.birthDate"
                    ],
                    "filter":{
                      "type":"string",
                      "format":"date"
                    }
                  },
                  {
                    "id":"taxID",
                    "path":[
                      "$.vc.credentialSubject.taxID"
                    ],
                    "filter":{
                      "type":"string"
                    }
                  },
                  {
                    "id":"postalAddress",
                    "path":[
                      "$.vc.credentialSubject.postalAddress"
                    ],
                    "filter":{
                      "type":"object",
                      "properties":{
                        "addressCountry":{
                          "type":"string"
                        },
                        "addressLocality":{
                          "type":"string"
                        },
                        "addressRegion":{
                          "type":"string"
                        },
                        "postalCode":{
                          "type":"string"
                        },
                        "streetAddress":{
                          "type":"string"
                        }
                      },
                      "required":[
                        "addressCountry",
                        "addressLocality",
                        "addressRegion",
                        "postalCode",
                        "streetAddress"
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }


    let vciaManifestRequest = {
        "name":"Identity Assurance Credential Application",
        "description":"This application is for an identity Assurance credential, which may be used to prove your identity.",
        "issuerDid":"did:web:tbd.website",
        "issuerKid":"did:web:tbd.website#owner",
        "issuerName":"TBD",
        "format":{
           "jwt":{
              "alg":[
                 "EdDSA"
              ]
           }
        },
        "outputDescriptors":[
           {
              "id":"vcia_descriptor",
              "schema":"https://tbd.website/schema/IdentityAssuranceSchema",
              "name":"A credential with identity assurance evidence",
              "description":"A longer description on what this is",
              "styles":{
                 "background":{
                    "color":"#ffec1c"
                 },
                 "text":{
                    "color":"#000000"
                 }
              },
              "display":{
                 "title":{
                    "path":[
                       "$.credentialSubject.given_name",
                       "$.vc.credentialSubject.given_name"
                    ],
                    "schema":{
                       "type":"string"
                    }
                 },
                 "subtitle":{
                    "path":[
                       "$.credentialSubject.family_name",
                       "$.vc.credentialSubject.family_name"
                    ],
                    "schema":{
                       "type":"string"
                    }
                 },
                 "description":{
                    "path":[
                       "$.credentialSubject.description",
                       "$.vc.credentialSubject.description"
                    ],
                    "schema":{
                       "type":"string"
                    }
                 },
                 "properties":[
                    {
                       "path":[
                          "$.issuanceDate",
                          "$.vc.issuanceDate"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"Award Date"
                    },
                    {
                       "path":[
                          "$.expirationDate",
                          "$.vc.expirationDate"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"Expiry Date"
                    },
                    {
                       "path":[
                          "$.credentialSubject.birthdate",
                          "$.vc.credentialSubject.birthdate"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"Birthdate"
                    },
                    {
                       "path":[
                          "$.credentialSubject.personal_identifiers.identifier",
                          "$.credentialSubject.vc.personal_identifiers.identifier"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"Personal Identifier"
                    },
                    {
                       "path":[
                          "$.credentialSubject.address.street_address",
                          "$.credentialSubject.vc.address.street_address"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"Street Address"
                    },
                    {
                       "path":[
                          "$.credentialSubject.address.locality",
                          "$.credentialSubject.vc.address.street_address"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"City"
                    },
                    {
                       "path":[
                          "$.credentialSubject.address.region",
                          "$.credentialSubject.address.region"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"State"
                    },
                    {
                       "path":[
                          "$.credentialSubject.address.country",
                          "$.credentialSubject.vc.address.country"
                       ],
                       "schema":{
                          "type":"string"
                       },
                       "label":"Country"
                    }
                 ]
              }
           }
        ]
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
        "issuerKid": issuerKID,
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
        "authorKid": issuerKID,
        "sign": true
    }

    let mockKYCSchemaRequest = {
        "author":issuerDID,
        "name":"KYC",
        "schema":{
          "$id":"kyc-schema-1.0",
          "$schema":"https://json-schema.org/draft/2020-12/schema",
          "description":"KYC Schema",
          "type":"object",
          "properties":{
            "id":{
              "type":"string"
            },
            "givenName":{
              "type":"string"
            },
            "additionalName":{
              "type":"string"
            },
            "familyName":{
              "type":"string"
            },
            "birthDate":{
              "type":"string"
            },
            "postalAddress":{
              "type":"object",
              "properties":{
                "addressCountry":{
                  "type":"string"
                },
                "addressLocality":{
                  "type":"string"
                },
                "addressRegion":{
                  "type":"string"
                },
                "postalCode":{
                  "type":"string"
                },
                "streetAddress":{
                  "type":"string"
                }
              }
            },
            "taxID":{
              "type":"string"
            }
          },
          "required":[
      
          ],
          "additionalProperties":false
        },
        "sign":false
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
        'Mock Credential Status Request': mockCredentialStatusRequest,
        'Mock Manifest Request': mockManifestRequest,
        'Mock KYC Manifest Request': mockKYCManifestRequest,
        'Mock VCIA Manifest Request': vciaManifestRequest,
        'Mock Schema Request': mockSchemaRequest,
        'Mock KYC Schema Request': mockKYCSchemaRequest,
        'Mock DID:Key Request': mockDIDKey,
        'Mock DID:Web Request': mockDIDWeb,
        'Mock Credential Webhook Request': mockCredentialWebhookRequest,
        'Mock DID Webhook Request': mockDIDWebhookRequest
    }
};
