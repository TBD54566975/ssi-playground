const form = document.querySelector('form');
const output = document.querySelector('#output');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let endpointSelection = document.querySelector('#endpoint').value;
  const methodSelection = document.querySelector('#method').value;
  const bodySelection = document.querySelector('#body').value;

  const pathParamSelection = document.querySelector('#pathParam-id')?.value;

  if (endpointSelection.includes('{id}') && pathParamSelection) {
      endpointSelection.replace('{id}', pathParamSelection);
  }

  const queryParamSelection = document.querySelector('input[name="filter-by"]:checked')?.value;

  if (queryParamSelection && queryParamSelection !== 'none') {
    const queryParamValue = document.querySelector('#filter-id').value;
    endpointSelection += `?${queryParamSelection}=${queryParamValue}`;
  }

  fetch(`${endpointSelection}`, {
    methodSelection,
    headers: {
      'Content-Type': 'application/json'
    },
    bodySelection
  })
    .then((response) => response.json())
    .then((text) => {
      output.textContent = JSON.stringify(text, null, 4);
    })
    .catch((error) => {
      console.error(error);
      output.textContent = `An error occurred.\n\n${error}`;
    });
});

const resetButton = document.querySelector('#reset-button');

resetButton.addEventListener('click', () => {
  form.reset();
  queryParam.innerHTML = '';
  queryParamID.innerHTML = '';
  pathParam.innerHTML = '';
  output.textContent = '';
})