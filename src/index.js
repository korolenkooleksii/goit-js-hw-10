import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import getRefs from './refs';
import API from './fetchCountries';

const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener(
  'input',
  debounce(inputNameCountry, DEBOUNCE_DELAY)
);

function inputNameCountry(e) {
  let name = '';
  name = e.target.value.trim();
  refs.infoOfCountry.innerHTML = '';
  refs.countryList.innerHTML = '';

  if (name.length === 0) return;

  API.fetchCountries(name)
    .then(countingTheNumberOfCountries)
    .catch(showFetchError);
}

function countingTheNumberOfCountries(arr) {
  if (arr.length === 1) {
    renderCountryInfo(arr);
  } else if (arr.length > 1 && arr.length <= 10) {
    renderCountriesList(arr);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function renderCountriesList(arr) {
  refs.infoOfCountry.innerHTML = '';

  const murkup = arr
    .map(el => {
      const { flags, name } = el;
      return `<li>
        <img src="${flags.svg}" alt="${flags.alt}" width="50">
        <p>${name.official}</p>
      </li>`;
    })
    .join('');
  refs.countryList.innerHTML = murkup;
}

function renderCountryInfo(arr) {
  refs.countryList.innerHTML = '';

  const [{ capital, flags, name, languages, population }] = arr;

  const murkup = `<div>
        <img src="${flags.svg}" alt="${flags.alt}" width="50">
        <p>${name.official}</p>
      </div>
      <p><b>Capital</b>: ${capital.join('')}</p>
      <p><b>Population</b>: ${population}</p>
      <p><b>Languages</b>: ${Object.values(languages).join(', ')}</p>
    </div>`;

  refs.infoOfCountry.innerHTML = murkup;
}

function showFetchError(message) {
  Notiflix.Notify.failure(`${message}`);
}
