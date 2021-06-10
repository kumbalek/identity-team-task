import React from 'react'

import RecordItem from '../RecordItem'

/**
 * List of interaction records
 * @param {Object} props
 * @param {array} props.records
 * @param {function} props.setRecords
 * @return {ReactElement}
 */
const RecordList = (props = {}) => {
  const {
    records = [],
    setRecords = () => {},
  } = props

  const deleteRecord = index => {
    let newRecords = [...records]
    newRecords.splice(index, 1)

    setRecords(newRecords)
  }

  const reorderRecord = (index, positionTo) => {
    let newRecords = [...records]
    newRecords.splice(positionTo, 0, newRecords.splice(index, 1)[0])

    setRecords(newRecords)
  }

  return (
    <ol className='interaction-list'>
    {
      records.map(
        (record = {}, index) => (
          <RecordItem
            key={`record-${index}`}
            record={record}
            deleteRecord={() => deleteRecord(index)}
            reorderRecordDown={() => reorderRecord(index, index + 1)}
            reorderRecordUp={() => reorderRecord(index, index - 1)}
            firstRecord={index === 0}
            lastRecord={index === records.length - 1}
          />
        )
      )
    }
    </ol>
  )
}

export default RecordList
