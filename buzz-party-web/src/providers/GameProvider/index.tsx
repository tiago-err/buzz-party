import React, {useState} from "react";
import {IPlayer} from "../../interfaces";
import GameContext from "./context";

export default function GameProvider(props: {children: React.ReactNode}) {
	const [gameId, setGameId] = useState<string | undefined>();
	const [players, setPlayerList] = useState<IPlayer[]>([]);

	return <GameContext.Provider value={{gameId, setGameId, players, setPlayerList}}>{props.children}</GameContext.Provider>;
}
