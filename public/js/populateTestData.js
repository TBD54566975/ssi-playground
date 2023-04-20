const didsContainer = document.querySelector('#dids-container');

const fetchDID = async () => {
    const response = await fetch('/v1/dids/key', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        keyType: 'Ed25519' 
      })
    });
  
    return await response.json();
};

const fetchSchemaID = async () => {
  const issuerDid = sessionStorage.getItem("issuerDID");
  const issuerKid = issuerDid.slice('did:key:'.length);

  const response = await fetch('/v1/schemas', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
    })
  });

  return await response.json();
};

const displayDIDs = async () => {
    try {
      if (!sessionStorage.getItem('issuerDID')) {
        const issuer = await fetchDID();
        sessionStorage.setItem('issuerDID', issuer.did.id);
      }

      if (!sessionStorage.getItem('subjectDID')) {
        const subject = await fetchDID();
        sessionStorage.setItem('subjectDID', subject.did.id);
      }

      if (!sessionStorage.getItem('schemaID')) {
        const schema = await fetchSchemaID();
        sessionStorage.setItem('schemaID', schema.id);
      }
  
      didsContainer.innerHTML = `
        <div class="note-key-value">
          <p class="note-key">Test Issuer</p> 
          <p class="note-value">${sessionStorage.getItem('issuerDID')}</p>
        </div>
        <div class="note-key-value">
          <p class="note-key">Test Holder</p> 
          <p class="note-value">${sessionStorage.getItem('subjectDID')}</p>
        </div>
        <div class="note-key-value">
          <p class="note-key">Test Schema</p> 
          <p class="note-value">${sessionStorage.getItem('schemaID')}</p>
        </div>
      `;
    } catch (error) {
      console.error(error);
      didsContainer.innerHTML = '<p>Failed to load test data.</p>';
    }
};

displayDIDs();