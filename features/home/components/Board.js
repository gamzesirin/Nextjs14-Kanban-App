'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Column from './Column'

const DEFAULT_CARDS = [
	{ title: 'Task 1', id: '1', column: 'todo' },
	{ title: 'Task 2', id: '2', column: 'in-progress' },
	{ title: 'Task 3', id: '3', column: 'done' }
]

const DEFAULT_COLUMNS = [
	{ id: 'todo', title: 'To Do' },
	{ id: 'in-progress', title: 'In Progress' },
	{ id: 'done', title: 'Done' }
]

export default function Board() {
	const [cards, setCards] = useState(DEFAULT_CARDS)
	const [columns, setColumns] = useState(DEFAULT_COLUMNS)
	const [newColumnTitle, setNewColumnTitle] = useState('')

	const addColumn = () => {
		if (newColumnTitle.trim()) {
			const newColumn = {
				id: Math.random().toString(),
				title: newColumnTitle.trim()
			}
			setColumns([...columns, newColumn])
			setNewColumnTitle('')
		}
	}

	const moveCard = (cardId, targetColumn, targetIndex) => {
		setCards((prevCards) => {
			const cardToMove = prevCards.find((card) => card.id === cardId)
			if (!cardToMove) return prevCards

			const newCards = prevCards.filter((card) => card.id !== cardId)
			const updatedCard = { ...cardToMove, column: targetColumn }

			newCards.splice(targetIndex, 0, updatedCard)
			return newCards
		})
	}

	return (
		<div className="flex overflow-x-auto space-x-6 pb-4">
			{columns.map((column) => (
				<Column
					key={column.id}
					title={column.title}
					column={column.id}
					cards={cards.filter((card) => card.column === column.id)}
					allCards={cards}
					setCards={setCards}
					moveCard={moveCard}
				/>
			))}
			<Card className="flex-shrink-0 w-80">
				<CardContent className="p-4">
					<Input
						type="text"
						placeholder="New column title"
						value={newColumnTitle}
						onChange={(e) => setNewColumnTitle(e.target.value)}
						className="mb-2"
					/>
					<Button onClick={addColumn} className="w-full">
						Add Column
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
