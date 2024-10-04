import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const handleClick = (setValue, value) => () => setValue(value + 1)

const StatisticLine = ({text, value}) => {
  if(text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Staticics = ({good, neutral, bad}) => {
  if (good + bad + neutral === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={bad + good + neutral} />
      <StatisticLine text='average' value={(good - bad) / (good + bad + neutral)} />
      <StatisticLine text='positive' value={good / (good + bad + neutral) * 100 } />
      </tbody>
    </table>
  )
 

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' handleClick={handleClick(setGood, good)} />
      <Button text='neutral' handleClick={handleClick(setNeutral, neutral)} />
      <Button text='bad' handleClick={handleClick(setBad, bad)} />
      <Header text='statistics' />
      <Staticics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
export default App
