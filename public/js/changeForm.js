import {
    mockCredentialRequest,
    mockManifestRequest,
    mockSchemaRequest
} from "./_mocks.js";

const mockTemplates = {
    '/v1/credentials': [
        'Mock Credential Request'
    ],
    '/v1/manifests': [
        'Mock Manifest Request'
    ],
    '/v1/schemas': [
        'Mock Schema Request'
    ],
}

const mockPayloads = {
    'Mock Credential Request': mockCredentialRequest,
    'Mock Manifest Request': mockManifestRequest,
    'Mock Schema Request': mockSchemaRequest
}

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

const templates = `
    <label for="template">Populate payload from template</label>
    <div class="select-area">
        <select id="template" name="template"></select>
    </div>
`;

const body = `
    <label for="body">Body:</label>
    <textarea id="body" name="body"></textarea>
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

const setTemplateInBodyField = (event) => {
    const mockValue = JSON.stringify(mockPayloads[event.target.value] || "", null, 4);
    document.querySelector("#body").value = mockValue;
}


//Endpoint
endpoint.addEventListener('change', () => {
    if (document.querySelector('#method-get-radio').checked) {
        if (endpoint.value === '/v1/credentials' || endpoint.value === '/v1/manifests') {
            addQueryParamFieldsToForm();
        } else {
            removeQueryParamFieldsFromForm(); 
        }
    }

    if (document.querySelector('#method-put-radio').checked) {
        if (mockTemplates[endpoint.value]) {
            document.querySelector('#template-container').innerHTML = templates;
            const templateOptions = mockTemplates[endpoint.value]
                .map(template => `<option value="${template}">${template.trim()}</option>`)
                .join('');
            document.querySelector('#template').innerHTML = defaultOption + templateOptions;
        } else {
            document.querySelector('#template-container').innerHTML = "";
        }
    }

    if(endpoint.value.includes('{id}')) {
        pathParam.innerHTML = pathParamIDField;
    } else {
        pathParam.innerHTML = '';
    };

    if (document.querySelector('#body')) {
        document.querySelector('#body').value = "";
    }
});

// Method
method.addEventListener('change', (e) => {
    if (e.target.value === 'PUT') {
        document.querySelector('#body-container').innerHTML = body;
        document.querySelector("#template-container").addEventListener('change', setTemplateInBodyField);
    }  else {
        document.querySelector("#template-container").removeEventListener('change', setTemplateInBodyField);
        document.querySelector('#template-container').innerHTML = ""; 
        document.querySelector('#body-container').innerHTML = "";
    }
    removeQueryParamFieldsFromForm(); 
    pathParam.innerHTML = "";
})



