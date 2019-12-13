import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.from(Array(anecdotes.length), () => 0))

  const next = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = () => {
    let copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const indexOfMaxVotes = () => {
    let max = 0
    let maxIndex = 0
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i]
        maxIndex = i
      }
    }
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <button onClick={vote}>vote</button>
      <button onClick={next}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[indexOfMaxVotes()]}
      <br/>
      has {votes[indexOfMaxVotes()]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
