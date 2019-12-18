import React from 'react';
import Country from './country'
import CountryList from './country-list'

const SearchResult = ({countries, onCountrySelected}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else {
    return (
      <CountryList countries={countries} onCountrySelected={onCountrySelected} />
    )
  }
}

export default SearchResult
