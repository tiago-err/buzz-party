import {useContext} from "react";
import GameContext from "../providers/GameProvider/context";

export default function PlayerList() {
	const {players} = useContext(GameContext);

	return (
		<div className="absolute top-8 left-8 flex flex-col">
			{players.map((player) => (
				<div
					key={player.name}
					className="bg-white mb-4 text-black text-lg font-semibold py-2 px-4 w-60 border-lime-500 border-l-8 rounded-r-xl">
					{player.name}
				</div>
			))}
		</div>
	);
}
