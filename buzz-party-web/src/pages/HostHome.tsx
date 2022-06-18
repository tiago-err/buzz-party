import {useContext, useEffect} from "react";
import {toast} from "react-toastify";
import {COMMANDS, ICommandJoinGame, IWSBase} from "../interfaces";
import GameContext from "../providers/GameProvider/context";
import WSContext from "../providers/WSContext/context";

export default function HostHome(props: {gameId: string}) {
	const {sendMessage, lastMessage} = useContext(WSContext);
	const {players, setPlayerList} = useContext(GameContext);

	useEffect(() => {
		if (lastMessage !== null) {
			const data = JSON.parse(lastMessage.data) as IWSBase;

			if (data.command === COMMANDS.JOIN_GAME) {
				const parsedData = JSON.parse(lastMessage.data) as ICommandJoinGame;

				toast.info(`${parsedData.player.name} has joined the session!`);
				setPlayerList((previous) => [...previous, parsedData.player]);
			}
		}
	}, [lastMessage]);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center relative">
			<span className="text-black dark:text-white font-light text-2xl mb-8">Please join the game with the following code:</span>
			<span className="text-black dark:text-white font-semibold text-2xl mb-8 bg-white px-8 py-4 rounded-xl">{props.gameId}</span>
		</div>
	);
}
