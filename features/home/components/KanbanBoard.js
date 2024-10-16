import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusCircle, X, MoonIcon, SunIcon } from 'lucide-react'

const KanbanBoard = () => {
	const [columns, setColumns] = useState([
		{ id: 'todo', title: 'To Do', cards: [{ id: '1', title: 'Task 1' }] },
		{ id: 'in-progress', title: 'In Progress', cards: [{ id: '2', title: 'Task 2' }] },
		{ id: 'done', title: 'Done', cards: [{ id: '3', title: 'Task 3' }] }
	])
	const [newColumnTitle, setNewColumnTitle] = useState('')
	const [isDarkMode, setIsDarkMode] = useState(false)

	const addColumn = () => {
		if (newColumnTitle.trim()) {
			setColumns([...columns, { id: Date.now().toString(), title: newColumnTitle.trim(), cards: [] }])
			setNewColumnTitle('')
		}
	}

	const addCard = (columnId) => {
		setColumns(
			columns.map((col) =>
				col.id === columnId ? { ...col, cards: [...col.cards, { id: Date.now().toString(), title: 'New Task' }] } : col
			)
		)
	}

	const deleteCard = (columnId, cardId) => {
		setColumns(
			columns.map((col) =>
				col.id === columnId ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) } : col
			)
		)
	}

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
		document.documentElement.classList.toggle('dark')
	}

	return (
		<div className={`min-h-screen bg-background text-foreground p-6 ${isDarkMode ? 'dark' : ''}`}>
			<header className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Kanban Board</h1>
				<Button variant="ghost" size="icon" onClick={toggleDarkMode}>
					{isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
				</Button>
			</header>
			<div className="flex space-x-4 overflow-x-auto pb-4">
				{columns.map((column) => (
					<Card key={column.id} className="flex-shrink-0 w-80">
						<CardHeader className="bg-secondary p-3">
							<h3 className="font-semibold">{column.title}</h3>
							<span className="text-sm text-muted-foreground">{column.cards.length} cards</span>
						</CardHeader>
						<CardContent className="p-3 space-y-2">
							{column.cards.map((card) => (
								<Card key={card.id} className="p-2 group">
									<div className="flex justify-between items-center">
										<p className="text-sm">{card.title}</p>
										<Button
											variant="ghost"
											size="icon"
											className="opacity-0 group-hover:opacity-100"
											onClick={() => deleteCard(column.id, card.id)}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								</Card>
							))}
							<Button
								variant="ghost"
								className="w-full justify-start text-muted-foreground"
								onClick={() => addCard(column.id)}
							>
								<PlusCircle className="mr-2 h-4 w-4" />
								Add a card
							</Button>
						</CardContent>
					</Card>
				))}
				<Card className="flex-shrink-0 w-80">
					<CardContent className="p-3">
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
		</div>
	)
}

export default KanbanBoard
