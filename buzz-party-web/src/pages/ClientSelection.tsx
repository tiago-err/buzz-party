import {useContext, useEffect} from "react";
import GameContext from "../providers/GameProvider/context";
import {COMMANDS, ICommandGenGame, IWSBase} from "../interfaces";
import WSContext from "../providers/WSContext/context";

interface Props {
	selectClientType: (type: "host" | "player") => void;
}

export default function ClientSelection(props: Props) {
	const {sendMessage, lastMessage} = useContext(WSContext);
	const {setGameId} = useContext(GameContext);

	useEffect(() => {
		if (lastMessage !== null) {
			const message = JSON.parse(lastMessage.data) as IWSBase;

			switch (message.command) {
				case COMMANDS.GEN_GAME:
					const msg = JSON.parse(lastMessage.data) as ICommandGenGame;

					setGameId(msg.gameId);
					props.selectClientType("host");
					break;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastMessage]);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<span className="text-black dark:text-white font-light text-2xl mb-8">Please select a client type</span>
			<button
				onClick={() => sendMessage(JSON.stringify({command: "gen_game"}))}
				className="bg-white text-black px-8 py-4 rounded-xl text-xl font-semibold drop-shadow-xl mb-8">
				Host
			</button>
			<button
				onClick={() => props.selectClientType("player")}
				className="bg-white text-black px-8 py-4 rounded-xl text-xl font-semibold drop-shadow-xl">
				Player
			</button>
		</div>
	);
}
