import React, { useState, useEffect } from 'react'
import FilterForm from './components/filter-form'
import Notification from './components/notification'
import PersonForm from './components/person-form'
import Person from './components/person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message: null, className: 'success'})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const nameChanged = (event) => {
    setNewName(event.target.value)
  }

  const numberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChanged = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    let currentPerson = persons.find(person => person.name === newName)

    if (currentPerson && currentPerson.number === newNumber) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (currentPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)) {
        personService
          .update(currentPerson.id, newPerson)
          .then(person => {
            showNotification(`Updated ${newName}`, 'success')
            currentPerson.number = newNumber
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showNotification(`Information of ${newName} has already been removed from server`, 'error')
            setPersons(persons.filter(person => person.id !== currentPerson.id))
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(person => {
          showNotification(`Added ${newName}`, 'success')
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          showNotification(error.response.data.error, 'error')
        })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(data => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const personsToShow = () => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const phonebookEntries = () => personsToShow().map(person =>
    <Person key={person.id}
            person={person}
            onDelete={() => removePerson(person)} />)

  const showNotification = (message, style) => {
    setNotification({message: message, className: style})
    setTimeout(() => {
      setNotification({message: null})
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} className={notification.className} />
      <FilterForm value={filter} onChange={filterChanged} />
      <h2>add a new</h2>
      <PersonForm name={newName}
                  number={newNumber}
                  onNameChanged={nameChanged}
                  onNumberChanged={numberChanged}
                  onAdded={addPerson} />
      <h2>Numbers</h2>
      {phonebookEntries()}
    </div>
  )
}

export default App
