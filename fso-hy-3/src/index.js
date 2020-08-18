import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Votes = (props) => {
  if (props.votes[props.selected]) {
    return (
      <p>has {props.votes[props.selected]} votes.</p>
    )
  } else {
    return (<></>)
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [max, setMax] = useState(0)

  const randAnectode = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const vote = () => {
    const newVotes = {...votes}
    if (newVotes[selected]) {
      newVotes[selected] += 1;
    } else {
      newVotes[selected] = 1;
    }
    setVotes(newVotes);
    if(Object.keys(votes).length < 1) {
      setMax(selected);
    } else {
      setMax(Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b));
    }
  }

  return (
    <div>
      <h1>{props.anecdotes[selected]}</h1>
      <Votes votes={votes} selected={selected} />
      <Button handleClick={() => vote()} text="Vote" />
      <Button handleClick={() => randAnectode()} text="Next Anectode" />
      <h1>{props.anecdotes[max]}</h1>
      <Votes votes={votes} selected={max} />
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)