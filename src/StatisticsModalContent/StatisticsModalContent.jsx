import React from 'react'

import { calculateStatistics } from './utils'

/**
 * Statistics modal content component
 * @param {Object} props
 * @param {array} props.records
 * @return {ReactElement}
 */
const StatisticsModalContent = (props = {}) => {
  const {
    records = [],
  } = props

  const statistics = calculateStatistics(records)

  return (
    <div className='statistics-modal-content'>
      {
        statistics === undefined
          ? <p>{'Not enough data to calculate statistics'}</p>
          : (
            <>
              <p>{`Number of types: ${statistics.types.length}`}</p>
              <p>{`Minimum delay: ${statistics.minDelay} ms`}</p>
              <p>{`Maximum delay: ${statistics.maxDelay} ms`}</p>
              <p>{`Mean delay: ${statistics.totalTime / (records.length - 1)} ms`}</p>
              <p>{`Maximum sequence time: ${statistics.maxSequenceTime} ms`}</p>
              <p>{`Total time: ${statistics.totalTime} ms`}</p>
            </>
          )

      }

    </div>
  )
}

export default StatisticsModalContent
