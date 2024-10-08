import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 

  // States
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  // Input Change Handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.some(person => person.name === newName)){
      const person = persons.find(pers => pers.name === newName)
      const review = window.confirm(`${person.name} is already added to phonebook, would you like to update their number?`)
      if(review){
        const changedPerson = {
          ...person,
          number: newNumber
        }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(pers => pers.id !== returnedPerson.id  ? pers : returnedPerson))
            setMessage(`updated ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
          .catch((error) => {
            setMessage(
              `Information of ${person.name} was already removed from the server`
            )
            setStatus(error.status)
            setTimeout(() => {
              setMessage(null)
              setStatus(null)
            }, 5000);
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    const review = window.confirm(`Do you wish to delete ${person.name}?`)
    if(review){
      const personToDelete = persons.find(n => n.id === person.id)
      personService
        .remove(personToDelete.id)
        .then(removedPerson => {
          setPersons(persons.filter(n => n.id !== removedPerson.id))
        })
        .catch((error) => {
          setMessage(
            `Information of ${person.name} was already removed from the server`
          )
          setStatus(error.status)
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App