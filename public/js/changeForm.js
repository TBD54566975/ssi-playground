const pathParamIDField = `
    <label for="schema">Value for ID</label>
    <input type="text" id="pathParam-id" name="pathParam-id" placeholder="{id}" required autocomplete="off">
`;
const filterByRadio = `
    <fieldset required>
        <legend for="filter-by">Filter By:</legend>
        <div class="radio-button">
            <input type="radio" id="none-radio" name="filter-by" value="none" checked autocomplete="off">
            <label for="none-radio">None</label>
        </div>              
        <div class="radio-button">
            <input type="radio" id="issuer-radio" name="filter-by" value="issuer" autocomplete="off">
            <label for="issuer-radio">Issuer</label>
        </div>
        <div class="radio-button">
            <input type="radio" id="subject-radio" name="filter-by" value="subject" autocomplete="off">
            <label for="subject-radio">Subject</label>
        </div>
        <div class="radio-button">
            <input type="radio" id="schema-radio" name="filter-by" value="schema" autocomplete="off">
            <label for="schema-radio">Schema</label>
        </div>
    </fieldset>
`;
const filterByID = `
    <label for="filter-id">ID of resource</label>
    <input type="text" id="filter-id" name="filter-id" placeholder="xxxxxxxxxxx" required autocomplete="off">
`;
const endpoint = document.querySelector('#endpoint');
const method = document.querySelector('#method');
const queryParam = document.querySelector('#queryParam-container');
const queryParamID = document.querySelector('#queryParamID-container');
const pathParam = document.querySelector('#pathParam-container');

const onFilterByChange = (event) => {
    const selectedFilterBy = event.target.value;
    if (selectedFilterBy === 'none') {
        queryParamID.innerHTML = '';
    } else {
        queryParamID.innerHTML = filterByID;
        const queryParamLabel = document.querySelector('label[for="filter-id"]');
        if (selectedFilterBy === 'issuer') {
            queryParamLabel.textContent = "Issuer ID";
        } else if (selectedFilterBy === 'subject') {
            queryParamLabel.textContent = "Subject ID";
        } else if (selectedFilterBy === 'schema') {
            queryParamLabel.textContent = "Schema ID";
        }
    }
}

const addQueryParamFieldsToForm = () => {
    queryParam.innerHTML = filterByRadio;
    const filterByRadios = document.querySelectorAll('input[name="filter-by"]');

    filterByRadios.forEach(radio => {
        radio.removeEventListener('change', onFilterByChange);
        radio.addEventListener('change', onFilterByChange);
    });
}

const removeQueryParamFieldsFromForm = () => {
    const filterByRadios = document.querySelectorAll('input[name="filter-by"]');

    if (filterByRadios.length) {
        filterByRadios.forEach(radio => {
            radio.removeEventListener('change', onFilterByChange);
        });
    }
    queryParam.innerHTML = '';
    queryParamID.innerHTML = '';
}

endpoint.addEventListener('change', (e) => {

    if (document.querySelector('#method-get-radio').checked) {
        if (endpoint.value === '/v1/credentials' || endpoint.value === '/v1/manifests') {
            addQueryParamFieldsToForm();
        } else {
            removeQueryParamFieldsFromForm(); 
        }
    }

    if(endpoint.value.includes('{id}')) {
        pathParam.innerHTML = pathParamIDField;
    } else {
        pathParam.innerHTML = '';
    };

    let availableTemplates = [];
    switch (endpoint.value) {
        case '/v1/credentials':
            availableTemplates = [
                'Mock Credential Request'
            ];
            break;
        case '/v1/manifests':
            availableTemplates = [
                'Mock Manifest Request'
            ];
            break;
        case '/v1/schemas':
            availableTemplates = [
                'Mock Schema Request'
            ];
            break;
        default:
            break;
    } 
    populateTemplates(availableTemplates);

    if (document.querySelector('#body')) {
        document.querySelector('#body').value = '';
    }
});


//Templates
const issuerDid = sessionStorage.getItem("issuerDID");
const issuerKid = issuerDid.slice('did:key:'.length);
const subjectDid = sessionStorage.getItem("subjectDID");
const schemaId = sessionStorage.getItem("schemaID");

const mockCredentialRequest = {
    "issuer": issuerDid,
    "subject": subjectDid,
    "data": {
        "firstName": "Test",
        "lastName": "Subject"
    },
    "issuerKid": `#${issuerKid}`
}

const mockSchemaRequest = {
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

const mockManifestRequest = {
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

// Method
const body = `
<label for="body">Body:</label>
<textarea id="body" name="body"></textarea>
`;
const templates = `
    <label for="template">Populate payload from template</label>
    <div class="select-area">
        <select id="template" name="template"></select>
    </div>
`;

const populateTemplates = (availableTemplates) => {
    const templateOptions = availableTemplates
        .map(template => `<option value="${template}">${template.trim()}</option>`)
        .join('');
    document.querySelector('#template').innerHTML = defaultOption + templateOptions;
}

method.addEventListener('change', (e) => {
    const onMethodChange = (event) => {
        {
            let mockValue = "";
            switch (event.target.value) {
                case 'Mock Credential Request':
                    mockValue = JSON.stringify(mockCredentialRequest, null, 4);
                    break;
                case 'Mock Manifest Request':
                    mockValue = JSON.stringify(mockManifestRequest, null, 4);
                    break;
                case 'Mock Schema Request':
                    mockValue = JSON.stringify(mockSchemaRequest, null, 4);
                    break;
                default:
                    break;
            }
            document.querySelector("#body").value = mockValue;
        }
    }
    if (e.target.value === 'PUT') {
        let availableTemplates = [];
        document.querySelector('#template-container').innerHTML = templates;
        populateTemplates(availableTemplates);
        document.querySelector('#body-container').innerHTML = body;
        document.querySelector("#template").addEventListener('change', onMethodChange);
    }  else {
        if (document.querySelector('#template')) {
            document.querySelector('#template').innerHTML = "";
            document.querySelector("#template").removeEventListener('change', onMethodChange);
            document.querySelector('#template-container').innerHTML = ''; 
        }
        document.querySelector('#body-container').innerHTML = '';
    }
    removeQueryParamFieldsFromForm(); 
    pathParam.innerHTML = "";
})



