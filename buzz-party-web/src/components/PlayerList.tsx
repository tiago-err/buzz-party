import {useContext} from "react";
import GameContext from "../providers/GameProvider/context";
import {colorToTailwind} from "../utils/colorToTailwind";

export default function PlayerList() {
	const {players} = useContext(GameContext);

	return (
		<div className="absolute top-8 left-8 flex flex-col">
			{players.map((player) => (
				<div
					key={player.name}
					className={`bg-white mb-4 text-black text-lg font-semibold py-2 px-4 w-60 border-2 rounded-xl ${colorToTailwind(
						"border",
						player.color,
					)}`}>
					{player.name}
				</div>
			))}
		</div>
	);
}
