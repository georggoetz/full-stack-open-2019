import React from 'react';

const CountryList = ({countries, onCountrySelected}) => {
  return (
    <div>
      {countries.map(country =>
        <form key={country.name}
              onSubmit={(event) => onCountrySelected(event, country.name)}>
          {country.name} <button type="submit">show</button>
        </form>
      )}
    </div>
  )
}

export default CountryList
