import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const infoOfCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

let name = '';

input.addEventListener('input', debounce(inputNameCountry, DEBOUNCE_DELAY));

function inputNameCountry(e) {
  name = e.target.value.trim();
  infoOfCountry.innerHTML = '';
  countryList.innerHTML = '';

  if (name.length === 0) return;

  fetchCountries(name).then(countingTheNumberOfCountries).catch(showFetchError);
}

function countingTheNumberOfCountries(arr) {
  if (arr.length === 1) {
    renderCountryInfo(arr);
    console.log('Объект имеет длину равную 1');
  } else if (arr.length > 1 && arr.length <= 10) {
    renderCountriesList(arr);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function renderCountriesList(arr) {
  console.log(arr);
  const murkup = arr
    .map(el => {
      const { flags, name } = el;
      return `<li>
        <img src="${flags.svg}" alt="${flags.alt}" width="50">
        <p>${name.official}</p>
      </li>`;
    })
    .join('');
  countryList.innerHTML = murkup;
}

function renderCountryInfo(arr) {
  const [{ capital, flags, name, languages, population }] = arr;

  const murkup = `<div>
        <img src="${flags.svg}" alt="${flags.alt}" width="50">
        <p>${name.official}</p>
      </div>
      <p><b>Capital</b>: ${capital.join('')}</p>
      <p><b>Population</b>: ${population}</p>
      <p><b>Languages</b>: ${Object.values(languages).join(', ')}</p>
    </div>`;

  infoOfCountry.innerHTML = murkup;
}

function showFetchError(message) {
  Notiflix.Notify.failure(`${message}`);
}

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(responce => {
    if (!responce.ok) {
      console.log(responce);
      throw new Error('Oops, there is no country with that name.');
    }
    return responce.json();
  });
}
