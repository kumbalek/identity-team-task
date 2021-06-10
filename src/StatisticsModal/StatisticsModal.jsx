import React, { useState } from 'react'

import StatisticsModalContent from '../StatisticsModalContent'

/**
 * Statistics modal component
 * @param {Object} props
 * @param {array} props.records
 * @return {ReactElement}
 */
const StatisticsModal = (props = {}) => {
  const [
    modal,
    setModal,
  ] = useState(false)

  const {
    records,
  } = props

  return (
    <>
      <button
        className={'statistics-modal-button'}
        onClick={() => setModal(!modal)}
      >
        {'Statistics'}
      </button>
      {
        modal && <StatisticsModalContent records={records} />
      }
    </>
  )
}

export default StatisticsModal
