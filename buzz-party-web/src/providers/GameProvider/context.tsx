import {createContext} from "react";
import {IPlayer} from "../../interfaces";

interface ContextProps {
	gameId: string | undefined;
	setGameId: (gameId: string | undefined) => void;
	players: IPlayer[];
	setPlayerList: (players: IPlayer[]) => void;
}

const GameContext = createContext({
	gameId: undefined,
	setGameId: (gameId: string | undefined) => {},
	players: [],
	setPlayerList: (players: IPlayer[]) => {},
} as ContextProps);

export default GameContext;
