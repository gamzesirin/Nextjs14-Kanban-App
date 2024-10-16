import React from 'react'

const DropIndicator = ({ beforeId, column, index }) => (
	<div
		data-before={beforeId || '-1'}
		data-column={column}
		data-index={index}
		className="h-0.5 w-full bg-primary opacity-0 transition-opacity duration-200"
	/>
)

export default DropIndicator
