'use client'
import { useState, useEffect } from 'react'
import KanbanBoard from './KanbanBoard'

const CustomKanban = () => {
	const [mounted, setMounted] = useState(false)

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return <KanbanBoard />
}

export default CustomKanban
