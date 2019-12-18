import React, { useState, useEffect } from 'react';
import axios from 'axios'
import SearchResult from './components/search-result'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect: get countries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('restcountries.eu responding')
        console.log('loaded', response.data.length, 'countries')
        setCountries(response.data)
      })
  }, [])

  const searchTermChanged = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const filteredCountries = () => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  const countrySelected = (event, countryName) => {
    event.preventDefault()
    console.log(countryName)
    setSearchTerm(countryName)
  }

  return (
    <div>
      <form>
        <div>
          find countries <input value={searchTerm} onChange={searchTermChanged} />
        </div>
      </form>
      <SearchResult countries={filteredCountries()}
                    onCountrySelected={countrySelected} />
    </div>
  )
}

export default App
