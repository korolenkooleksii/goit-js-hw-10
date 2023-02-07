export default function getRefs() {
  return {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    infoOfCountry: document.querySelector('.country-info'),
  };
}
