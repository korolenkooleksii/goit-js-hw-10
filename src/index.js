import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const infoOfCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

// let nameCoumtry = undefined;

input.addEventListener('input', debounce(inputNameCountry, 300));

function inputNameCountry() {
  let name = '';
  name = input.value.trim();

  fetchCountries(name)
    .then(counties => {
      console.log(counties);
    })
    .catch(() =>
      Notiflix.Notify.failure('"Oops, there is no country with that name"')
    );
}

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2';

  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}
