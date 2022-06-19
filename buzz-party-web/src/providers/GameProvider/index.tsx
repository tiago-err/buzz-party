import React, {useContext, useEffect, useState} from "react";
import {COMMANDS, ICommandPlayerList, IPlayer, IWSBase} from "../../interfaces";
import WSContext from "../WSContext/context";
import GameContext from "./context";

export default function GameProvider(props: {children: React.ReactNode}) {
	const {lastMessage} = useContext(WSContext);

	const [gameId, setGameId] = useState<string | undefined>();
	const [players, setPlayerList] = useState<IPlayer[]>([]);

	useEffect(() => {
		if (lastMessage !== null) {
			const data = JSON.parse(lastMessage.data) as IWSBase;

			if (data.command === COMMANDS.PLAYER_LIST) {
				const parsedData = JSON.parse(lastMessage.data) as ICommandPlayerList;

				setPlayerList(parsedData.players);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastMessage]);

	return <GameContext.Provider value={{gameId, setGameId, players, setPlayerList}}>{props.children}</GameContext.Provider>;
}
