import { useState } from 'react'
const Statisticsl =(props) => {
  
    if (props.text === 'positive')
    return(
      <tr><td>{props.text}</td> <td>{props.value}%</td> 
      </tr>
    )
    else
    {
      return (
        <tr><td>{props.text}</td> <td>{props.value}</td> 
      </tr>
      )
    }
      
      
  
}
const Statistics = (props) => {
  const all = props.good+props.bad+props.neutral
  const average = props.good-props.bad/all
  const positive = (props.good/all)*100
  if(all === 0)
  {
    return (
      <div>
      No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statisticsl text='good' value={props.good}></Statisticsl>
          <Statisticsl text='neutral' value={props.neutral}></Statisticsl>
          <Statisticsl text='bad' value={props.bad}></Statisticsl>
          <Statisticsl text='all' value={all}></Statisticsl>
          <Statisticsl text='average' value={average}></Statisticsl>
          <Statisticsl text='positive' value={positive} ></Statisticsl>
        </tbody>
      </table>
    </div>

  )
}
const Button = (props)=>{
  return(
    
      <button onClick={props.onClick}>{props.text}</button>
      
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const incgood=()=>{setGood(good+1)}
  const incneutral=()=>{setNeutral(neutral+1)}
  const incbad=()=>{setBad(bad+1)}
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incgood} text='good'></Button>
      <Button onClick={incneutral}text='neutral'>neutral</Button>
      <Button onClick={incbad} text='bad'>bad</Button>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
      
    </div>
  )
}
export default App