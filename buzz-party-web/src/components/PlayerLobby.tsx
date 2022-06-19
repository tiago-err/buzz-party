import {mdiGamepadSquare} from "@mdi/js";
import Icon from "@mdi/react";
import {useContext} from "react";
import {IPlayer} from "../interfaces";
import GameContext from "../providers/GameProvider/context";
import {colorToTailwind} from "../utils/colorToTailwind";

export default function PlayerLobby(props: {player: IPlayer}) {
	const {gameId, setGameId, players} = useContext(GameContext);

	return (
		<div>
			{players.map((player) => (
				<div
					key={player.name}
					className={`bg-white mb-4 text-black text-lg font-semibold py-2 px-4 w-60 border-2 rounded-xl flex justify-between items-center ${colorToTailwind(
						"border",
						player.color,
					)}`}>
					{player.name}
					{props.player.name === player.name && <Icon path={mdiGamepadSquare} color="black" size={1} />}
				</div>
			))}
		</div>
	);
}
