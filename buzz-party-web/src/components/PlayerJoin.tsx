import {useContext, useState} from "react";
import {toast} from "react-toastify";
import {COMMANDS} from "../interfaces";
import WSContext from "../providers/WSContext/context";

export default function PlayerJoin() {
	const {sendMessage} = useContext(WSContext);
	const [inputId, setInputId] = useState<string>("");
	const [name, setName] = useState("");

	return (
		<>
			<span className="text-black dark:text-white font-light text-2xl mb-8">Please enter a game code</span>
			<form
				className="flex flex-col"
				onSubmit={(e) => {
					e.preventDefault();

					if (!new RegExp(/\w+/).test(name)) {
						toast.warn("Please input your name.");
						return;
					}
					if (!new RegExp(/\d+/).test(inputId)) {
						toast.warn("Please input a game code.");
						return;
					}

					sendMessage(JSON.stringify({command: COMMANDS.JOIN_GAME, gameId: inputId, name}));
				}}>
				<input
					className="text-black font-semibold text-2xl mb-8 bg-white px-8 py-4 rounded-xl text-center"
					type="text"
					placeholder="Player Name..."
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="text-black font-semibold text-2xl mb-8 bg-white px-8 py-4 rounded-xl text-center"
					type="text"
					placeholder="Game Code..."
					onChange={(e) => setInputId(e.target.value)}
				/>
				<button className="text-white font-semibold text-2xl mb-8 bg-blue-500 px-8 py-4 rounded-xl text-center drop-shadow-xl" type="submit">
					Join Game
				</button>
			</form>
		</>
	);
}
