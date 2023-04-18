const pathParamIDField = `
    <label for="schema">Value for ID</label>
    <input type="text" id="pathParam-id" name="pathParam-id" placeholder="{id}" required>
`;
const filterByRadio = `
    <fieldset required>
        <legend for="filter-by">Filter By:</legend>
        <div class="radio-button">
            <input type="radio" id="none-radio" name="filter-by" value="none" checked>
            <label for="none-radio">None</label>
        </div>              
        <div class="radio-button">
            <input type="radio" id="issuer-radio" name="filter-by" value="issuer">
            <label for="issuer-radio">Issuer</label>
        </div>
        <div class="radio-button">
            <input type="radio" id="subject-radio" name="filter-by" value="subject">
            <label for="subject-radio">Subject</label>
        </div>
        <div class="radio-button">
            <input type="radio" id="schema-radio" name="filter-by" value="schema">
            <label for="schema-radio">Schema</label>
        </div>
    </fieldset>
`;
const filterByID = `
    <label for="filter-id">ID of resource</label>
    <input type="text" id="filter-id" name="filter-id" placeholder="xxxxxxxxxxx" required>
`;
const endpoint = document.querySelector('#endpoint');
const method = document.querySelector('#method');
const queryParam = document.querySelector('#queryParam-container');
const queryParamID = document.querySelector('#queryParamID-container');
const pathParam = document.querySelector('#pathParam-container');

method.addEventListener('change', () => {

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
    };

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

    if (method.value === 'GET' && (endpoint.value === '/v1/credentials' || endpoint.value === '/v1/manifests')) {
        addQueryParamFieldsToForm();
    } else {
        removeQueryParamFieldsFromForm(); 
    }

})

endpoint.addEventListener('change', () => {
    if(endpoint.value.includes('{id}')) {
        pathParam.innerHTML = pathParamIDField;
    } else {
        pathParam.innerHTML = '';
    };

    method.value = '';
    queryParam.innerHTML = '';
    queryParamID.innerHTML = '';

    const getOption = document.querySelector('option[value="GET"]');
    const putOption = document.querySelector('option[value="PUT"]');
    const deleteOption = document.querySelector('option[value="DELETE"]');

    getOption.setAttribute('disabled', 'true');
    putOption.setAttribute('disabled', 'true');
    deleteOption.setAttribute('disabled', 'true');
    
    switch (endpoint.value) {
        case '/health':
            getOption.removeAttribute('disabled');
            break;
        case '/readiness':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/credentials':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');

            break;
        case '/v1/credentials/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/credentials/{id}/status':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');
            break;
        case '/v1/dids':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/dids/resolver/{id}':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/issuancetemplates':
            putOption.removeAttribute('disabled');
            break;
        case '/v1/issuancetemplates/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/keys':
            putOption.removeAttribute('disabled');
            break;
        case '/v1/keys/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/manifests':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');
            break;
        case '/v1/manifests/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/manifests/applications':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');
            break;
        case '/v1/manifests/applications/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/manifests/applications/{id}/review':
            putOption.removeAttribute('disabled');
            break;
        case '/v1/manifests/responses':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/manifests/responses/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/operations':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/operations/{id}':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/operations/cancel/{id}':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/presentations/definitions':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');
            break;
        case '/v1/presentations/definitions/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/presentations/submissions':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');
            break;
        case '/v1/presentations/submissions/{id}':
            getOption.removeAttribute('disabled');
            break;
        case '/v1/presentations/submissions/{id}/review':
            putOption.removeAttribute('disabled');
            break;
        case '/v1/schemas':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');
            break;
        case '/v1/schemas/{id}':
            getOption.removeAttribute('disabled');
            deleteOption.removeAttribute('disabled');
            break;
        case '/v1/webhooks':
            getOption.removeAttribute('disabled');
            putOption.removeAttribute('disabled');
            break;
        default:
            break;
    }  
});





