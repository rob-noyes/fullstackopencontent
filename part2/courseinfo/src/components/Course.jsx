const Header = ({course})=> {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum,part) => sum + part.exercises, 0)
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

const Course = ({courses}) =>
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )}
    </div>
  
  export default Course