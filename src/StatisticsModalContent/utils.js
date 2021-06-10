export const calculateStatistics = records => {
  let statistics = undefined

  if (records.length > 1) {

    // First I create initial data, so I don't have to check
    // for Initial data in reducer, every condition in reducer is expansive
    // with large data.
    const [
      {
        event: {
          type: firstType
        } = {},
        time: firstTime
      },
      {
        event: {
          type: secondType
        } = {},
        time: secondTime
      },
      ...restOfRecords
    ] = records

    const initialDelay = secondTime - firstTime

    const initialTypes = firstType === secondType
      ? [ firstType ]
      : [ firstType, secondType ]

    const initialSequenceTime = firstType !== 'focus' && secondType !== 'focus'
      ? initialDelay
      : 0

    // With reduce I need to roll through data only once
    statistics = restOfRecords.reduce(
      (accumulator, record = {}) => {
        const {
          types,
          minDelay,
          maxDelay,
          totalTime,
          sequenceTime,
          maxSequenceTime,
          lastRecordTime,
          lastRecordType,
        } = accumulator

        const {
          event: {
            type
          } = {},
          time,
        } = record

        const delay = time - lastRecordTime

        if (!types.some(uniqueType => uniqueType === type)) {
          accumulator.types.push(type)
        }

        // I mutate data because another spread could be expansive.
        // I control the object so I can handle the dangers.
        accumulator.totalTime = totalTime + delay
        accumulator.lastRecordTime = time
        accumulator.lastRecordType = type

        if (lastRecordType !== 'focus' && type !== 'focus') {
          accumulator.sequenceTime = sequenceTime + delay
        } else {
          if (sequenceTime > maxSequenceTime) {
            accumulator.maxSequenceTime = sequenceTime
          }
          accumulator.sequenceTime = 0
        }

        if (minDelay > delay) {
          accumulator.minDelay = delay

          // If deleay is the minimum delay, it will not be the maximum delay
          // so I can return here.
          // In case of only 2 records reducer will not run
          // and initial data will be shown.
          return accumulator
        }

        if (maxDelay < delay) {
          accumulator.maxDelay = delay
        }

        return accumulator
      },
      {
        types: initialTypes,
        minDelay: initialDelay,
        maxDelay: initialDelay,
        totalTime: initialDelay,
        sequenceTime: initialSequenceTime,
        maxSequenceTime: initialSequenceTime,
        lastRecordTime: secondTime,
        lastRecordType: secondType,
      }
    )

    // Handles case where last sequence is the longest one.
    if (statistics.sequenceTime > statistics.maxSequenceTime) {
      statistics.maxSequenceTime = statistics.sequenceTime
    }
  }

  return statistics
}
