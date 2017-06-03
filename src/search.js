import fetch from 'node-fetch';
import unique from 'make-unique';

const apiKey = process.env.ALEXA_APP_IATA_CODES_API_KEY;

export default (query) => {
  const url = `http://iatacodes.org/api/v6/autocomplete?api_key=${apiKey}&query=${encodeURIComponent(query).replace('%20', '+')}`;
  return (
    fetch(url)
      .then((response) => response.ok ? response : Promise.reject(response))
      .then((response) => response.json())
      .then(({ response = {} } = {}) => {
        const airports = response.airports || [];
        const city = response.airports_by_cities || [];
        const countries = response.airports_by_countries || [];
        return [...airports, ...city, ...countries];
      }).then((results) => {
        return unique(results, (a, b) => a.code === b.code);
      })
  );
};
