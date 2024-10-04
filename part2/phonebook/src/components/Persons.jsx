import Names from "./Names"

const Persons = ({ persons, newFilter, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((person, i) => {
          return (
            <Names person={person} key={i} deletePerson={() => deletePerson(person)} />
          )
        })}
    </ul>
  )
}

export default Persons