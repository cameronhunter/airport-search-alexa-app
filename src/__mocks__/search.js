const db = {
  'Belfast City Airport': [
    {
      "code": "BHD",
      "name": "George Best Belfast City",
      "country_name": "United Kingdom"
    }
  ],
  'New York': [
    {
      "code": "LGA",
      "name": "La Guardia",
      "country_name": "United States"
    },
    {
      "code": "JFK",
      "name": "John F Kennedy International",
      "country_name": "United States"
    },
    {
      "code": "EWR",
      "name": "Newark Liberty International",
      "country_name": "United States"
    },
    {
      "code": "JRA",
      "name": "West 30th St Heliport",
      "country_name": "United States"
    },
    {
      "code": "JRB",
      "name": "Downtown Manhattan Heliport",
      "country_name": "United States"
    },
    {
      "code": "JRE",
      "name": "East 60th Street Heliport",
      "country_name": "United States"
    }
  ]
};

export default (query) => {
  return Promise.resolve(db[query] || []);
};
