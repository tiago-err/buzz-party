interface Props {
	isOpen: boolean;
	closeModal: () => void;
	onInputChange: (input: string) => void;
}

export default function Modal({isOpen, closeModal, onInputChange}: Props) {
	return (
		<div className={`modal modal-bottom sm:modal-middle ${isOpen ? "modal-open" : ""}`}>
			<div className="modal-box">
				<div className="grid gap-4 grid-cols-1">
					<h3 className="font-bold text-lg">Enter the active game's code</h3>
					<input
						type="text"
						placeholder="1234..."
						className="input input-bordered w-full"
						onChange={(event) => onInputChange(event.target.value)}
					/>
				</div>
				<div className="modal-action">
					<button className="btn btn-ghost" onClick={closeModal}>
						Cancel
					</button>
					<button className="btn" onClick={closeModal}>
						Join Game
					</button>
				</div>
			</div>
		</div>
	);
}
