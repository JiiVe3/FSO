import React, { useState, useEffect } from 'react'
import personsService from './personsService'

const Search = (props) => {
  return (
    <div>search: <input value={props.search} onChange={props.onSearchChange} /></div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
        <div>name: <input value={props.newName} onChange={props.onNameChange} /></div>
        <div>number: <input value={props.newNumber} onChange={props.onNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
} 

const InfoMessage = (props) => {
  if (props.message) {
    return (
      <div style={props.style}>
        {props.message}
      </div>
    )
  } else {
    return null
  }
}

const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
      <td><button onClick={() => props.onDelete(props.person)}>Delete</button></td>
    </tr>
  )
}

const Persons = (props) => {
  return (
    <table>
      <tbody>
        {props.persons.filter(person =>
          person.name.toLowerCase().includes(props.search.toLowerCase()))
          .map(person => <Person key={person.name} person={person} onDelete={props.onDelete} />)}
      </tbody>
    </table>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ infoMessage, setInfoMessage ] = useState(null)
  const [ activeStyle, setActiveStyle] = useState({})

  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  useEffect(() => {
    personsService.getAll().then(response => setPersons(response.data))
  }, [])

  const handleInfoMessage = (message, style) => {
    setActiveStyle(style)
    setInfoMessage(message)
    setTimeout(() => {
      setInfoMessage(null)
    }, 30000);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const existing = persons.filter(person => person.name === newName)

    if (existing[0]) {
      if (existing[0].number != newNumber) {
        if(window.confirm(`Update ${existing[0].name}'s number?`)) {
          personsService.update(existing[0]._id, {...existing[0], number: newNumber}).then(response =>{
            setPersons(persons.map(person => person._id !== existing[0]._id ? person : response.data))
            handleInfoMessage(`${newName}'s number has been updated`, infoStyle)
            setNewName('')
            setNumber('')
          }).catch(error => handleInfoMessage(error.response.data, errorStyle))
        }
      } else {
        handleInfoMessage(`${newName} already is in the phonebook`, errorStyle)
      }
    } else {
      personsService.create({name: newName, number: newNumber}).then(response => setPersons(persons.concat(response.data)))
      handleInfoMessage(`${newName} has been added to phonebook`, infoStyle)
      setNewName('')
      setNumber('')
    }
  }

  const deletePerson = (props) => {
    if(window.confirm(`Delete ${props.name}?`)) {
      personsService.deleteId(props._id).then(response => {
        setPersons(persons.filter(person => person._id !== props._id))
      }).catch(error => handleInfoMessage(error.response.data, errorStyle))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} onSearchChange={handleSearchChange} />
      <h2>Add new</h2>
      <InfoMessage message={infoMessage} style={activeStyle} />
      <PersonForm onSubmit={addPerson} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} onDelete={deletePerson} />
    </div>
  )
}

export default App;
