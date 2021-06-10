import React, { useState, useEffect } from 'react'

import RecordList from '../RecordList'
import SaveButton from '../SaveButton'
import StatisticsModal from '../StatisticsModal'

const App = () => {
  const [
    records,
    setRecords,
  ] = useState([])

  const getData = () => {
    fetch(
      'task.recording.json',
      {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(response => {
        return response.json()
      })
      .then((payload = {}) => {
        setRecords(payload['records'])
      })
  }

  useEffect(
    () => getData(),
    []
  )

  return (
    <div className='app'>
      <div className='controls'>
        <StatisticsModal records={records} />
        <SaveButton records={records} />
      </div>
      <RecordList
        records={records}
        setRecords={setRecords}
      />
    </div>
  )
}

export default App
