import React, { useState } from 'react'
import FilterForm from './components/filter-form'
import PersonForm from './components/person-form'
import Persons from './components/persons'

const App = ({initialPersons}) => {
  const [persons, setPersons] = useState(initialPersons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const nameChanged = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numberChanged = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterChanged = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = () => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={filter} onChange={filterChanged} />
      <h2>add a new</h2>
      <PersonForm name={newName}
                  number={newNumber}
                  onNameChanged={nameChanged}
                  onNumberChanged={numberChanged}
                  onAdded={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons()} />
    </div>
  )
}

export default App
