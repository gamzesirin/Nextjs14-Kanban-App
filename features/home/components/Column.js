'use client'
import React, { useState, Fragment } from 'react'
import { CardContent, CardHeader, Card } from '@/components/ui/card'
import DropIndicator from './DropIndicator'
import KanbanCard from './KanbanCard'
import AddCard from './AddCard'

const Column = ({ title, cards, column, allCards, setCards, moveCard }) => {
	const [active, setActive] = useState(false)

	const handleDragStart = (e, card) => {
		e.dataTransfer.setData('cardId', card.id)
		e.dataTransfer.setData('sourceColumn', card.column)
	}

	const handleDragEnd = (e) => {
		const cardId = e.dataTransfer.getData('cardId')
		const sourceColumn = e.dataTransfer.getData('sourceColumn')

		setActive(false)
		clearHighlights()

		const indicators = getIndicators()
		const { element, index } = getNearestIndicator(e, indicators)

		const before = element?.dataset?.before || '-1'

		if (before !== cardId) {
			moveCard(cardId, column, index)
		}
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		highlightIndicator(e)
		setActive(true)
	}

	const clearHighlights = (els) => {
		const indicators = els || getIndicators()
		indicators.forEach((i) => {
			if (i) i.style.opacity = '0'
		})
	}

	const highlightIndicator = (e) => {
		const indicators = getIndicators()
		clearHighlights(indicators)
		const el = getNearestIndicator(e, indicators)
		if (el && el.element) {
			el.element.style.opacity = '1'
		}
	}

	const getNearestIndicator = (e, indicators) => {
		const DISTANCE_OFFSET = 50

		const el = indicators.reduce(
			(closest, child, index) => {
				const box = child.getBoundingClientRect()
				const offset = e.clientY - (box.top + DISTANCE_OFFSET)

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child, index }
				} else {
					return closest
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1],
				index: indicators.length - 1
			}
		)

		return el
	}

	const getIndicators = () => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
	}

	const handleDragLeave = () => {
		clearHighlights()
		setActive(false)
	}

	return (
		<Card className="flex-shrink-0 w-80 overflow-hidden">
			<CardHeader className="p-4 border-b bg-gradient-to-r from-primary to-primary-foreground">
				<h3 className="font-semibold text-primary-foreground">{title}</h3>
				<span className="text-sm text-primary-foreground/80">{cards ? cards.length : 0} cards</span>
			</CardHeader>
			<CardContent
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`flex-1 overflow-y-auto p-2 transition-colors ${active ? 'bg-primary/10' : ''}`}
			>
				{cards &&
					cards.map((card, index) => (
						<Fragment key={card.id}>
							<DropIndicator beforeId={card.id} column={column} index={index} />
							<KanbanCard {...card} handleDragStart={handleDragStart} setCards={setCards} />
						</Fragment>
					))}
				<DropIndicator beforeId={null} column={column} index={cards ? cards.length : 0} />
			</CardContent>
			<AddCard column={column} setCards={setCards} />
		</Card>
	)
}

export default Column
