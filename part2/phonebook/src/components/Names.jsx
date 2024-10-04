const Names = ({ person, i, deletePerson }) => {
    return (
      <li key={i}>
        {person.name} - {person.number}
        <button onClick={deletePerson}>Delete</button>
      </li>
    )
  }

  export default Names