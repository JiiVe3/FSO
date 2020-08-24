import React from 'react'
import { connect } from 'react-redux'
import { filterUpdate } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterUpdate(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterUpdate })(Filter)