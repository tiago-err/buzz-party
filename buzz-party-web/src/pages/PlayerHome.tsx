import {useContext, useEffect} from "react";
import PlayerJoin from "../components/PlayerJoin";
import GameContext from "../providers/GameProvider/context";
import {COMMANDS, ICommandJoinGame, IWSBase} from "../interfaces";
import {toastError} from "../utils/toastUtilities";
import WSContext from "../providers/WSContext/context";

export default function PlayerHome() {
	const {lastMessage} = useContext(WSContext);
	const {gameId, setGameId} = useContext(GameContext);

	useEffect(() => {
		if (lastMessage !== null) {
			const data = JSON.parse(lastMessage.data) as IWSBase;

			if (data.command === COMMANDS.JOIN_GAME) {
				const parsedData = JSON.parse(lastMessage.data) as ICommandJoinGame;

				if (parsedData.error) {
					toastError(parsedData.error);
					return;
				}

				setGameId(parsedData.gameId);
			}
		}
	}, [lastMessage, setGameId]);

	return <div className="h-full w-full flex flex-col justify-center items-center relative">{!gameId && <PlayerJoin />}</div>;
}
