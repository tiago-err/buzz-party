import {useContext, useEffect} from "react";
import {toast} from "react-toastify";
import PlayerList from "../components/PlayerList";
import {COMMANDS, ICommandJoinGame, IWSBase} from "../interfaces";
import GameContext from "../providers/GameProvider/context";
import WSContext from "../providers/WSContext/context";

export default function HostHome(props: {gameId: string}) {
	const {lastMessage} = useContext(WSContext);
	const {players, setPlayerList} = useContext(GameContext);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center relative">
			<PlayerList />
			<span className="text-black dark:text-white font-light text-2xl mb-8">Please join the game with the following code:</span>
			<span className="text-black font-semibold text-2xl mb-8 bg-white px-8 py-4 rounded-xl">{props.gameId}</span>
			{players.length > 1 && (
				<button className="text-white font-semibold text-2xl mb-8 bg-blue-500 px-8 py-4 rounded-xl text-center drop-shadow-xl">
					Start Game
				</button>
			)}
		</div>
	);
}
