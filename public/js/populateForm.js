const defaultOption = `<option value="" disabled selected>Select one</option>`

//Endpoints
const getOptions = [
    '/health',
    '/readiness',
    '/v1/credentials',
    '/v1/credentials/{id}',
    '/v1/credentials/{id}/status',
    '/v1/dids',
    '/v1/dids/key',
    '/v1/dids/web',
    // '/v1/dids/ion',
    '/v1/dids/key/{id}',
    '/v1/dids/web/{id}',
    // '/v1/dids/ion/{id}',
    '/v1/dids/resolver/{id}',
    '/v1/issuancetemplates/{id}',
    '/v1/keys/{id}',
    '/v1/manifests',
    '/v1/manifests/{id}',
    '/v1/manifests/applications/{id}',
    '/v1/manifests/responses',
    '/v1/manifests/responses/{id}',
    '/v1/operations/{id}',
    '/v1/operations/cancel/{id}',
    '/v1/presentations/definitions',
    '/v1/presentations/definitions/{id}',
    '/v1/presentations/submissions',
    '/v1/presentations/submissions/{id}',
    '/v1/schemas',
    '/v1/schemas/{id}',
    '/v1/webhooks'
];

const putOptions = [
    '/v1/credentials',
    '/v1/credentials/{id}/status',
    '/v1/dids/key',
    '/v1/dids/web',
    '/v1/dids/ion',
    '/v1/issuancetemplates',
    '/v1/keys',
    '/v1/manifests',
    '/v1/manifests/applications',
    '/v1/manifests/applications/{id}/review',
    '/v1/presentations/definitions',
    '/v1/presentations/submissions',
    '/v1/presentations/submissions/{id}/review',
    '/v1/schemas',
    // '/v1/webhooks'
];

const deleteOptions = [
    '/v1/credentials/{id}',
    '/v1/dids/key/{id}',
    '/v1/dids/web/{id}',
    '/v1/dids/ion/{id}',
    '/v1/issuancetemplates/{id}',
    '/v1/keys/{id}',
    '/v1/manifests/{id}',
    '/v1/manifests/applications/{id}',
    '/v1/manifests/responses/{id}',
    '/v1/presentations/definitions/{id}',
    '/v1/schemas/{id}'
];

const populateEndpoints = () => {
    let availableEndpoints = getOptions;
    if (document.querySelector('#method-put-radio').checked) {
        availableEndpoints = putOptions;
    } else if (document.querySelector('#method-delete-radio').checked) {
        availableEndpoints = deleteOptions;
    }
    const endpointOptions = availableEndpoints
        .map(endpoint => `<option value="${endpoint}">${endpoint.trim()}</option>`)
        .join('');
    document.querySelector('#endpoint').innerHTML = defaultOption + endpointOptions;
};

//Icons
const setLinkIcons = () => {
    const linkIcon = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 8V0H10V2H14V4H12V6H10V8H8V10H6V12H8V10H10V8H12V6H14V4H16V8H18ZM8 2H0V18H16V10H14V16H2V4H8V2Z" fill="currentColor"/>
        </svg>
    `
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
        const spanElement = document.createElement('span');
        spanElement.innerHTML = linkIcon;
        a.appendChild(spanElement);
    });
}

const setSelectIcons = () => {
    const selectIcon = `
        <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.57143 10H0V11.5H1.57143V13H3.14286V14.5H4.71429V16H6.28571V14.5H7.85714V13H9.42857V11.5H11V10H9.42857V11.5H7.85714V13H6.28571V14.5H4.71429V13H3.14286V11.5H1.57143V10Z" fill="currentColor"/>
        <path d="M9.42857 6L11 6L11 4.5L9.42857 4.5L9.42857 3L7.85714 3L7.85714 1.5L6.28571 1.5L6.28571 -4.12136e-07L4.71429 -5.49515e-07L4.71429 1.5L3.14286 1.5L3.14286 3L1.57143 3L1.57143 4.5L3.69553e-07 4.5L2.38419e-07 6L1.57143 6L1.57143 4.5L3.14286 4.5L3.14286 3L4.71429 3L4.71429 1.5L6.28571 1.5L6.28571 3L7.85714 3L7.85714 4.5L9.42857 4.5L9.42857 6Z" fill="white"/>
        </svg>
    `
    document.querySelectorAll('div.select-area').forEach(selectArea => {
        const spanElement = document.createElement('span');
        spanElement.innerHTML = selectIcon;
        selectArea.appendChild(spanElement);
    });
}

//Populate form and add event listener
setLinkIcons();
setSelectIcons();
populateEndpoints();

method.addEventListener('change', () => {
    populateEndpoints();
});
