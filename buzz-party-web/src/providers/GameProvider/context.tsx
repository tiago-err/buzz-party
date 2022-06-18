import {createContext} from "react";
import {IPlayer} from "../../interfaces";

interface ContextProps {
	gameId: string | undefined;
	setGameId: React.Dispatch<React.SetStateAction<string | undefined>>;
	players: IPlayer[];
	setPlayerList: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}

const GameContext = createContext({
	gameId: undefined,
	setGameId: (gameId: string | undefined) => {},
	players: [],
	setPlayerList: (players: IPlayer[]) => {},
} as ContextProps);

export default GameContext;
