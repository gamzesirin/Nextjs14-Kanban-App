'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const AddCard = ({ column, setCards }) => {
	const [text, setText] = useState('')
	const [adding, setAdding] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!text.trim().length) return
		const newCard = {
			column,
			title: text.trim(),
			id: Math.random().toString()
		}
		setCards((pv) => [...pv, newCard])
		setAdding(false)
		setText('')
	}

	return (
		<div className="p-2 border-t">
			{adding ? (
				<form onSubmit={handleSubmit}>
					<Textarea
						autoFocus
						placeholder="Enter a title for this card..."
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="mb-2"
						rows={3}
					/>
					<div className="flex justify-end gap-2">
						<Button variant="ghost" onClick={() => setAdding(false)}>
							Cancel
						</Button>
						<Button type="submit">Add Card</Button>
					</div>
				</form>
			) : (
				<Button variant="ghost" className="w-full justify-start" onClick={() => setAdding(true)}>
					+ Add a card
				</Button>
			)}
		</div>
	)
}

export default AddCard
