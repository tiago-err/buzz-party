import {useEffect, useState} from "react";
import Modal from "../components/Modal";

export default function Home() {
	const [joinGameModalOpen, setJoinGameModalOpen] = useState(false);
	const [gameId, setGameId] = useState("");

	useEffect(() => {
		console.log(gameId);
	}, [gameId]);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<Modal isOpen={joinGameModalOpen} closeModal={() => setJoinGameModalOpen(false)} onInputChange={setGameId} />
			<div className="grid gap-8 grid-cols-1 justify-center">
				<input type="text" placeholder="Your name..." className="input input-bordered w-full" />
				<div className="grid gap-4 grid-cols-2">
					<button className="btn btn-lg" onClick={() => setJoinGameModalOpen(true)}>
						Join Game
					</button>
					<button className="btn btn-lg btn-ghost">Create Game</button>
				</div>
			</div>
		</div>
	);
}
