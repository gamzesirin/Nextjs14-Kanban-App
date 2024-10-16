import { Button } from '@/components/ui/button'
import { CardContent, Card } from '@/components/ui/card'

const KanbanCard = ({ title, id, column, handleDragStart, setCards }) => {
	const handleDelete = () => {
		setCards((prevCards) => prevCards.filter((card) => card.id !== id))
	}

	return (
		<Card
			draggable="true"
			onDragStart={(e) => handleDragStart(e, { title, id, column })}
			className="mb-2 cursor-grab group"
		>
			<CardContent className="p-3">
				<div className="flex justify-between items-center">
					<p className="text-sm">{title}</p>
					<Button
						variant="ghost"
						size="icon"
						className="opacity-0 group-hover:opacity-100 transition-opacity"
						onClick={handleDelete}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default KanbanCard
