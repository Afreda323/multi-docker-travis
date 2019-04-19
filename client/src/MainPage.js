import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MainPage = () => {
  const [index, setIndex] = useState('')
  const [values, setValues] = useState({})
  const [seenIndexes, setSeenIndexes] = useState([])

  const fetchValues = async () => {
    await axios
      .get('/api/values/current')
      .then(setValues)
      .catch(console.log)
  }

  const fetchIndexes = async () => {
    await axios
      .get('/api/values/all')
      .then(setSeenIndexes)
      .catch(console.log)
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const onInput = (e) => {
    setIndex(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios
      .post('/api/values', { index })
      .then(() => setIndex(''))
      .catch(console.log)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor={'input'}>
          <input
            name={'input'}
            type={'text'}
            placeholder={0}
            value={index}
            onChange={onInput}
          />
        </label>
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}

      <h3>Calculated Values:</h3>
      {Object.keys(values).map((key) => (
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      ))}
    </div>
  )
}

export default MainPage
