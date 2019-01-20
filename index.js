'use strict';

// put your own value below!
const apiKey = '6mo434zMeIzOcOUBh60oitRycECxbx3mSxeTo9l9'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  let parks = responseJson.data;
  console.log(parks)
  $("#results-list").empty();
  $("#results").removeClass("hidden");
  for (let i = 0; i < parks.length; i++) {
    $("#results-list").append(`<li><h3>${parks[i].fullName}</h3><p>${parks[i].description}</p>
      <a href="${parks[i].url}">${parks[i].url}</a>
      </li>`)
  }
}

function getResults(query, limit=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = ($('#js-max-results').val() - 1);
    getResults(searchTerm, limit);
  });
}

$(watchForm);