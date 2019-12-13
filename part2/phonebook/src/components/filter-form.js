import React from 'react'

const FilterForm = ({value, onChange}) => {
  return (
    <div>
      <form>
        <div>
          filter shown with <input value={value} onChange={onChange} />
        </div>
      </form>
    </div>
  )
}

export default FilterForm
