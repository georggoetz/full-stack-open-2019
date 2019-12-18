import React from 'react';
import Weather from './weather'

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      capital {country.capital} <br />
      population {country.population} <br />
      <h3>languages</h3>
      <ul>
      {country.languages.map(language =>
        <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="128" alt={country.name} />
      <Weather city={country.capital} />
    </div>
  )
}

export default Country
