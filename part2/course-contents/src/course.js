import React from 'react';

const Course = ({course}) => {
  const totalExcercises = () => course.parts.reduce((acc, part) =>
    acc + part.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <p>
        <b>total of {totalExcercises()} exercises</b>
      </p>
    </div>
  )
}

const Header = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Content = ({course}) => {
  const parts = () => course.parts.map(part =>
    <Part
      key={part.id}
      part={part}
    />
  )

  return (
    <div>
      {parts()}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

export default Course
