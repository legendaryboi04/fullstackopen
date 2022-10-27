import { useState } from 'react'
var x=0;
const Max = ({votes, anecdotes}) => {
     let maxVotes=-1,maxIndex=-1;
     for(let i=0;i<anecdotes.length;i++)
     {
      if(maxVotes<votes[i])
      {
        maxVotes=votes[i];
        maxIndex=i;
      }
     }
     return(
      <div>
        {anecdotes[maxIndex]}<br/>
        has votes {maxVotes}
      </div>
     )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState([0,0,0,0,0,0,0])
  
  return (
    <div>
     <p>{anecdotes[selected]}</p> 
     <p> has votes {votes[x]}</p>
     <button onClick={()=>{x=Math.floor(Math.random()*anecdotes.length);setSelected(x)}}>next anecdotes</button>
     <button onClick={()=>{
      const copy = [...votes]
      copy[x]+=1;
      setVotes(copy)
      }}>
        Vote
      </button>
      <h1>Anecdotes with most votes</h1>
      <Max votes={votes} anecdotes={anecdotes}></Max>
    </div>
  )
}

export default App