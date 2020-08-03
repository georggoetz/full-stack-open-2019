import React from 'react'
import AnecdatesList from './components/anecdotes-list.js'
import AnecdoteForm from './components/anecdote-form'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdatesList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
