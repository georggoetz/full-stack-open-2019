import React from 'react'

const PersonForm = ({name, number, onNameChanged, onNumberChanged, onAdded}) => {
  return (
    <div>
      <form onSubmit={onAdded}>
        <div>
          name: <input value={name} onChange={onNameChanged} />
        </div>
        <div>
          number: <input value={number} onChange={onNumberChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
