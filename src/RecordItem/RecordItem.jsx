import React from 'react'

/**
 * Item of list of interaction records
 * @param {Object} props
 * @param {Object} props.record
 * @param {function} props.deleteRecord
 * @param {function} props.reorderRecordDown
 * @param {function} props.reorderRecordUp
 * @param {boolean} props.firstRecord
 * @param {boolean} props.lastRecord
 * @return {ReactElement}
 */
const RecordItem = (props = {}) => {
  const {
    record: {
      event: {
        type,
      } = {},
      setup: {
        nodeName,
        url,
      } = {},
      time,
    } = {},
    deleteRecord,
    reorderRecordDown,
    reorderRecordUp,
    firstRecord,
    lastRecord
  } = props

  const recordDate = new Date(time)

  return (
    <li className='interaction-list-item'>
      <div className='content'>
        <div className='description'>
          <p>{`type: ${type}`}</p>
          {nodeName && <p>{`tag name: ${nodeName}`}</p>}
          {url && <p>{`url: ${url}`}</p>}
          <p>{`time: ${recordDate.toTimeString()}`}</p>
          <p>{`date: ${recordDate.toDateString()}`}</p>
        </div>
        <div className='actions'>
          <button
            onClick={reorderRecordUp}
            disabled={firstRecord}
          >
            {'↑'}
          </button>
          <button onClick={deleteRecord}>
            {'Delete'}
          </button>
          <button
            onClick={reorderRecordDown}
            disabled={lastRecord}
          >
            {'↓'}
          </button>
        </div>
      </div>
    </li>
  )
}

export default RecordItem
