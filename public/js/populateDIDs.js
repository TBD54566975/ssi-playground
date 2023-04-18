const didsContainer = document.querySelector('#dids-container');

const fetchDID = async () => {
    const response = await fetch('/v1/dids/key', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyType: 'Ed25519' })
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
  
      didsContainer.innerHTML = `
        <p class="note-xs">Test Issuer</p> 
        <p class="note-sm">${sessionStorage.getItem('issuerDID')}</p>
        <p class="note-xs">Test Holder</p> 
        <p class="note-sm">${sessionStorage.getItem('subjectDID')}</p>
      `;
    } catch (error) {
      console.error(error);
      didsContainer.innerHTML = '<p>Failed to load DIDs.</p>';
    }
};

displayDIDs();