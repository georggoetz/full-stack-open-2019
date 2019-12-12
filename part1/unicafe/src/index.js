import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = props => {
  const sum = () => props.good + props.neutral + props.bad
  const avg = () => sum() === 0 ? 0 : (props.good - props.bad) / sum()
  const pos = () => sum() === 0 ? 0 : props.good / sum() * 100

  return sum() === 0
    ? (<div>No feedback given</div>)
    : (
      <div>
        <table>
          <tbody>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={sum()} />
            <Statistic text="average" value={avg().toFixed(1)}/>
            <Statistic text="positive" value={pos().toFixed(1) + " %"}/>
          </tbody>
        </table>
      </div>
    )
}

const Statistic = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
