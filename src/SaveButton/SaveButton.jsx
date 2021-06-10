import React from 'react'

/**
 * Save data as JSON file button
 * @param {Object} props
 * @param {array} props.records
 * @return {ReactElement}
 */
const SaveButton = (props = {}) => {
  const {
    records = [],
  } = props

  const json = JSON.stringify({records}, null, 2)
  const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
  const jsonUrl = URL.createObjectURL(blob)

  return (
    <a
      className={'save-button'}
      download={'task.recording.json'}
      href={jsonUrl}
    >
      <button>{'Save data'}</button>
    </a>
  )
}

export default SaveButton
