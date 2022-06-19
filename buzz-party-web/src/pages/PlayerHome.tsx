import {useContext, useEffect, useState} from "react";
import PlayerJoin from "../components/PlayerJoin";
import GameContext from "../providers/GameProvider/context";
import {COMMANDS, ICommandJoinGame, IPlayer, IWSBase} from "../interfaces";
import {toastError} from "../utils/toastUtilities";
import WSContext from "../providers/WSContext/context";
import PlayerLobby from "../components/PlayerLobby";

export default function PlayerHome() {
	const {lastMessage} = useContext(WSContext);
	const {gameId, setGameId} = useContext(GameContext);
	const [player, setPlayer] = useState<IPlayer | undefined>();

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
				setPlayer(parsedData.player);
			}
		}
	}, [lastMessage, setGameId]);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center relative">
			{!gameId && <PlayerJoin />}
			{gameId && player && <PlayerLobby player={player} />}
		</div>
	);
}
